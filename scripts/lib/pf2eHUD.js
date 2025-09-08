import { CLASS, QUERY } from "./const.js";

export function setupColorizePersistentPF2eHUD(active = true) {
    const hud = document.querySelector(QUERY.PF2E_HUD.PERSISTENT_HUD.BASE);
    if (active) {
        hud.classList.add(CLASS.COLORIZE.PF2E_HUD.PERSISTENT_HUD)
        Hooks.on('renderPersistentPF2eHUD', colorizePersistentPF2eHUDHook)
    } else {

        hud.classList.remove(CLASS.COLORIZE.PF2E_HUD.PERSISTENT_HUD)
        Hooks.off('renderPersistentPF2eHUD', colorizePersistentPF2eHUDHook)
    }
}


async function colorizePersistentPF2eHUDHook(data, html) {
    html.classList.add(CLASS.COLORIZE.PF2E_HUD.PERSISTENT_HUD)
}