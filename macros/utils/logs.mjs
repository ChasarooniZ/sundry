import c from "chalk";

export function error(message, file) {
	let string = `${c.red("[ERROR]")} ${message}`;

	if (file) {
		string += `\n ${file}`;
	}

	console.error(string);
}

export function warn(message) {
	console.warn(`${c.yellow("[WARNING]")} ${message}`);
}

export function changed(message) {
	console.warn(`${c.magenta("[CHANGED]")} ${message}`);
}