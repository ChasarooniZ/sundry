import { colorizePersistentPF2eHUD } from "./lib/pf2eHUDColorized.js";
import { minifySimpleRequests } from "./lib/simpleRequests.js";
import { MODULE_ID } from "./module.js";

export function setupSettings() {
    game.settings.register(MODULE_ID, "message.user-color", {
        name: `${MODULE_ID}.module-settings.message.user-color.name`,
        hint: `${MODULE_ID}.module-settings.message.user-color.hint`,
        requiresReload: true,
        scope: "world",
        config: true,
        default: false,
        type: Boolean,
    });

    game.settings.register(MODULE_ID, "colorize.pf2e-hud.persistent", {
        name: `${MODULE_ID}.module-settings.colorize.pf2e-hud.persistent.name`,
        hint: `${MODULE_ID}.module-settings.colorize.pf2e-hud.persistent.hint`,
        scope: "world",
        config: true,
        default: false,
        type: Boolean,
        onChange: value => {
            colorizePersistentPF2eHUD(value)
        }
    });

    game.settings.register(MODULE_ID, "minify-simple-requests", {
        name: `${MODULE_ID}.module-settings.minify-simple-requests.name`,
        hint: `${MODULE_ID}.module-settings.minify-simple-requests.hint`,
        scope: "world",
        config: true,
        default: false,
        type: Boolean,
        onChange: value => {
            minifySimpleRequests(value)
        }
    });
}