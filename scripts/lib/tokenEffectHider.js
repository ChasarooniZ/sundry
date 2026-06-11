import { BG_FRAME_SKIP_MODULES, DURATION } from "./const.js";

// This code was lovingly referenced under the MIT license from foundryvtt_effect-hider
export async function setupHideTokenEffects(active = true) {
  Hooks[active ? "on" : "off"]("refreshToken", (token) => {
    refreshEffectVisibility(token);
  });

  Hooks[active ? "on" : "off"]("highlightObjects", (state) => {
    for (const token of canvas.tokens.placeables) {
      refreshEffectVisibility(token);
    }
  });
}

function refreshEffectVisibility(token) {
  if (shouldShowEffects(token)) {
    setEffectVisibility(token, true);
  } else {
    setEffectVisibility(token, false);
  }
}

function shouldShowEffects(token) {
  if (token.hover) return true;

  if (canvas.tokens.highlightObjects) return true;

  return false;

  //   if (isCombatRunning() && getShowDuringCombat()) return true;

  //   return game.settings.get(MODULE_ID, "hideEffects") === "never";
}

function setEffectVisibility(token, value) {
  const fxInfoList = token.actor.appliedEffects;
  let cnt = 0;
  for (const fx of token.effects.children) {
    if (fx === token.effects.overlay) continue; // Skip base overlay
    if (fx === token.effects.bg && shouldSkipEffectBackground()) continue; // Skip background frames, for Dorako UI (and possibly other module conflicts)
    if (shouldAlwaysShowEffect(fxInfoList[cnt])) continue; // Skip effects that should always be shown
    fx.visible = value;
    cnt++;
  }
}

function shouldSkipEffectBackground() {
  return BG_FRAME_SKIP_MODULES.some((id) => game.modules.get(id)?.active);
}

export function shouldAlwaysShowEffect(effect) {
  return relevantSlug(effect) || relevantDuration(effect);
}

function relevantDuration(effect) {
  return effect.secondsRemaining <= DURATION.MINUTE * 10;
}

function relevantSlug(effect) {
  return !!RELEVANT_EFFECTS.intersection(effect?.statuses)?.size;
}
