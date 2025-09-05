import { getSetting } from "./lib/helpers.js";
import { colorizePersistentPF2eHUD } from "./lib/pf2eHUDColorized.js";
import { minifySimpleRequests } from "./lib/simpleRequests.js";
import { setupMessageUserColor } from "./messageUserColor.js";
import { setupSettings } from "./settings.js";

export const MODULE_ID = 'sundry';

Hooks.once('init', async function () {
    setupSettings();
});

Hooks.once('ready', async function () {

    if (getSetting('message.user-color'))
        setupMessageUserColor();

    if (getSetting("colorize.pf2e-hud.persistent"))
        colorizePersistentPF2eHUD();

    if (getSetting('minify-simple-requests'))
        minifySimpleRequests();
});