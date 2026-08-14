import { MODULE_ID } from "../module.js";
import {
  BG_FRAME_SKIP_MODULES,
  DURATION,
  EMPTY_SET,
  RELEVANT_EFFECTS,
  RELEVANT_MODES,
} from "./const.js";
import { getSetting } from "./helpers.js";

// This code was lovingly referenced under the MIT license from foundryvtt_effect-hider
export async function setupHideTokenEffects(active = true) {
  Hooks[active ? "on" : "off"]("refreshToken", (token) => {
    const surfaceMode = getSetting("hide.effects.token.surface");
    const characterTypes = getSetting("hide.effects.token.enabled-for");
    if (isValidCharacter(token?.actor?.type, characterTypes)) {
      refreshEffectVisibility(token, { surfaceMode });
    }
  });

  Hooks[active ? "on" : "off"]("highlightObjects", (state) => {
    const surfaceMode = getSetting("hide.effects.token.surface");
    for (const token of canvas.tokens.placeables) {
      const characterTypes = getSetting("hide.effects.token.enabled-for");
      if (isValidCharacter(token?.actor?.type, characterTypes)) {
        refreshEffectVisibility(token, { surfaceMode });
      }
    }
  });
}

export async function setupHideActorEffects(active = true) {
  Hooks[active ? "on" : "off"](
    "renderEffectsPanel",
    (panel, html, data, misc) => {
      const surfaceMode = getSetting("hide.effects.token.surface");
      const characterTypes = getSetting("hide.effects.token.enabled-for");
      const actor = data?.actor;
      if (isValidCharacter(actor?.type, characterTypes)) {
        html.classList.add("sundry-hide-effects");
        if (window?.sundryShowActorEffects) {
          html.classList.add("hide");
        }
        createButton(html, !!window?.sundryShowActorEffects);
        const htmlEffects = html.querySelectorAll("div.effect-item");
        htmlEffects.forEach((htmlEffect) => {
          const effect = actor.items.get(htmlEffect?.dataset?.itemId);
          const show = shouldAlwaysShowEffect(effect, { surfaceMode });
          if (!show) {
            htmlEffect.classList.add("sundry-hidden");
          }
        });
      }
    },
  );
}

const BUTTON_ID = "sundry-actor-effects-toggle-button";

function createButton(html, visible) {
  const existing = document.getElementById(BUTTON_ID);
  if (existing) existing.remove();

  let hidden = !visible;

  const btn = document.createElement("button");
  btn.id = BUTTON_ID;
  Object.assign(btn.dataset, {
    tooltip: hidden
      ? game.i18n.localize(`${MODULE_ID}.tooltip.hud.actor-effects.show`)
      : game.i18n.localize(`${MODULE_ID}.tooltip.hud.actor-effects.hide`),
    tooltipDirection: "RIGHT",
  });
  btn.classList.add("icon", "fa-solid", hidden ? "fa-eye" : "fa-eye-closed");

  btn.addEventListener("click", () => {
    hidden = !hidden;
    if (hidden) {
      html.classList.add("hide");
    } else {
      html.classList.remove("hide");
    }
    btn.classList.remove(hidden ? "fa-eye" : "fa-eye-closed");
    btn.classList.add(hidden ? "fa-eye-closed" : "fa-eye");
    Object.assign(btn.dataset, {
      tooltip: hidden
        ? game.i18n.localize(`${MODULE_ID}.tooltip.hud.actor-effects.show`)
        : game.i18n.localize(`${MODULE_ID}.tooltip.hud.actor-effects.hide`),
    });
  });
  html.insertBefore(btn, html.firstChild);
}

function refreshEffectVisibility(token, { surfaceMode }) {
  if (shouldShowEffects(token)) {
    setEffectVisibility(token, true, { surfaceMode });
  } else {
    setEffectVisibility(token, false, { surfaceMode });
  }
}

function shouldShowEffects(token) {
  if (token.hover) return true;

  if (canvas.tokens.highlightObjects) return true;

  return false;

  //   if (isCombatRunning() && getShowDuringCombat()) return true;

  //   return game.settings.get(MODULE_ID, "hideEffects") === "never";
}

function setEffectVisibility(token, value, { surfaceMode }) {
  const fxInfoList = token.actor.appliedEffects;
  if (!shouldSkipEffectBackground()) {
    token.effects.bg.visible = value;
  }

  // Skip base overlay
  // Skip background frames
  const fxs = token.effects.children.filter(
    (fx) => fx !== token.effects.overlay && fx !== token.effects.bg,
  );

  let cnt = -1;
  for (const fx of fxs) {
    cnt++;
    if (shouldAlwaysShowEffect(fxInfoList[cnt], { surfaceMode })) continue; // Skip effects that should always be shown
    fx.visible = value;
  }
}

function shouldSkipEffectBackground() {
  return BG_FRAME_SKIP_MODULES.some((id) => game.modules.get(id)?.active);
}

export function shouldAlwaysShowEffect(effect, { surfaceMode }) {
  return (
    relevantSlug(effect, surfaceMode) ||
    relevantDuration(
      effect?.duration?.secondsRemaining ??
        (effect?.duration?.unit === "rounds" ? 1 : undefined),
      surfaceMode,
    )
  );
}

function relevantDuration(secondsRemaining, mode) {
  if (secondsRemaining < 0) {
    return false;
  }
  switch (mode) {
    case "relevant-under-1-hour":
    case "under-1-hour":
      return secondsRemaining <= DURATION.HOUR;
    case "relevant-under-10-min":
    case "under-10-min":
      return secondsRemaining <= DURATION.MINUTE * 10;
    case "relevant-under-1-min":
    case "under-1-min":
      return secondsRemaining <= DURATION.MINUTE * 10;
    default:
      return false;
  }
}

function relevantSlug(effect, mode) {
  return RELEVANT_MODES.has(mode) && effect?.type === "base"
    ? !!RELEVANT_EFFECTS.SLUGS.intersection(
        typeof effect?.statuses === "object" ? effect?.statuses : EMPTY_SET,
      )?.size
    : RELEVANT_EFFECTS.SLUGS.has(effect?.slug);
}

function isValidCharacter(actorType, setting) {
  switch (setting) {
    case "all":
      return true;
    case "pcs":
      return actorType === "character";
    case "npcs":
      return actorType === "npc";
    case "none":
      return false;
  }
}
