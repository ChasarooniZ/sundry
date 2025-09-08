import { getSetting } from "./lib/helpers.js";
import { minifySimpleRequests } from "./lib/simpleRequests.js";
import { setupSettings } from "./settings.js";
import { hideDefaultCraftChecks, hideSellAllTreasure } from "./lib/sheetTweaks.js";
import { setupColorizeToolbeltMessageSaves, setupHighlightToolbeltRollSaves } from "./lib/pf2eToolbelt.js";
import { setupColorizePersistentPF2eHUD } from "./lib/pf2eHUD.js";

export const MODULE_ID = 'sundry';

Hooks.once('init', async function () {
    setupSettings();
});

Hooks.once('ready', async function () {
    //Colorization
    setupColorizeToolbeltMessageSaves(
        getSetting("colorize.pf2e-toolbelt.target-helper.roll")
    );
    setupColorizePersistentPF2eHUD(
        getSetting("colorize.pf2e-hud.persistent")
    );

    //Highlighting
    setupHighlightToolbeltRollSaves(
        getSetting('highlight.pf2e-toolbelt.target-helper.roll')
    )


    //Hide
    if (getSetting('hide.sell-all-treasure'))
        hideSellAllTreasure();

    if (getSetting('hide.default-craft-checks'))
        hideDefaultCraftChecks();

    // if (getSetting('message.user-color'))
    //     setupMessageUserColor();

    if (getSetting('minify.simple-requests'))
        minifySimpleRequests();


});