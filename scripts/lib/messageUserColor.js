//TODO finish me

/** Sourced from Dorako UI <3 */
export async function setupMessageUserColor() {
  const version = "gradient";
  document.style.
  Hooks.on("renderChatMessageHTML", addGradientVersion);
  //   Hooks.on("renderChatMessageHTML", (chatMessage, html, messageData) => {
  //     const isNarratorToolsMessage = chatMessage.flags["narrator-tools"];
  //     const isMLDRoundMarker =
  //       chatMessage.flags["monks-little-details"]?.roundmarker;
  //     const isMCDRoundMarker =
  //       chatMessage.flags["monks-combat-details"]?.roundmarker;
  //     const isRoundMarker = isMLDRoundMarker || isMCDRoundMarker;
  //     if (isNarratorToolsMessage || isRoundMarker) {
  //       return;
  //     }

  //     html.style.setProperty(
  //       "--player-color",
  //       chatMessage?.author?.color ?? "#DAC0FB",
  //     );
  //     themeHeader(html, chatMessage);
  //   });
}

function themeHeader(html, message) {
  let messageHeader = html.querySelector(".message-header");
  const headerColor = getHeaderColor(html, message);
  messageHeader.style.setProperty("--header-color", headerColor);
  let textColTheme = calcHeaderTextColor(headerColor);
  html.dataset.headerTextColorScheme = textColTheme;
}

function getHeaderColor(html, message) {
  return (
    getPlayerOwners(message.actor)[0].color.css ??
    message?.author?.color ??
    "#DAC0FB"
  );
}

function calcHeaderTextColor(headerColor) {
  var r = Color.fromString(headerColor).r;
  var g = Color.fromString(headerColor).g;
  var b = Color.fromString(headerColor).b;
  var yiq = (r * 299 + g * 587 + b * 114) / 1000;

  if (yiq >= 0.8) {
    return "dark";
  } else {
    return "light";
  }
}

function addGradientVersion(message, html, _data) {
  const colorBannerHeader = message.author.color.css;
  html.style.setProperty("--player-color", colorBannerHeader);
  html?.classList?.add("sundry-message-user-color-gradient");
}

// Shamelessly stolen from @Icarus (FIX ME)
function addheaderVersion(message, html, _data) {
  const colorBannerHeader = message.author.color.css;

  //   html.style.setProperty("border-color", colorBannerHeader);
  html.style.setProperty("padding-inline", "0");
  html.style.setProperty("padding-top", "0");

  const chatmessageHeader = html.querySelector(".message-header");
  chatmessageHeader.style.setProperty("padding-inline", "0.5rem");
  const chatmessageContent = html.querySelector(".message-content");
  chatmessageContent.style.setProperty("padding-inline", "0.5rem");

  html.insertAdjacentHTML(
    "afterbegin",
    `<div class="sundry-card-color-banner"
    style="background: linear-gradient(90deg, ${colorBannerHeader} 60%, #605856 100%); height: 1rem">${colorBannerHeaderText}</div>`,
  );
  const colorBanner = html.querySelector(".sundry-card-color-banner");
  colorBanner.style.setProperty("border-top-right-radius", "0.25rem");
  colorBanner.style.setProperty("border-top-left-radius", "0.25rem");
}
