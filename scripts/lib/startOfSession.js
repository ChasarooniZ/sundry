import { getSetting } from "./helpers.js";
import { MODULE_ID } from "../module.js";

export function setupStartOfSession() {
  if (getPlayerAmountEnough("login")) {
    if (game.user.isGM) {
      startOfSessionNotification('gm');
    } else {
      startOfSessionNotification('player');
    }
  }
  Hooks.on("userConnected", userConnectionStartOfSessionHook);
}

async function userConnectionStartOfSessionHook(_user, isLogin) {
  if (isLogin && getPlayerAmountEnough("hook")) {
    if (game.user.isGM) {
      startOfSessionNotification('gm');
    } else {
      startOfSessionNotification('player');
    }
  }
}

function getPlayerAmountEnough(situation) {
  return situation === "login"
    ? game.users.players.filter((p) => p.active).length >=
        getSetting("notify.start-session.players-needed")
    : game.users.players.filter((p) => p.active).length ===
        getSetting("notify.start-session.players-needed");
}

async function startOfSessionNotification(type = 'gm') {
  const journalUUID = type === 'gm' ? getSetting("notify.start-session.journal") : getSetting("notify.start-session.journal-players");
  if (!journalUUID) return null;
  const journal = await fromUuid(journalUUID);
  if (!journal) return null;

  ui.notifications.notify(
    game.i18n.localize(`${MODULE_ID}.notification.session-start.active`)
  );

  if (journal.parent) {
    const journalEntryID = journal.id;
    journal?.parent?.sheet?.goToPage(journalEntryID)?.render(true);
  } else {
    journal?.sheet?.render(true);
  }
}
