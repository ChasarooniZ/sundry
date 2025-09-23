import { TEMPLATES } from "./const.js"

export function setupDisplayWeaponDamage(active) {
    if (active) {
        Hooks.on("renderWeaponSheetPF2e", renderItemSheetPF2e)
    } else {
        Hooks.off("renderWeaponSheetPF2e", renderItemSheetPF2e)
    }
}


async function renderItemSheetPF2e(sheet, html, info) {
    const {
        dice,
        die,
        damageType,
        modifier
    } = info?.document?.baseDamage ?? {};
    const data = {
        type: damageType,
        name: getDamageTypeLocalization(damageType),
        damage: `${dice}${die}${modifier ? ` + ${modifier}` : ""}`,
        icon: DAMAGE_TYPE_ICONS[damageType] ?? '',
        label: game.i18n.localize('sundry.display.base-damage')
    }
    const damageHTML = await renderTemplate(TEMPLATES.BASE_DAMAGE, data)

    const priceHTML = html?.[0]?.querySelector(".inventory-details .form-group.price");
    priceHTML.insertAdjacentHTML("afterend", damageHTML)
}


function getDamageTypeLocalization(damageType) {
    const localizationString = `PF2E.Trait${String(damageType).charAt(0).toUpperCase() + String(damageType).slice(1)}`
    return game.i18n.has(localizationString) ? game.i18n.localize(localizationString) : damageType
}



/** Copied from the system */
const DAMAGE_TYPE_ICONS = {
    bleed: "droplet",
    acid: "vial",
    bludgeoning: "hammer",
    cold: "snowflake",
    electricity: "bolt",
    fire: "fire",
    force: "sparkles",
    mental: "brain",
    piercing: "bow-arrow",
    poison: "spider",
    slashing: "axe",
    sonic: "waveform-lines",
    spirit: "ghost",
    vitality: "sun",
    void: "skull",
    untyped: null,
};