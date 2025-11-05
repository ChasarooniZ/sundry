import { MODULE_ID } from "../module.js";

export function toggleCustomCSS(customCSS, styleID, enable = true) {
  let style = document.getElementById(styleID);
  if (enable && !style) {
    style = document.createElement("style");
    style.id = styleID;
    style.textContent = customCSS;
    document.head.appendChild(style);
  } else if (style) {
    style.remove();
  }
}

export function getSetting(settingID) {
  return game.settings.get(MODULE_ID, settingID);
}

export async function setSetting(settingID, value) {
  return game.settings.set(MODULE_ID, settingID, value);
}

export function addElementsClass(elements, cssClass) {
  return elements?.forEach((element) => {
    element?.classList?.add(cssClass);
  });
}

export function removeElementsClass(elements, cssClass) {
  return elements?.forEach((element) => {
    element?.classList?.remove(cssClass);
  });
}

export function versionMigration() {
  if (
    foundry.utils.isNewerVersion(
      game.settings.get(MODULE_ID, "version"),
      "0.9.4"
    )
  ) {
    const oldPauseClass = game.settings.get(
      MODULE_ID,
      "sundry.replace.pause-img-class"
    );
    if (oldPauseClass === "fa-beat") {
      game.settings.set(MODULE_ID, "sundry.replace.pause-img-class", "fa-spin");
    }
  }

  game.settings.get(MODULE_ID, "version", game.modules?.get("sundry")?.version);
}
