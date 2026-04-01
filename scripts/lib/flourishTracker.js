import { MODULE_ID } from "../module.ks";

export function setupFlourishTracker(active = true) {
  Hooks[active ? "on" : "off"]("createChatMessage", usedFlourish);
  if (game.user.isGM) {
    Hooks[active ? "on" : "off"]("deleteCombat", removeEncounterFlourish);
  }
}

async function usedFlourish(message) {
  if (game.user.id !== message.user.id && !game.user.isGM) return;
  if (message?.item?.system?.traits?.value?.includes("flourish")) {
    const existing = actor.itemTypes.effect.find(
      (e) => e.slug === "effect-flourish-used",
    );
    if (existing) {
      if (game.user.id !== message.user.id) return;
      ui.notifications.warn(
        game.i18n.localize(`${MODULE_ID}.notification.flourish-used`),
      );
    } else {
      if (!game.user.isGM) return;
      flourishUsed(message?.actor ? [message?.actor] : []);
    }
  }
}

async function removeEncounterFlourish(encounter) {
  const actors = encounter?.combatants?.contents?.map(
    (combatant) => combatant.actor,
  );
  for (const actor of actors) {
    const existing = actor.itemTypes.effect.find(
      (e) => e.slug === "effect-flourish-used",
    );
    if (existing) existing.delete();
  }
}

async function flourishUsed(actors) {
  if (actors.length === 0) return;

  for (const actor of actors) {
    const existing = actor.itemTypes.effect.find(
      (e) => e.slug === "effect-flourish-used",
    );
    if (!existing) {
      const tempItem = foundry.utils.deepClone(FLOURISH_USED_EFFECT);
      tempItem.system = {
        ...item.system,
        context: {
          origin: {
            actor: actor.uuid,
            token: actor?.getActiveTokens()?.[0]?.document?.uuid,
          },
        },
      };
      actor.createEmbeddedDocuments("Item", [tempItem]);
    }
  }
}

const FLOURISH_USED_EFFECT = {
  name: game.i18n.has("sundry.items.effects.flourish-used.name")
    ? game.i18n.localize("sundry.items.effects.flourish-used.name")
    : "Effect: Flourish Used",
  img: "icons/svg/daze.svg",
  type: "effect",
  system: {
    duration: {
      value: 1,
      unit: "rounds",
      expiry: "turn-start",
      sustained: false,
    },
    publication: {
      title: "PF2e Sundry",
    },
    slug: "effect-flourish-used",
  },
};
