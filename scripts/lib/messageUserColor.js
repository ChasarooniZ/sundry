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

// function getHeaderColor(html, message) {
//   return (
//     getPlayerOwners(message.actor)[0]
//       .color.rgb.map((val) => val * 255)
//       .join(", ") ??
//     message?.author?.color.rgb.map((val) => val * 255).join(", ") ??
//     "218, 192, 251"
//   );
// }

// function calcHeaderTextColor(headerColor) {
//   const r = Color.fromString(headerColor).r;
//   const g = Color.fromString(headerColor).g;
//   const b = Color.fromString(headerColor).b;
//   const yiq = (r * 299 + g * 587 + b * 114) / 1000;

//   if (yiq >= 0.8) {
//     return "dark";
//   } else {
//     return "light";
//   }
// }

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
  html?.style?.setProperty("--player-color", colorBannerHeader);
  html?.classList?.remove(STYLE_LIST.filter((st) => st !== cssClass));
  html?.classList?.add(cssClass);
}

// Stolen from Dorako who stole it from MrVauxs
// export function getPlayerOwners(actor) {
//   if (actor == null) return game.users.filter((x) => x.isGM);
//   const assigned = game.users.contents.find(
//     (user) => user.character?.id === actor.id,
//   );
//   if (assigned) return [assigned];

//   // If everyone owns it, nobody does.
//   if (actor.ownership.default === 3) {
//     return game.users.contents;
//   }

//   const sortedActorOwnership = Object.fromEntries(
//     Object.entries(actor.ownership).sort((a, b) => b[1] - a[1]),
//   );

//   // Check the ownership IDs, check if there is a player owner, yes, ignore GMs, no, count only GMs.
//   const owners = Object.keys(sortedActorOwnership)
//     .filter((x) => x !== "default")
//     .filter((x) =>
//       actor.hasPlayerOwner
//         ? !game.users.get(x)?.hasRole("GAMEMASTER")
//         : game.users.get(x)?.hasRole("GAMEMASTER"),
//     )
//     .map((x) => game.users.get(x))
//     .filter((element) => nonNullable(element));

//   if (owners.length) {
//     return owners;
//   } else {
//     // If "nobody" owns it, whoever is the primaryUpdater (read: GM) does.
//     // This should handle weirdos like { ownership: { default: 0 } }
//     if (actor.primaryUpdater) {
//       // log("Could not determine owner, defaulting to primaryUpdater.");
//       return [actor.primaryUpdater];
//     } else {
//       // log("Could not determine owner nor found the primaryUpdater, defaulting to all GMs.");
//       return game.users.filter((x) => x.isGM);
//     }
//   }
// }
