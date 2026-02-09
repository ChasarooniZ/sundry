import { TEMPLATES } from "./lib/const.js";
import { isF2eSystem } from "./lib/helpers.js";
import { setupHideHeaderButtonText } from "./lib/hideHeaderButtonText.js";
import { setupDisplayItemPropertyRunes } from "./lib/itemPropertyRunes.js";
import { setuplanguageHandling } from "./lib/languageHandling.js";
import { setupNotifySpellstrikeRecharge } from "./lib/notify.js";
import { openPlayerNotes } from "./lib/openNotes.js";
import { setupColorizePersistentPF2eHUD } from "./lib/pf2eHUD.js";
import {
  setupColorizeToolbeltMessageSaves,
  setupHighlightToolbeltRollSaves,
} from "./lib/pf2eToolbelt.js";
import { setupReactionTracker } from "./lib/reactionTracker.js";
import {
  hideDefaultCraftChecks,
  hideSellAllTreasure,
} from "./lib/sheetTweaks.js";
import { setupDisplayWeaponDamage } from "./lib/showBaseDamage.js";
import { minifySimpleRequests } from "./lib/simpleRequests.js";
import { setupStartOfSession } from "./lib/startOfSession.js";
import { toggleDispositionStates } from "./lib/toggleDisposition.js";
import { MODULE_ID } from "./module.js";

export function setupSettings() {
  game.settings.register(MODULE_ID, "colorize.pf2e-hud.persistent", {
    name: `${MODULE_ID}.module-settings.colorize.pf2e-hud.persistent.name`,
    hint: `${MODULE_ID}.module-settings.colorize.pf2e-hud.persistent.hint`,
    scope: "world",
    config: isF2eSystem(),
    default: false,
    type: Boolean,
    onChange: (value) => {
      setupColorizePersistentPF2eHUD(value);
    },
  });

  game.settings.register(
    MODULE_ID,
    "colorize.pf2e-toolbelt.target-helper.roll",
    {
      name: `${MODULE_ID}.module-settings.colorize.pf2e-toolbelt.target-helper.roll.name`,
      hint: `${MODULE_ID}.module-settings.colorize.pf2e-toolbelt.target-helper.roll.hint`,
      scope: "world",
      config: isF2eSystem(),
      default: false,
      type: Boolean,
      onChange: (value) => {
        setupColorizeToolbeltMessageSaves(value);
      },
    },
  );

  game.settings.register(MODULE_ID, "display.item-property-runes", {
    name: `${MODULE_ID}.module-settings.display.item-property-runes.name`,
    hint: `${MODULE_ID}.module-settings.display.item-property-runes.hint`,
    scope: "world",
    config: true,
    default: false,
    type: Boolean,
    onChange: (value) => {
      setupDisplayItemPropertyRunes(value);
    },
  });

  game.settings.register(MODULE_ID, "display.weapon.base-damage", {
    name: `${MODULE_ID}.module-settings.display.weapon.base-damage.name`,
    hint: `${MODULE_ID}.module-settings.display.weapon.base-damage.hint`,
    scope: "world",
    config: true,
    default: false,
    type: Boolean,
    onChange: (value) => {
      setupDisplayWeaponDamage(value);
    },
  });

  game.settings.register(MODULE_ID, "hide.default-craft-checks", {
    name: `${MODULE_ID}.module-settings.hide.default-craft-checks.name`,
    hint: `${MODULE_ID}.module-settings.hide.default-craft-checks.hint`,
    scope: "world",
    config: isF2eSystem(),
    default: false,
    type: Boolean,
  });

  game.settings.register(MODULE_ID, "hide.header.button-text", {
    name: `${MODULE_ID}.module-settings.hide.header.button-text.name`,
    hint: `${MODULE_ID}.module-settings.hide.header.button-text.hint`,
    scope: "world",
    config: true,
    default: false,
    type: Boolean,
    onChange: (value) => {
      setupHideHeaderButtonText(value);
    },
  });

  game.settings.register(MODULE_ID, "hide.sell-all-treasure", {
    name: `${MODULE_ID}.module-settings.hide.sell-all-treasure.name`,
    hint: `${MODULE_ID}.module-settings.hide.sell-all-treasure.hint`,
    scope: "world",
    config: isF2eSystem(),
    default: false,
    type: Boolean,
    onChange: (value) => {
      hideSellAllTreasure(value);
    },
  });

  game.settings.register(MODULE_ID, "highlight.languages-known", {
    name: `${MODULE_ID}.module-settings.highlight.languages-known.name`,
    hint: `${MODULE_ID}.module-settings.highlight.languages-known.hint`,
    scope: "world",
    config: isF2eSystem(),
    default: false,
    type: Boolean,
    onChange: (value) => {
      setuplanguageHandling(value);
    },
  });

  game.settings.register(
    MODULE_ID,
    "highlight.pf2e-toolbelt.target-helper.roll",
    {
      name: `${MODULE_ID}.module-settings.highlight.pf2e-toolbelt.target-helper.roll.name`,
      hint: `${MODULE_ID}.module-settings.highlight.pf2e-toolbelt.target-helper.roll.hint`,
      scope: "world",
      config: isF2eSystem(),
      default: false,
      type: Boolean,
      onChange: (value) => {
        setupHighlightToolbeltRollSaves(value);
      },
    },
  );

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
    onChange: (value) => {
      minifySimpleRequests(value);
    },
  });

  game.settings.register(MODULE_ID, "notify.spellstrike.recharge", {
    name: `${MODULE_ID}.module-settings.notify.spellstrike.recharge.name`,
    hint: `${MODULE_ID}.module-settings.notify.spellstrike.recharge.hint`,
    scope: "world",
    config: isF2eSystem(),
    default: false,
    type: Boolean,
    onChange: (value) => {
      setupNotifySpellstrikeRecharge(value);
    },
  });

  game.settings.register(MODULE_ID, "notify.start-session.players-needed", {
    name: `${MODULE_ID}.module-settings.notify.start-session.players-needed.name`,
    hint: `${MODULE_ID}.module-settings.notify.start-session.players-needed.hint`,
    scope: "world",
    config: true,
    default: 4,
    range: {
      min: 0,
      step: 1,
      max: 10,
    },
    type: Number,
  });

  game.settings.register(MODULE_ID, "notify.start-session.journal", {
    name: `${MODULE_ID}.module-settings.notify.start-session.journal.name`,
    hint: `${MODULE_ID}.module-settings.notify.start-session.journal.hint`,
    scope: "world",
    config: true,
    default: "",
    type: String,
    onChange: (value) => {
      setupStartOfSession(value);
    },
  });

  game.settings.register(MODULE_ID, "notify.start-session.journal-players", {
    name: `${MODULE_ID}.module-settings.notify.start-session.journal-players.name`,
    hint: `${MODULE_ID}.module-settings.notify.start-session.journal-players.hint`,
    scope: "world",
    config: true,
    default: "",
    type: String,
    onChange: (value) => {
      setupStartOfSession(value);
    },
  });

  //TODO remove next version
  game.settings.register(MODULE_ID, "track.reactions", {
    name: "",
    hint: "",
    scope: "world",
    config: false,
    default: false,
    type: Boolean,
  });

  game.settings.register(MODULE_ID, "track.reaction-usage", {
    name: `${MODULE_ID}.module-settings.track.reaction-usage.name`,
    hint: `${MODULE_ID}.module-settings.track.reaction-usage.hint`,
    scope: "world",
    config: isF2eSystem(),
    default: "off",
    type: String,
    onChange: (value) => {
      setupReactionTracker(value);
    },
    choices: {
      all: `${MODULE_ID}.module-settings.track.reaction-usage.choices.all`,
      "reaction-only": `${MODULE_ID}.module-settings.track.reaction-usage.choices.reaction-only`,
      off: `${MODULE_ID}.module-settings.track.reaction-usage.choices.off`,
    },
  });

  game.settings.register(MODULE_ID, "replace.pause-text", {
    name: `${MODULE_ID}.module-settings.replace.pause-text.name`,
    hint: `${MODULE_ID}.module-settings.replace.pause-text.hint`,
    scope: "world",
    config: true,
    default: "",
    type: String,
  });

  game.settings.register(MODULE_ID, "replace.pause-img", {
    name: `${MODULE_ID}.module-settings.replace.pause-img.name`,
    hint: `${MODULE_ID}.module-settings.replace.pause-img.hint`,
    scope: "world",
    config: true,
    default: "ui/pause.svg",
    filePicker: "imagevideo",
    type: String,
  });

  game.settings.register(MODULE_ID, "replace.pause-img-class", {
    name: `${MODULE_ID}.module-settings.replace.pause-img-class.name`,
    hint: `${MODULE_ID}.module-settings.replace.pause-img-class.hint`,
    scope: "world",
    config: true,
    default: "fa-spin",
    type: String,
  });

  // game.settings.register(MODULE_ID, "replace.pause-size", {
  //   name: `${MODULE_ID}.module-settings.replace.pause-size.name`,
  //   hint: `${MODULE_ID}.module-settings.replace.pause-size.hint`,
  //   scope: "world",
  //   config: true,
  //   default: 0,
  //   type: Number,
  // });

  game.settings.register(MODULE_ID, "version", {
    scope: "world",
    config: false,
    type: String,
    default: "0.0.0",
  });
}

export function registerKeybindings() {
  game.keybindings.register(MODULE_ID, "player-notes", {
    name: game.i18n.localize(`${MODULE_ID}.controls.player-notes.name`),
    hint: game.i18n.localize(`${MODULE_ID}.controls.player-notes.hint`),
    editable: [
      {
        key: "KeyN",
      },
    ],
    onDown: (context) => {
      if (context.isShift) {
        //   game.objection.api.objection({ type: "objection", flipped: true });
      } else {
        openPlayerNotes({ open: true, edit: true });
      }
    },
    onUp: () => {},
    restricted: false, // Restrict this Keybinding to gamemaster only?
    //   reservedModifiers: ["Shift"], // On ALT, the notification is permanent instead of temporary
    precedence: CONST.KEYBINDING_PRECEDENCE.NORMAL,
  });

  game.keybindings.register(MODULE_ID, "toggle-disposition", {
    name: game.i18n.localize(`${MODULE_ID}.controls.toggle-disposition.name`),
    hint: game.i18n.localize(`${MODULE_ID}.controls.toggle-disposition.hint`),
    editable: [
      {
        key: "KeyI",
      },
    ],
    onDown: (context) => {
      if (context.isAlt) {
        toggleDispositionStates(false);
      } else {
        toggleDispositionStates(true);
      }
    },
    onUp: () => {},
    restricted: true, // Restrict this Keybinding to gamemaster only?
    reservedModifiers: ["Alt"],
    precedence: CONST.KEYBINDING_PRECEDENCE.NORMAL,
  });
}

export function loadAllTemplates() {
  loadTemplates([TEMPLATES.RUNES_ON_ITEM, TEMPLATES.BASE_DAMAGE]);
}
