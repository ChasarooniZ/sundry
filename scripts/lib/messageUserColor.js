import { STYLE_MODES, STYLE_LIST } from "./const.js";

/** Sourced from Dorako UI <3 */
export async function setupMessageUserColor(version = "off") {
  let fun = () => {};
  let mode = "on";
  switch (version) {
    case "20-percent":
      fun = addGradient20Percent;
      break;
    case "set-length":
      fun = addGradientSetAmt;
      break;
    case "off":
    default:
      mode = "off";
      break;
  }

  Hooks[mode]("renderChatMessageHTML", fun);

  // Setup Color on all existing messages
  for (const msg of game.messages.contents) {
    fun(
      msg,
      document.querySelector(`.chat-message[data-message-id="${msg.id}"]`),
    );
  }
}

function getHeaderColor(html, message) {
  return (
    getPlayerOwners(message.actor)[0]
      .color.rgb.map((val) => val * 255)
      .join(", ") ??
    message?.author?.color.rgb.map((val) => val * 255).join(", ") ??
    "218, 192, 251"
  );
}

function calcHeaderTextColor(headerColor) {
  const r = Color.fromString(headerColor).r;
  const g = Color.fromString(headerColor).g;
  const b = Color.fromString(headerColor).b;
  const yiq = (r * 299 + g * 587 + b * 114) / 1000;

  if (yiq >= 0.8) {
    return "dark";
  } else {
    return "light";
  }
}

function addGradient20Percent(message, html, _data) {
  addGradientHelper(message, html, STYLE_MODES["20-percent"]);
}

function addGradientSetAmt(message, html, _data) {
  addGradientHelper(message, html, STYLE_MODES["set-length"]);
}

function addGradientHelper(message, html, cssClass) {
  const colorBannerHeader = message.author.color.rgb
    .map((val) => val * 255)
    .join(", ");
  html.style.setProperty("--player-color", colorBannerHeader);
  html?.classList?.remove(STYLE_LIST.filter((st) => st !== cssClass));
  html?.classList?.add(cssClass);
}
