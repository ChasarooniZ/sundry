import { MODULE_ID } from "../module.js";

export async function getRandomPoint() {
  if (!game.modules.get("sequencer")?.active) {
    ui.notifications.error(
      "[Error] This requires the 'Sequencer' module to use, please install it",
    );
  }
  if (!game.settings.get(MODULE_ID, "highlight.random-location.first-use")) {
    ui.notifications.info(
      `[${game.modules.get(MODULE_ID)?.title}] ${game.i18n.localize("sundry.notification.random-location.first-use")}`,
      { permanent: true },
    );
    game.settings.set(MODULE_ID, "highlight.random-location.first-use", false);
  }
  if (window?.sundryRandomModeOn) return;
  window.sundryRandomModeOn = true;
  let loop = true;
  const points = [];
  let cnt = 0;
  while (loop) {
    const location = await Sequencer.Crosshair.show({
      label: {
        text: `${cnt}`,
      },
      texture: "icons/svg/cancel.svg",
      fillAlpha: 0,
    });
    if (location) {
      points.push(location);
      new Sequence()
        .effect()
        .atLocation(location)
        .file("icons/svg/cancel.svg")
        .tint("#ff0000")
        .persist()
        .name("randomPoints")
        .size(1, { gridUnits: true })
        .aboveInterface()
        .xray()
        .filter("Glow", { distance: 5, color: 0x0, quality: 0.1 })
        .play();
    } else {
      loop = false;
    }

    cnt++;
  }
  Sequencer.EffectManager.endEffects({ name: "randomPoints" });
  const pt = Sequencer.Helpers.random_array_element(points);
  canvas.ping(pt, { duration: 5000 });
  window.sundryRandomModeOn = false;
  ui.notifications.info(
    game.i18n.localize("sundry.notification.random-location.finished"),
  );
}
