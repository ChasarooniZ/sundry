import { getSetting } from "./helpers.js";

export function setupPauseTextReplacement(active) {
  Hooks[active ? "on" : "off"]("renderGamePause", replacePauseText);
}

export function setupPauseImgReplacement(active) {
  Hooks[active ? "on" : "off"]("renderGamePause", replacePauseImg);
}

const pauseSplitRegex = /\||;/;

async function replacePauseText(_pause, element) {
  const text = getSetting("replace.pause-text");
  if (text) {
    const options = text.split(pauseSplitRegex);

    const replacement = options[Math.floor(Math.random() * options.length)];
    const pauseTextHTML = element.querySelector("#pause figcaption");
    pauseTextHTML.innerText = replacement.replaceAll(/\\n/g, "\n\n");
  }
}

async function replacePauseImg(_pause, element) {
  const img = getSetting("replace.pause-img");
  if (!!img && img !== "ui/pause.svg") {
    const pauseImgHTML = element.querySelector("#pause img");
    pauseImgHTML.src = img;
  }
}
