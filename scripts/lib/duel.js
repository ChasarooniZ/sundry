import { MODULE_ID } from "../module.js";

export function setupDuelHooks() {
  if (!game.user.isGM) return;
  // On round change ask for the following
  // on first round just give the effect to players
  Hooks.on("pf2e.startTurn", handleStartTurn);
  Hooks.on("updateCombatant", handleInitiative);
  Hooks.on("renderCombatTracker", allowDuelToggling);
}

function allowDuelToggling(tracker, html, info, _misc) {
  if (info.combat?.active === false && info?.combat.round === 0) {
    document
      .querySelector(
        'nav.combat-controls[data-application-part="footer"] button[data-action="startCombat"]'
      )
      .insertAdjacentHTML(
        "beforebegin",
        '<div><input type="checkbox" id="isDuel" name="isDuel" value="false"><label for="vehicle1">Duel?</label><div>'
      );
    $(html)
      .find('input[name="isDuel"]')
      .on("change", function () {
        const enabled = $(this).is(":checked");
        info.combat.setFlag(MODULE_ID, "duel", enabled);
      });
  }
}

async function handleInitiative(combatant, changes, _info, _userID) {
  if (!combatant.encounter.getFlag(MODULE_ID, "duel")) return;
  // Updated Initiative
  if (!Number.isNaN(Number(changes?.initiative))) {
    combatant.actor.createEmbeddedDocuments("Item", [duelistEffect()]);
  }
}

async function handleStartTurn(combatant, encounter, userID) {
  if (!encounter.getFlag(MODULE_ID, "duel")) return;
  if (encounter.round === 1) {
    //First round
  }
  if (encounter.turn === 0) {
    //First turn
  }
}

async function handleRoundStart() {
  // Ask what initiative for each to roll
  // Do the rolling

  await resetRound();
}

async function resetRound() {
  await game.combat.previousRound();
  await game.combat.nextRound();
  // Grant the Effect to all players in combat
}

const duelistEffect = () => ({
  name: "Effect: Duelist's Options",
  type: "effect",
  effects: [],
  system: {
    description: {
      value:
        "<p>Granted by @UUID[Compendium.pf2e.journals.JournalEntry.S55aqwWIzpQRFhcq.JournalEntryPage.09Jpj4cCKYClyAE7]{Duels}</p><p>Each round the combatant can choose to use Deception, Intimidation, or Perception when they roll initiative. Because a duelist might act twice in a row, durations that last until the beginning of a duelist’s next turn might function oddly.A duelist acting second can choose to avoid such abilities that turn, or can choose to act second if they win initiative on the next round.</p><p>If the duelist is at least trained in whichever initiative choice they pick, they gain the corresponding dueling reaction that round: @UUID[Compendium.pf2e.actionspf2e.TXqTIwNGULs3j6CH]{Bullying Press} for Intimidation, @UUID[Compendium.pf2e.actionspf2e.1LDOfV8jEka09eXr]{Deceptive Sidestep} for Deception, or @UUID[Compendium.pf2e.actionspf2e.uWTQxEOj2pl45Kns]{Sense Weakness} for Perception. Neither duelist is aware of what type of roll the other used for initiative—surprise and the use of dueling actions are a part of dueling strategies. Familiars and companions, even when allowed in the duel, can’t use these actions, nor can bystanders.</p>",
      gm: "",
    },
    publication: {
      title: "Sundry",
      authors: "@Chasarooni",
      license: "OGL",
      remaster: false,
    },
    rules: [
      {
        key: "GrantItem",
        uuid: "Compendium.pf2e.actionspf2e.Item.TXqTIwNGULs3j6CH",
        reevaluateOnUpdate: true,
        predicate: ["self:participant:initiative:stat:intimidation"],
      },
      {
        key: "GrantItem",
        uuid: "Compendium.pf2e.actionspf2e.Item.uWTQxEOj2pl45Kns",
        reevaluateOnUpdate: true,
        predicate: ["self:participant:initiative:stat:perception"],
      },
      {
        key: "GrantItem",
        uuid: "Compendium.pf2e.actionspf2e.Item.1LDOfV8jEka09eXr",
        reevaluateOnUpdate: true,
        predicate: ["self:participant:initiative:stat:deception"],
      },
    ],
    slug: "effect-duelists-options",
    level: {
      value: 1,
    },
    duration: {
      value: 1,
      unit: "rounds",
      expiry: "turn-start",
      sustained: false,
    },
    tokenIcon: {
      show: true,
    },
  },
  img: "icons/skills/melee/weapons-crossed-swords-yellow-teal.webp",
});
