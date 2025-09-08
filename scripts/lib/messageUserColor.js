//TODO finish me

/** Sourced from Dorako UI <3 */
export async function setupMessageUserColor() {
    Hooks.on("renderChatMessageHTML", (chatMessage, html, messageData) => {
        const isNarratorToolsMessage = chatMessage.flags["narrator-tools"];
        const isMLDRoundMarker = chatMessage.flags["monks-little-details"]?.roundmarker;
        const isMCDRoundMarker = chatMessage.flags["monks-combat-details"]?.roundmarker;
        const isRoundMarker = isMLDRoundMarker || isMCDRoundMarker;
        if (isNarratorToolsMessage || isRoundMarker) {
            return;
        }

        html.style.setProperty("--player-color", chatMessage?.author?.color ?? "#DAC0FB");
        themeHeader(html, chatMessage);
    });
}

function themeHeader(html, message) {
    let messageHeader = html.querySelector(".message-header");
    const headerColor = getHeaderColor(html, message);
    messageHeader.style.setProperty("--header-color", headerColor);
    let textColTheme = calcHeaderTextColor(headerColor);
    html.dataset.headerTextColorScheme = textColTheme;
}

function getHeaderColor(html, message) {
    return getPlayerOwners(message.actor)[0].color.css ?? message?.author?.color ?? "#DAC0FB";
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