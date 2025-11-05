import { getSetting } from "./helpers.js";

export function setupPauseReplacement() {
  Hooks.on("renderGamePause", pauseReplacement);
}

const pauseSplitRegex = /\||;/;
const MS_TO_MINUTE = 1000 * 60;

async function pauseReplacement(_pause, element) {
  const text = getSetting("replace.pause-text");
  if (text) {
    const options = text.includes("RollTable.")
      ? await getRollTableElements(text)
      : text.split(pauseSplitRegex);
    const replacement =
      options[Math.floor(new Date().getTime() / MS_TO_MINUTE) % options.length];
    const pauseTextHTML = element.querySelector("#pause figcaption");
    pauseTextHTML.innerText = replacement?.replaceAll(/\\n/g, "\n\n");
  }

  const img = getSetting("replace.pause-img");
  const faClass = getSetting("replace.pause-img-class");
  // const size = getSetting("replace.pause-size");
  const pauseImgHTML = element.querySelector("#pause img");
  if (isVideo(img)) {
    const videoHTML = getVideoPauseHTML(faClass, img);
    pauseImgHTML.outerHTML = videoHTML;
  } else {
    if (faClass !== "fa-spin") {
      pauseImgHTML.className = faClass;
    }
    if (!!img && img !== "ui/pause.svg") {
      pauseImgHTML.src = img;
    }
    // if (!!size && size > 0) {

    // }
  }
}

function getVideoPauseHTML(faClass, video) {
  return `<video autoplay="" loop="" muted="" disablepictureinpicture="" class="${faClass}" width="100" height="100">
            <source src="${video}" type="video/webm">
          </video>`;
}

function isVideo(filepath) {
  return filepath.endsWith(".webm");
}

async function getRollTableElements(uuid) {
  const table = await fromUuid(uuid);
  return table?.results?.contents?.map((result) => result?.name) ?? [];
}
