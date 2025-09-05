import { getSetting } from "./lib/helpers.js";
import { minifySimpleRequests } from "./lib/simpleRequests.js";
import { setupMessageUserColor } from "./lib/messageUserColor.js";
import { setupSettings } from "./settings.js";
import { colorizePersistentPF2eHUD } from "./lib/pf2eHUDColorized.js";
import { hideDefaultCraftChecks, hideSellAllTreasure } from "./lib/sheetTweaks.js";
import { colorizeToolbeltMessageSaves, highlightToolbeltRollSaves } from "./lib/pf2eToolbelt.js";

export const MODULE_ID = 'sundry';

Hooks.once('init', async function () {
    setupSettings();
});

Hooks.once('ready', async function () {

    if (getSetting("colorize.pf2e-hud.persistent"))
        colorizePersistentPF2eHUD();

    if (getSetting("colorize.pf2e-toolbelt.target-helper.roll"))
        colorizeToolbeltMessageSaves();

    if (getSetting('hide.sell-all-treasure'))
        hideSellAllTreasure();

    if (getSetting('hide.default-craft-checks'))
        hideDefaultCraftChecks();

    if (getSetting('highlight.pf2e-toolbelt.target-helper.roll'))
        highlightToolbeltRollSaves();

    // if (getSetting('message.user-color'))
    //     setupMessageUserColor();

    if (getSetting('minify.simple-requests'))
        minifySimpleRequests();


});