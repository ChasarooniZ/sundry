import { MODULE_ID } from "../module.js";

export function setupNotifySpellstrikeRecharge(active = true) {
    if (active) {
        Hooks.on("createChatMessage", handleMessage);
    } else {
        Hooks.off("createChatMessage", handleMessage);
    }
}

async function handleMessage(msg, _status, userid) {
    if (game.user.id !== userid) return;

    // If roll with special case slug as a ROLL Option notify
    const rollOptions = msg?.flags?.pf2e?.origin?.rollOptions ?? [];

    if (msg?.flags?.pf2e?.casting?.id) {
        if (rollOptions.includes('magus') && rollOptions.includes('focus')) {
            ui.notifications.info(
                `<b>${game.i18n.localize(`${MODULE_ID}.notification.spellstrike.recharged`)}!</b>
                ${game.i18n.localize(`${MODULE_ID}.notification.spellstrike.conflux`)}
                <br />
                <i>${game.i18n.localize(`${MODULE_ID}.notification.spellstrike.other-option`)}</i>`
            );
        }
    } else if (rollOptions.includes("origin:item:slug:rapid-recharge")) {
        ui.notifications.info(
            `<b>${game.i18n.localize(`${MODULE_ID}.notification.spellstrike.recharged`)}!</b>
            ${game.i18n.localize(`${MODULE_ID}.notification.spellstrike.feature`)}
            <br />
            <i>${game.i18n.localize(`${MODULE_ID}.notification.spellstrike.other-option`)}</i>`
        );
    } else if (rollOptions.includes("origin:item:slug:maguss-analysis")) {
        ui.notifications.info(
            `<b>${game.i18n.localize(`${MODULE_ID}.notification.spellstrike.recharged`)}?!</b>
            ${game.i18n.localize(`${MODULE_ID}.notification.spellstrike.on-success`)}
            <br />
            <i>${game.i18n.localize(`${MODULE_ID}.notification.spellstrike.other-option`)}</i>`
        );
    }
}