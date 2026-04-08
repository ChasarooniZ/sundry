import { MODULE_ID } from "../module.js";

const MINUTE = 60 * 1000;

export async function setupSkyrimLoadingTips(active = true) {
  Hooks[active ? "on" : "off"]("canvasInit", async () => {
    const journal = await fromUuid(
      game.settings.get(MODULE_ID, "highlight.loading-tips.items"),
    );
    const pages = journal.pages.contents;

    const storedGlobalNumber = game.settings.get(
      MODULE_ID,
      "highlight.loading-tips.global-last",
    );
    const storedLocalNumber = game.settings.get(
      MODULE_ID,
      "highlight.loading-tips.local-last",
    );
    let number = Math.floor(Math.random() * pages.length);
    if (storedGlobalNumber !== -1 && storedLocalNumber !== storedGlobalNumber) {
      //We haven't use the number yet
      game.settings.set(
        MODULE_ID,
        "highlight.loading-tips.local-last",
        storedGlobalNumber,
      );
      number = storedGlobalNumber;
    } else {
      // we HAVE used the number
      game.settings.set(
        MODULE_ID,
        "highlight.loading-tips.global-last",
        number,
      );
      game.settings.set(MODULE_ID, "highlight.loading-tips.local-last", number);
    }
    const page = pages[number];
    showLoadingOverlay({
      art: page.src,
      text: page.image.caption || page.name,
      duration:
        game.settings.get(MODULE_ID, "highlight.loading-tips.duration") * 1000,
    });
  });
}

function showLoadingOverlay({ art, text, duration = 5000 }) {
  const existing = document.getElementById("sundry-skyrim-loading-tip");
  if (existing) existing.remove();

  const style = document.createElement("style");
  style.id = "sundry-skyrim-loading-tip-style";
  style.textContent = `
    #sundry-skyrim-loading-tip #ov-art {
      position:absolute;
      left:0;
      bottom:-8%;
      width:52%;
      height:110%;
      object-fit:contain;
      object-position:bottom center;
      z-index:2;
      animation: artRise ${duration}ms;
    }
  `;
  document.head.appendChild(style);

  const overlay = document.createElement("div");
  overlay.id = "sundry-skyrim-loading-tip";
  overlay.innerHTML = `
    <!--<div class="fogwrapper">
      <div id="foglayer_01" class="fog">
        <div class="image01"></div>
        <div class="image02"></div>
      </div>
      <div id="foglayer_02" class="fog">
        <div class="image01"></div>
        <div class="image02"></div>
      </div>
      <div id="foglayer_03" class="fog">
        <div class="image01"></div>
        <div class="image02"></div>
      </div>
    </div> -->
    <img id="ov-art" src="${art}" />
    <div id="ov-text">${text}</div>
  `;
  document.body.appendChild(overlay);
  setTimeout(() => {
    document.addEventListener("click", clickToSkip);
  }, 200);
  setTimeout(() => {
    closeOutOverlay({ overlay, style, fast: false });
  }, duration);
}

function closeOutOverlay({
  overlay = document.getElementById("sundry-skyrim-loading-tip"),
  style = document.getElementById("sundry-skyrim-loading-tip-style"),
  fast = false,
}) {
  const time = fast ? 0.2 : 0.8;
  if (overlay?.style) {
    overlay.style.transition = `opacity ${time}s`;
    overlay.style.opacity = "0";
  }
  setTimeout(() => {
    overlay?.remove();
    style?.remove();
  }, time * 1000);
}

function clickToSkip() {
  closeOutOverlay({ fast: true });
  document.removeEventListener("click", clickToSkip);
}
