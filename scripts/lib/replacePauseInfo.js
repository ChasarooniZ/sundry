import { getSetting } from "./helpers.js";

export function setupPauseReplacement(active) {
  Hooks[active ? "on" : "off"]("renderGamePause", pauseReplacement);
}

export function setupPauseTextReplacement(active) {
  Hooks[active ? "on" : "off"]("renderGamePause", replacePauseText);
}

export function setupPauseImgReplacement(active) {
  Hooks[active ? "on" : "off"]("renderGamePause", replacePauseImg);
}

const pauseSplitRegex = /\||;/;
const MS_TO_MINUTE = 1000 * 60;

async function pauseReplacement(_pause, element) {
  const text = getSetting("replace.pause-text");
  if (text) {
    const options = text.split(pauseSplitRegex);
    const replacement =
      options[Math.floor(new Date().getTime() / MS_TO_MINUTE) % options.length];
    const pauseTextHTML = element.querySelector("#pause figcaption");
    pauseTextHTML.innerText = replacement.replaceAll(/\\n/g, "\n\n");
  }

  const img = getSetting("replace.pause-img");
  const faClass = getSetting("replace.pause-img-class");
  // const size = getSetting("replace.pause-size");
  const pauseImgHTML = element.querySelector("#pause img");
  if (isVideo(img)) {
    const videoHTML = getVideoPauseHTML(faClass, img);
    pauseImgHTML.outerHTML = videoHTML;
  } else {
    if (faClass !== "fa-beat") {
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
  filepath.endsWith(".webm");
}
