import { setupColorizePersistentPF2eHUD } from "./lib/pf2eHUD.js";
import { colorizeToolbeltMessageSaves, highlightToolbeltRollSaves } from "./lib/pf2eToolbelt.js";
import { hideDefaultCraftChecks, hideSellAllTreasure } from "./lib/sheetTweaks.js";
import { minifySimpleRequests } from "./lib/simpleRequests.js";
import { MODULE_ID } from "./module.js";

export function setupSettings() {
    game.settings.register(MODULE_ID, "colorize.pf2e-hud.persistent", {
        name: `${MODULE_ID}.module-settings.colorize.pf2e-hud.persistent.name`,
        hint: `${MODULE_ID}.module-settings.colorize.pf2e-hud.persistent.hint`,
        scope: "world",
        config: true,
        default: false,
        type: Boolean,
        onChange: value => {
            setupColorizePersistentPF2eHUD(value)
        }
    });

    game.settings.register(MODULE_ID, "colorize.pf2e-toolbelt.target-helper.roll", {
        name: `${MODULE_ID}.module-settings.colorize.pf2e-toolbelt.target-helper.roll.name`,
        hint: `${MODULE_ID}.module-settings.colorize.pf2e-toolbelt.target-helper.roll.hint`,
        scope: "world",
        config: true,
        default: false,
        type: Boolean,
        onChange: value => {
            setupColorizeToolbeltMessageSaves(value)
        }
    });

    game.settings.register(MODULE_ID, "hide.default-craft-checks", {
        name: `${MODULE_ID}.module-settings.hide.default-craft-checks.name`,
        hint: `${MODULE_ID}.module-settings.hide.default-craft-checks.hint`,
        scope: "world",
        config: true,
        default: false,
        type: Boolean,
        onChange: value => {
            hideDefaultCraftChecks(value)
        }
    });

    game.settings.register(MODULE_ID, "hide.sell-all-treasure", {
        name: `${MODULE_ID}.module-settings.hide.sell-all-treasure.name`,
        hint: `${MODULE_ID}.module-settings.hide.sell-all-treasure.hint`,
        scope: "world",
        config: true,
        default: false,
        type: Boolean,
        onChange: value => {
            hideSellAllTreasure(value)
        }
    });

    game.settings.register(MODULE_ID, "highlight.pf2e-toolbelt.target-helper.roll", {
        name: `${MODULE_ID}.module-settings.highlight.pf2e-toolbelt.target-helper.roll.name`,
        hint: `${MODULE_ID}.module-settings.highlight.pf2e-toolbelt.target-helper.roll.hint`,
        scope: "world",
        config: true,
        default: false,
        type: Boolean,
        onChange: value => {
            setupHighlightToolbeltRollSaves(value)
        }
    });

    // game.settings.register(MODULE_ID, "message.user-color", {
    //     name: `${MODULE_ID}.module-settings.message.user-color.name`,
    //     hint: `${MODULE_ID}.module-settings.message.user-color.hint`,
    //     requiresReload: true,
    //     scope: "world",
    //     config: true,
    //     default: false,
    //     type: Boolean,
    // });


    game.settings.register(MODULE_ID, "minify.simple-requests", {
        name: `${MODULE_ID}.module-settings.minify.simple-requests.name`,
        hint: `${MODULE_ID}.module-settings.minify.simple-requests.hint`,
        scope: "world",
        config: true,
        default: false,
        type: Boolean,
        onChange: value => {
            minifySimpleRequests(value)
        }
    });
}