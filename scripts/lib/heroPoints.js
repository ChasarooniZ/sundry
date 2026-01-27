const MODULE_ID = "sundry";
const MODULE_SOCKET = `module.${MODULE_ID}`;

function _hpLocalize(path) {
	return game.i18n.localize(`sundry.hero-points.${path}`);
}

function _hpFormat(path, data = {}) {
	return game.i18n.format(`sundry.hero-points.${path}`, data);
}

export function showImageDialog(imageUrl, duration = 5000, imgTitle) {
	const title = imgTitle ?? _hpLocalize("image.handout");

	const dialogId = "visual-aid-dialog";
	const dialog = new Dialog({
		title,
		content: `
			<div style="display: flex; justify-content: center; align-items: center; height: 100%;">
				<img src="${imageUrl}" style="max-width: 100%; max-height: 60vh; height: auto;" />
			</div>
		`,
		buttons: {},
		render: (html) => {
			const img = html[0].querySelector("img");
			if (img) {
				img.onload = () => {
					dialog.setPosition({ height: "auto" });
					setTimeout(() => {
						dialog.setPosition({
							left: (window.innerWidth - dialog.position.width) / 2,
							top: (window.innerHeight - dialog.position.height) / 2
						});
					}, 50);
				};
			}
		}
	}, {
		id: dialogId,
		width: "auto",
		height: "auto",
		resizable: true
	});

	dialog.render(true);

	setTimeout(() => {
		if (dialog.rendered) dialog.close();
	}, duration);
}

function _pickRandomHeroPointImage() {
	// IMPORTANT: These must exist inside the Sundry module folder:
	// /sundry/assets/heroPointMemes/*.webp
	const heroPointImages = [
		`modules/${MODULE_ID}/assets/heroPointMemes/1.webp`,
		`modules/${MODULE_ID}/assets/heroPointMemes/2.webp`,
		`modules/${MODULE_ID}/assets/heroPointMemes/3.webp`,
		`modules/${MODULE_ID}/assets/heroPointMemes/4.webp`,
		`modules/${MODULE_ID}/assets/heroPointMemes/5.webp`
	];
	return heroPointImages[Math.floor(Math.random() * heroPointImages.length)];
}

function _registerHeroPointImageSocket() {
	game.socket.on(MODULE_SOCKET, (data) => {
		if (!data || data.command !== "showImage") return;

		const users = Array.isArray(data.users) ? data.users : [];
		if (!users.includes(game.user.id)) return;

		const imageUrl = data.imageUrl;
		const duration = Number.isFinite(data.duration) ? data.duration : 5000;
		const imgTitle = typeof data.imgTitle === "string" && data.imgTitle.trim().length
			? data.imgTitle.trim()
			: _hpLocalize("image.handout");

		if (!imageUrl) return;

		showImageDialog(imageUrl, duration, imgTitle);
	});
}

function _emitHeroPointImage({ imageUrl, users, duration = 7000, imgTitle }) {
	const title = imgTitle ?? _hpLocalize("image.title");

	game.socket.emit(MODULE_SOCKET, {
		command: "showImage",
		imageUrl,
		users,
		duration,
		imgTitle: title
	});
}

function _awardHeroPointsDialog() {
	return new Promise((resolve, reject) => {
		const dialogTitle = _hpLocalize("dialog.title");
		const labelApply = _hpLocalize("dialog.apply");
		const labelCancel = _hpLocalize("dialog.cancel");
		const labelAdd = _hpLocalize("dialog.mode.add");
		const labelSet = _hpLocalize("dialog.mode.set");

		const dialog = new foundry.applications.api.DialogV2({
			window: { title: dialogTitle },
			content: `
				<div style="display: flex; align-items: center; gap: 1em;">
					<input id="hero-amount" name="hero-amount" type="number" min="0" max="3" step="1" value="1" style="width: 60px;" />
					<label><input type="radio" name="mode" value="add" checked> ${labelAdd}</label>
					<label><input type="radio" name="mode" value="set"> ${labelSet}</label>
				</div>
			`,
			buttons: [{
				action: "apply",
				label: labelApply,
				default: true,
				callback: (event, button) => {
					const val = button.form.elements["hero-amount"].valueAsNumber;
					const mode = button.form.elements["mode"].value;
					if (Number.isNaN(val) || val < 0 || val > 3) throw new Error("Enter a number between 0 and 3.");
					return { amount: val, mode };
				}
			}, {
				action: "cancel",
				label: labelCancel
			}],
			submit: (result) => {
				if (!result || result === "cancel") return reject(new Error("canceled"));
				resolve(result);
			},
			rejectClose: true,
			modal: true
		});

		dialog.render({ force: true });
	});
}

export async function heroPointMacro() {
	if (!game.user.isGM) {
		ui.notifications.warn(_hpLocalize("notify.gm-only"));
		return;
	}

	let formData;
	try {
		formData = await _awardHeroPointsDialog();
	} catch {
		// canceled
		return;
	}

	const { amount, mode } = formData;

	const awarded = [];
	const updatedActorIds = new Set();
	const partyActors = game.actors.party?.members ?? [];

	if (partyActors.length === 0) {
		ui.notifications.warn(_hpLocalize("notify.no-party"));
		return;
	}

	const drawPromises = [];

	for (const actor of partyActors) {
		if (!actor || updatedActorIds.has(actor.id)) continue;

		const heroPoints = actor.system?.resources?.heroPoints;
		if (!heroPoints) continue;

		const current = heroPoints.value ?? 0;
		const max = heroPoints.max ?? 3;
		const newTotal = mode === "set"
			? Math.min(amount, max)
			: Math.min(current + amount, max);

		await actor.update({ "system.resources.heroPoints.value": newTotal });
		awarded.push(`<strong>${actor.name}</strong>: ${current} → ${newTotal}`);
		updatedActorIds.add(actor.id);

        // check for Toolbelt integration
		const tbModule = game.modules.get("pf2e-toolbelt"); 
        const toolbeltEnabled =
            tbModule?.active === true &&
            tbModule?.api?.heroActions?.drawHeroActions instanceof Function;

        let heroActionsSettingEnabled = false;

        if (toolbeltEnabled) {
            try {
                // check if hero actions setting is enabled
                heroActionsSettingEnabled = game.settings.get(
                    "pf2e-toolbelt",
                    "heroActions"
                ) === true;
            } catch {
                heroActionsSettingEnabled = false;
            }
        }

        // If both Toolbelt and the setting are enabled, redraw hero actions
        if (toolbeltEnabled && heroActionsSettingEnabled) {
            drawPromises.push(
                tbModule.api.heroActions.drawHeroActions(actor)
            );
        }

	}

	await Promise.all(drawPromises);

	if (awarded.length === 0) {
		ui.notifications.info(_hpLocalize("notify.no-eligible"));
		return;
	}

	// Only send image popup when ADDING
	if (mode === "add") {
		const imagePath = _pickRandomHeroPointImage();
		const duration = 7000;
		const title = _hpLocalize("image.title");

		// Send to everyone active
		const userIds = game.users.filter(u => u.active).map(u => u.id);

		_emitHeroPointImage({
			imageUrl: imagePath,
			users: userIds,
			duration,
			imgTitle: title
		});

		// Also show locally right away
		if (userIds.includes(game.user.id)) {
			showImageDialog(imagePath, duration, title);
		}
	}

	const chatHeadline = _hpLocalize("chat.headline");
	const chatTagline = _hpLocalize("chat.tagline");
	const chatFooter = _hpLocalize("chat.footer");

	const plural = amount > 1 ? "s" : "";
	const actionLine = (mode === "set")
		? _hpFormat("chat.set-line", { amount })
		: _hpFormat("chat.award-line", { amount, plural });

	const flavorText = `
		<div style="
			background-color:#1d1c1a;
			border: 2px solid #5f574e;
			box-shadow: 3px 3px 10px rgba(0, 0, 0, 0.6);
			border-radius: 12px;
			padding: 16px;
			color: #e4ddc7;
			font-family: 'serif';
			max-width: 500px;
			margin: auto;
		">
			<div style="display: flex; justify-content: center; margin-bottom: 10px;">
				<img src="systems/pf2e/icons/features/feats/heroic-recovery.webp" width="64" height="64" style="border: none;">
			</div>
			<div style="text-align: center; font-weight: bold; font-size: 16px; letter-spacing: 1px; color: #c7b26f; margin-bottom: 12px;">
				${chatHeadline}
			</div>
			<div style="font-size: 14px; font-style: italic; margin-bottom: 12px; text-align: center;">
				${chatTagline}
			</div>
			<hr style="border: 1px solid #5f574e;">
			<div style="font-size: 15px; text-align: center; margin: 12px 0;">
				${actionLine}
			</div>
			<div style="text-align: center; font-size: 14px; margin-bottom: 10px;">
				${awarded.join("<br>")}
			</div>
			<hr style="border: 1px solid #5f574e;">
			<div style="font-size: 12px; font-style: italic; text-align: center; color: #a09888; margin-top: 6px;">
				${chatFooter}
			</div>
		</div>
	`;

	setTimeout(() => {
		ChatMessage.create({ content: flavorText });
	}, 2000);
}

export function setupHeroPoints() {
	_registerHeroPointImageSocket();

	// Expose API for macros: game.modules.get("sundry").api.heroPointMacro()
	const mod = game.modules.get(MODULE_ID);
	mod.api ??= {};
	mod.api.heroPointMacro = heroPointMacro;
	mod.api.showImageDialog = showImageDialog;
}
