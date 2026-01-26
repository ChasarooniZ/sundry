import { existsSync } from "node:fs";
import path from "node:path";
import moduleJSON from "../module.json" with { type: "json" };
import { changed, error, warn } from "./utils/logs.mjs";

/**
 * Transforms an entry document.
 *
 * @param {Document["_source"]} doc - The entry document to transform.
 * @returns {(Promise<void>|void|Promise<false>|false)} A promise that resolves to `undefined` if the transformation is successful, or a promise that rejects with `false` if an error occurs or the document should otherwise be rejected.
 */
export function transformEntry(doc) {
	function fix(key, property) {
		switch (key) {
			case "system": {
				if (property?.source?.book && moduleJSON?.flags?.dnd5e) {
					property.source.book = Object.keys(moduleJSON.flags.dnd5e.sourceBooks)[0];
				}
				break;
			}
			case "thumb": {
				if (property.startsWith("modules/")) {
					const thumbPath = path.resolve(process.cwd(), property).replace(`modules/${moduleJSON.id}/`, "");
					if (!existsSync(thumbPath)) {
						error(`Thumbnail ${property} does not exist!`, `packs/${doc?._key?.split("!")[1]}/${doc.name}_${doc._id}.json`);
					}
				} else {
					error(`Thumbnail "${property}" is not in the modules folder!`, `packs/${doc?._key?.split("!")[1]}/${doc.name}_${doc._id}.json`);
				}
				break;
			}
			case "img": {
				if (!property.startsWith("modules/")) break;

				const imgPath = path.resolve(process.cwd(), property.replace(`modules/${moduleJSON.id}/`, ""));
				if (!existsSync(decodeURIComponent(imgPath))) {
					error(`Image ${property} does not exist!`, `packs/${doc?._key?.split("!")[1]}/${doc.name}_${doc._id}.json`);
					if (!property.includes(moduleJSON.id)) {
						property = property.replace(/modules\/[a-z\-]+\//g, `modules/${moduleJSON.id}/`);
					}
				}

				break;
			}
			case "prototypeToken": {
				if (property.name
					.split(" ")
					.find(x => doc.name.split(" ").find(y => y.includes(x)))
				) {
					warn(`Token Prototype "${doc[key].name}" has a mismatching but similar name to "${doc.name}"!`);
				} else {
					changed(`Replaced "${doc[key].name}" to "${doc.name}" in token prototype!`);
					doc[key].name = doc?.name || "ERROR 404";
				}

				break;
			}
		}

		return property;
	}

	for (const key of Object.keys(doc)) {
		/**
		 * Fixes PDF mistakes such as " . ", "te- xt". Does not fix line-breaks.
		 *
		 * @param {string} value - The value to parse and fix.
		 * @returns {any} The parsed and fixed value.
		 */
		doc[key] = JSON.parse(
			JSON.stringify(doc[key])
				.replaceAll(" . ", ". ")
				.replaceAll(" .<", ".<")
				.replaceAll(" .\"", ".\""),
			// .replaceAll(/(\S)- /g, "$1"),
		);

		doc[key] = fix(key, doc[key]);
	}

	return void 0;
}