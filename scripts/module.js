import { getSetting, versionMigration } from "./lib/helpers.js";
import { minifySimpleRequests } from "./lib/simpleRequests.js";
import {
  loadAllTemplates,
  registerKeybindings,
  setupSettings,
} from "./settings.js";
import {
  hideDefaultCraftChecks,
  hideSellAllTreasure,
} from "./lib/sheetTweaks.js";
import {
  setupColorizeToolbeltMessageSaves,
  setupHighlightToolbeltRollSaves,
} from "./lib/pf2eToolbelt.js";
import { setupColorizePersistentPF2eHUD } from "./lib/pf2eHUD.js";
import { setupNotifySpellstrikeRecharge } from "./lib/notify.js";
import { setupReactionTracker } from "./lib/reactionTracker.js";
import { setupDisplayItemPropertyRunes } from "./lib/itemPropertyRunes.js";
import { setupDisplayWeaponDamage } from "./lib/showBaseDamage.js";
import { setupHideHeaderButtonText } from "./lib/hideHeaderButtonText.js";
import { setupPauseReplacement } from "./lib/replacePauseInfo.js";
import { setupStartOfSession } from "./lib/startOfSession.js";
import { setuplanguageHandling } from "./lib/languageHandling.js";

export const MODULE_ID = "sundry";

Hooks.once("init", async function () {
  setupSettings();
  registerKeybindings();
  loadAllTemplates();
  versionMigration();
});

Hooks.once("ready", async function () {
  // Colorize
  setupColorizeToolbeltMessageSaves(
    getSetting("colorize.pf2e-toolbelt.target-helper.roll")
  );
  setupColorizePersistentPF2eHUD(getSetting("colorize.pf2e-hud.persistent"));

  // Display
  setupDisplayItemPropertyRunes(getSetting("display.item-property-runes"));

  setupDisplayWeaponDamage(getSetting("display.weapon.base-damage"));

  //Highlighting
  setupHighlightToolbeltRollSaves(
    getSetting("highlight.pf2e-toolbelt.target-helper.roll")
  );

  setuplanguageHandling(getSetting("highlight.languages-known"));

  //Hide
  if (getSetting("hide.sell-all-treasure")) hideSellAllTreasure();

  setupHideHeaderButtonText(getSetting("hide.header.button-text"));

  if (getSetting("hide.default-craft-checks")) hideDefaultCraftChecks();

  // if (getSetting('message.user-color'))
  //     setupMessageUserColor();

  //Minify
  if (getSetting("minify.simple-requests")) minifySimpleRequests();

  // Notify
  setupNotifySpellstrikeRecharge(getSetting("notify.spellstrike.recharge"));

  setupStartOfSession(getSetting("notify.start-session.journal"));

  // Replace
  setupPauseReplacement();

  //Track
  setupReactionTracker(getSetting("track.reaction-usage"));
});
