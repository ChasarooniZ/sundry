import { setupNotifySpellstrikeRecharge } from "./lib/notify.js";
import { setupColorizePersistentPF2eHUD } from "./lib/pf2eHUD.js";
import { setupColorizeToolbeltMessageSaves, setupHighlightToolbeltRollSaves } from "./lib/pf2eToolbelt.js";
import { setupReactionTracker } from "./lib/reactionTracker.js";
import { hideDefaultCraftChecks, hideSellAllTreasure } from "./lib/sheetTweaks.js";
import { minifySimpleRequests } from "./lib/simpleRequests.js";
import { MODULE_ID } from "./module.js";

export function setupSettings() {
    game.settings.register(MODULE_ID, "colorize.pf2e-hud.persistent", {
        name: `${MODULE_ID}.module-settings.colorize.pf2e-hud.persistent.name`,
        hint: `${MODULE_ID}.module-settings.colorize.pf2e-hud.persistent.hint`,
        scope: "world",
        config: game.system.id === 'pf2e',
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
        config: game.system.id === 'pf2e',
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
        config: game.system.id === 'pf2e',
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
        config: game.system.id === 'pf2e',
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
        config: game.system.id === 'pf2e',
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

    game.settings.register(MODULE_ID, "notify.spellstrike.recharge", {
        name: `${MODULE_ID}.module-settings.notify.spellstrike.recharge.name`,
        hint: `${MODULE_ID}.module-settings.notify.spellstrike.recharge.hint`,
        scope: "world",
        config: game.system.id === 'pf2e',
        default: false,
        type: Boolean,
        onChange: value => {
            setupNotifySpellstrikeRecharge(value)
        }
    });

    //TODO remove next version
    game.settings.register(MODULE_ID, "track.reactions", {
        name: "",
        hint: "",
        scope: "world",
        config: false,
        default: false,
        type: Boolean
    });

    game.settings.register(MODULE_ID, "track.reaction-usage", {
        name: `${MODULE_ID}.module-settings.track.reaction-usage.name`,
        hint: `${MODULE_ID}.module-settings.track.reaction-usage.hint`,
        scope: "world",
        config: game.system.id === 'pf2e',
        default: "off",
        type: String,
        onChange: value => {
            setupReactionTracker(value)
        },
        choices: {
            "all": `${MODULE_ID}.module-settings.track.reaction-usage.choices.all`,
            "reaction-only": `${MODULE_ID}.module-settings.track.reaction-usage.choices.reaction-only`,
            "off": `${MODULE_ID}.module-settings.track.reaction-usage.choices.off`
        }
    });
}