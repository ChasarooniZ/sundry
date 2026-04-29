import { MODULE_ID } from "../module.js";

const BUTTON_ID = "player-list-toggle-button";

export function setupPlayerListToggleButton(type = "off") {
  switch (type) {
    case "hidden":
      createButton(false);
      break;
    case "visible":
      createButton(true);
      break;
    default:
      removeButton();
  }
}

function removeButton() {
  const existing = document.getElementById(BUTTON_ID);
  if (existing) existing.remove();
}

function createButton(visible) {
  const existing = document.getElementById(BUTTON_ID);
  if (existing) existing.remove();

  let hidden = !visible;

  const btn = document.createElement("button");
  btn.id = BUTTON_ID;
  Object.assign(btn.dataset, {
    tooltip: hidden
      ? game.i18n.localize(`${MODULE_ID}.tooltip.hud.player-list.show`)
      : game.i18n.localize(`${MODULE_ID}.tooltip.hud.player-list.hide`),
    tooltipDirection: "RIGHT",
  });
  btn.classList.add(
    "icon",
    "fa-solid",
    hidden ? "fa-up-right" : "fa-down-left",
  );
  if (hidden) {
    hidePlayerList();
  } else {
    showPlayerList();
  }
  console.log({ btn });

  btn.addEventListener("click", () => {
    hidden = !hidden;
    if (hidden) {
      hidePlayerList();
    } else {
      showPlayerList();
    }
    btn.classList.remove(hidden ? "fa-down-left" : "fa-up-right");
    btn.classList.add(hidden ? "fa-up-right" : "fa-down-left");
    Object.assign(btn.dataset, {
      tooltip: hidden
        ? game.i18n.localize(`${MODULE_ID}.tooltip.hud.player-list.show`)
        : game.i18n.localize(`${MODULE_ID}.tooltip.hud.player-list.hide`),
    });
  });
  document.body.appendChild(btn);
}

function hidePlayerList() {
  const playersAside = document.getElementById("players");
  playersAside.classList.remove("sundry-player-list-show");
  playersAside.classList.add("sundry-player-list-hide");
}

function showPlayerList() {
  const playersAside = document.getElementById("players");
  playersAside.classList.remove("sundry-player-list-hide");
  playersAside.classList.add("sundry-player-list-show");
}
