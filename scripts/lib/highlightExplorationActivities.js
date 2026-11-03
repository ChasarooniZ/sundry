export function setupHighlightExplorationActivities(active = false) {
  if (game.user.isGM) {
    Hooks[active ? "on" : "off"](
      "highlightObjects",
      highlightExplorationActivities,
    );
  }
}
async function highlightExplorationActivities(active) {
  if (active) {
    const seq = new Sequence();
    for (const tok of canvas.tokens.placeables) {
      const explorationActivities = tok?.actor?.system?.exploration?.map((id) =>
        tok?.actor?.items?.get(id),
      );
      const activity = explorationActivities?.[0];
      const slug = activity?.slug;
      const img =
        activity?.img !== "systems/pf2e/icons/actions/Passive.webp"
          ? activity?.img
          : (artMap?.[slug] ??
            "icons/magic/symbols/question-stone-yellow.webp");
      if (slug) {
        seq
          .effect()
          .file(img)
          .name(effectName)
          .atLocation(tok)
          .persist()
          .scaleToObject(0.5)
          .opacity(0.8)
          .locally();
      }
    }
    seq.play();
  } else {
    await Sequencer.EffectManager.endEffects({ name: effectName });
  }
}

const effectName = "Exploration Activity";
const artMap = {
  "detect-magic": "systems/pf2e/icons/spells/detect-magic.webp",
  "follow-the-expert": "systems/pf2e/icons/spells/favorable-review.webp",
  hustle: "icons/skills/movement/feet-winged-boots-brown.webp",
  "avoid-notice": "icons/magic/perception/silhouette-stealth-shadow.webp",
  "cover-tracks": "icons/magic/nature/stealth-hide-eyes-green.webp",
  defend: "icons/equipment/shield/heater-steel-boss-red.webp",
  investigate: "icons/tools/scribal/magnifying-glass.webp",
  "repeat-a-spell": "icons/magic/symbols/circle-ouroboros.webp",
  scout: "icons/tools/navigation/map-marked-red.webp",
  search: "icons/magic/perception/eye-ringed-green.webp",
  track: "icons/magic/nature/wolf-paw-glow-green.webp",
};
