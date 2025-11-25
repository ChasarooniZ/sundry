import { TEMPLATES } from "./const.js";

const runeHTMLCache = new Map();

export function setupDisplayItemPropertyRunes(active) {
    if (active) {
        Hooks.on("renderArmorSheetPF2e", renderItemSheetPF2e)
        Hooks.on("renderWeaponSheetPF2e", renderItemSheetPF2e)
        Hooks.on("renderActorSheetPF2e", renderActorSheetPF2e)
        Hooks.on("updateItem", clearItemCache)
    } else {
        Hooks.off("renderArmorSheetPF2e", renderItemSheetPF2e)
        Hooks.off("renderWeaponSheetPF2e", renderItemSheetPF2e)
        Hooks.on("renderActorSheetPF2e", renderActorSheetPF2e)
        Hooks.off("updateItem", clearItemCache)
        runeHTMLCache.clear()
    }
}

function clearItemCache(item) {
    const itemUuid = item.uuid;
    for (const key of runeHTMLCache.keys()) {
        if (key.startsWith(itemUuid)) {
            runeHTMLCache.delete(key);
        }
    }
}

async function renderActorSheetPF2e(sheet, html, info) {
    const weapons = info.actor.items.documentsByType.weapon.filter(item => item?.system?.identification?.status === 'identified' && item?.system?.runes?.property?.length > 0);

    for (const weapon of weapons) {
        const runeHTML = await getItemRuneHTML(weapon?.system?.runes?.property, weapon?.type, weapon.uuid)
        const descriptionHTML = html.querySelector(`ul[data-item-types="weapon,shield"] li[data-uuid='${weapon.uuid}'] div.description`)
        if (!runeHTML) return;
        descriptionHTML.insertAdjacentHTML('beforeend', runeHTML)
    }
}

async function renderItemSheetPF2e(sheet, html, info) {
    if (info?.document?.system?.identification?.status === 'identified' && info?.document?.system?.runes?.property?.length > 0) {
        const runeHTML = await getItemRuneHTML(info?.document?.system?.runes?.property, info?.document?.type, info.document.uuid)
        if (!runeHTML) return;
        insertHTML(html, runeHTML)
    }
}

function insertHTML(sheetHTML, runeHTML) {
    const editorHTML = sheetHTML?.[0]?.querySelector(".description .main .editor-content");
    editorHTML.insertAdjacentHTML('beforeend', runeHTML)
}


async function getItemRuneHTML(runes, type, itemUuid) {
    if (runes?.length > 0) {
        const runesKey = runes.join(',');
        const cacheKey = `${itemUuid}-${runesKey}`;

        if (runeHTMLCache.has(cacheKey)) {
            return runeHTMLCache.get(cacheKey);
        }

        const html = await getItemRuneHTMLHelper(
            runes.map(rune => ({
                name: getNameLocalization(rune, type),
                uuid: RUNE_LIST[rune] ?? rune
            }))
        );

        runeHTMLCache.set(cacheKey, html);

        if (runeHTMLCache.size > 100) {
            const firstKey = runeHTMLCache.keys().next().value;
            runeHTMLCache.delete(firstKey);
        }

        return html;
    } else {
        return false;
    }
}

async function getItemRuneHTMLHelper(runes) {
    return await TextEditor.enrichHTML(await renderTemplate(TEMPLATES.RUNES_ON_ITEM, { runes }));
}

function getNameLocalization(runeDropdownID, type) {
    if (type === 'armor') {
        return game.i18n.localize(`PF2E.ArmorPropertyRune${String(runeDropdownID).charAt(0).toUpperCase() + String(runeDropdownID).slice(1)}`)
    } else if (type === 'weapon') {
        return game.i18n.localize(`PF2E.WeaponPropertyRune.${runeDropdownID}.Name`)
    } else {
        return runeDropdownID;
    }
}

const RUNE_LIST = {
    // Armor Runes
    "acidResistant": "Compendium.pf2e.equipment-srd.Item.Lw3B9DpnyrpXD9Di",
    "advancing": "Compendium.pf2e.equipment-srd.Item.45zjE7pj6FUHuz3K",
    "aimAiding": "Compendium.pf2e.equipment-srd.Item.mKlUg7SWC5LcOqaj",
    "antimagic": "Compendium.pf2e.equipment-srd.Item.o02lg3k1RBoFXVFV",
    "assisting": "Compendium.pf2e.equipment-srd.Item.Rm2cojERpLEWB9B3",
    "bitter": "Compendium.pf2e.equipment-srd.Item.nGZPhGpCxM8U1JXv",
    "coldResistant": "Compendium.pf2e.equipment-srd.Item.Lw3B9DpnyrpXD9Di",
    "deathless": "Compendium.pf2e.equipment-srd.Item.kOEZCUTCPCqCFoJf",
    "electricityResistant": "Compendium.pf2e.equipment-srd.Item.Lw3B9DpnyrpXD9Di",
    "energyAdaptive": "Compendium.pf2e.equipment-srd.Item.DAWaXFtevHLUJxHB",
    "ethereal": "Compendium.pf2e.equipment-srd.Item.q70WXJO1rswduHuT",
    "fireResistant": "Compendium.pf2e.equipment-srd.Item.Lw3B9DpnyrpXD9Di",
    "fortification": "Compendium.pf2e.equipment-srd.Item.8buhFcGwuaJRrp0y",
    "glamered": "Compendium.pf2e.equipment-srd.Item.iTxqImupNnm8gvoe",
    "gliding": "Compendium.pf2e.equipment-srd.Item.A2Z7Mh8A59wZb5vv",
    "greaterAcidResistant": "Compendium.pf2e.equipment-srd.Item.9CAWAKkZE7dr4FlJ",
    "greaterAdvancing": "Compendium.pf2e.equipment-srd.Item.1neYjXMc4srH7KQ0",
    "greaterColdResistant": "Compendium.pf2e.equipment-srd.Item.9CAWAKkZE7dr4FlJ",
    "greaterDread": "Compendium.pf2e.equipment-srd.Item.6PW3zAn8fWW3IYA0",
    "greaterElectricityResistant": "Compendium.pf2e.equipment-srd.Item.9CAWAKkZE7dr4FlJ",
    "greaterFireResistant": "Compendium.pf2e.equipment-srd.Item.9CAWAKkZE7dr4FlJ",
    "greaterFortification": "Compendium.pf2e.equipment-srd.Item.ujWnpVMkbTljMGN9",
    "greaterInvisibility": "Compendium.pf2e.equipment-srd.Item.bxz885LMjLCkpDq3",
    "greaterQuenching": "Compendium.pf2e.equipment-srd.Item.HhtZl2pr7xChKu2c",
    "greaterReady": "Compendium.pf2e.equipment-srd.Item.fumxKes1z2hLN2U7",
    "greaterShadow": "Compendium.pf2e.equipment-srd.Item.bSm0Hki8N2L50OZw",
    "greaterSlick": "Compendium.pf2e.equipment-srd.Item.LiJMupjynmkM5Mld",
    "greaterStanching": "Compendium.pf2e.equipment-srd.Item.ioLWDzXp2dG7ZMHf",
    "greaterSwallowSpike": "Compendium.pf2e.equipment-srd.Item.ciykvIC4SFFxIfUw",
    "greaterWinged": "Compendium.pf2e.equipment-srd.Item.ciykvIC4SFFxIfUw",
    "immovable": "Compendium.pf2e.equipment-srd.Item.n8nLwFR4VFFmAny5",
    "implacable": "Compendium.pf2e.equipment-srd.Item.XkjOK05Gw0o3iycr",
    "invisibility": "Compendium.pf2e.equipment-srd.Item.VDudQ4x2ozosAbTb",
    "lesserDread": "Compendium.pf2e.equipment-srd.Item.gSSibF07emWGpGKw",
    "magnetizing": "Compendium.pf2e.equipment-srd.Item.jrjwukkie7Y7wkxu",
    "majorQuenching": "Compendium.pf2e.equipment-srd.Item.jrjwukkie7Y7wkxu",
    "majorShadow": "Compendium.pf2e.equipment-srd.Item.2FjdEflsVldnuebM",
    "majorSlick": "Compendium.pf2e.equipment-srd.Item.9imz3VgBXCg13RfT",
    "majorStanching": "Compendium.pf2e.equipment-srd.Item.ZTdRDRew1B0zTGiU",
    "majorSwallowSpike": "Compendium.pf2e.equipment-srd.Item.RRFyASbHcdclympe",
    "malleable": "Compendium.pf2e.equipment-srd.Item.eHfL8Apfx4fxGksT",
    "misleading": "Compendium.pf2e.equipment-srd.Item.68rHNRZmlnyaUbBF",
    "moderateDread": "Compendium.pf2e.equipment-srd.Item.4cbe0WVSHn1FxygQ",
    "portable": "Compendium.pf2e.equipment-srd.Item.VYXAdLJdF0XSeX5m",
    "quenching": "Compendium.pf2e.equipment-srd.Item.tpkkAtlMIOL8TnW6",
    "raiment": "Compendium.pf2e.equipment-srd.Item.iTxqImupNnm8gvoe",
    "ready": "Compendium.pf2e.equipment-srd.Item.QNPwzwKervKpk6YO",
    "rockBraced": "Compendium.pf2e.equipment-srd.Item.1n22FbWdDNC7tLT6",
    "shadow": "Compendium.pf2e.equipment-srd.Item.kEy7Uc1VisizGgtf",
    "sinisterKnight": "Compendium.pf2e.equipment-srd.Item.QDYPr19De3TBIysx",
    "sizeChanging": "Compendium.pf2e.equipment-srd.Item.Z5FvYWLEpWVo3PUF",
    "slick": "Compendium.pf2e.equipment-srd.Item.uQOaRpfkUFVYD0Gx",
    "soaring": "Compendium.pf2e.equipment-srd.Item.CJtn848AL7Q0Lxf2",
    "spellwatch": "Compendium.pf2e.equipment-srd.Item.qfyvOY3JTGUkOipr",
    "stanching": "Compendium.pf2e.equipment-srd.Item.NJtIwMIzjdRqupAM",
    "swallowSpike": "Compendium.pf2e.equipment-srd.Item.BKjwg0TEGioiYpz1",
    "trueQuenching": "Compendium.pf2e.equipment-srd.Item.hGZNrPMdxsabNFLx",
    "trueStanching": "Compendium.pf2e.equipment-srd.Item.dLYifig01WulSNVF",
    "winged": "Compendium.pf2e.equipment-srd.Item.ds7j3D8IIyxWd2XI",
    //Weapon Runes
    "ancestralEchoing": "Compendium.pf2e.equipment-srd.Item.oL8G6OqITPJ5Fd6A",
    "anchoring": "Compendium.pf2e.equipment-srd.Item.SuKERInt6Z3I3bCa",
    "ashen": "Compendium.pf2e.equipment-srd.Item.yMEDmJWDPv2i78WO",
    "astral": "Compendium.pf2e.equipment-srd.Item.6llILJtsTPgtYXgx",
    "authorized": "Compendium.pf2e.equipment-srd.Item.tEXUCp02ylyoJoyP",
    "bane": "Compendium.pf2e.equipment-srd.Item.hnbbqvzYDyhDiJnf",
    "bloodbane": "Compendium.pf2e.equipment-srd.Item.C9wOlvuVCjVbz1YQ",
    "bloodthirsty": "Compendium.pf2e.equipment-srd.Item.AgDNThyJHtsp1Vjt",
    "bolkasBlessing": "Compendium.pf2e.equipment-srd.Item.fqnjZzwBi9GH4CXO",
    "brilliant": "Compendium.pf2e.equipment-srd.Item.LbdnZFlyLFdAE617",
    "called": "Compendium.pf2e.equipment-srd.Item.QHc7AnKoMpcqsI2d",
    "coating": "Compendium.pf2e.equipment-srd.Item.y9RUbQec9zGeqqcE",
    "conducting": "Compendium.pf2e.actionspf2e.Item.BKnN9la3WNrRgZ6n",
    "corrosive": "Compendium.pf2e.equipment-srd.Item.Wm0X7Pfd1bfocPSv",
    "crushing": "Compendium.pf2e.equipment-srd.Item.JY8X4RSfg6xIqAC9",
    "cunning": "Compendium.pf2e.equipment-srd.Item.T4gTHDKJ0HI10p3y",
    "dancing": "Compendium.pf2e.equipment-srd.Item.DCPsilr8wbPXxTUv",
    "decaying": "Compendium.pf2e.equipment-srd.Item.fyiW23MFe8p06KL5",
    "deathdrinking": "Compendium.pf2e.equipment-srd.Item.4DXupoMmwenFn4Kc",
    "demolishing": "Compendium.pf2e.equipment-srd.Item.i9hF185TRK0cH8B4",
    "disrupting": "Compendium.pf2e.equipment-srd.Item.LwQb7ryTC8FlOXgX",
    "earthbinding": "Compendium.pf2e.equipment-srd.Item.OClYfRHzoynib6wX",
    "energizing": "Compendium.pf2e.equipment-srd.Item.Qqh586pudsEqITUk",
    "extending": "Compendium.pf2e.equipment-srd.Item.bJORQsO9E1JCJh6i",
    "fanged": "Compendium.pf2e.equipment-srd.Item.pcGdJvwun0tjrUTz",
    "fearsome": "Compendium.pf2e.equipment-srd.Item.P6v2AtJw7AUwaDzf",
    "flaming": "Compendium.pf2e.equipment-srd.Item.XszNvxnymWYRaoTp",
    "flickering": "Compendium.pf2e.equipment-srd.Item.p6RmUi2zCSmjd737",
    "flurrying": "Compendium.pf2e.equipment-srd.Item.GNX0BNOoCSOYPedi",
    "frost": "Compendium.pf2e.equipment-srd.Item.M5M1WJ5KzbYfRGsY",
    "ghostTouch": "Compendium.pf2e.equipment-srd.Item.JQdwHECogcTzdd8R",
    "giantKilling": "Compendium.pf2e.equipment-srd.Item.EjV3Pb13DLzGTCcY",
    "greaterAnchoring": "Compendium.pf2e.equipment-srd.Item.kY41VIXUSEJYEznp",
    "greaterAshen": "Compendium.pf2e.equipment-srd.Item.lo5QOMA9VAUwUVl7",
    "greaterAstral": "Compendium.pf2e.equipment-srd.Item.hebf5k3cd7LO6luX",
    "greaterBloodbane": "Compendium.pf2e.equipment-srd.Item.zEys8FeMMAwTqwgW",
    "greaterBolkasBlessing": "Compendium.pf2e.equipment-srd.Item.mcBXIHJGVQrbDLxi",
    "greaterBrilliant": "Compendium.pf2e.equipment-srd.Item.n8MonEa4ZBdvEovc",
    "greaterCorrosive": "Compendium.pf2e.equipment-srd.Item.vQUIUAFOTOWj3ohh",
    "greaterCrushing": "Compendium.pf2e.equipment-srd.Item.t6SSQYruLsDWj5Tl",
    "greaterDecaying": "Compendium.pf2e.equipment-srd.Item.HGsA5gXtaAA65n9e",
    "greaterDisrupting": "Compendium.pf2e.equipment-srd.Item.oVrVzML63VFvVfKk",
    "greaterExtending": "Compendium.pf2e.equipment-srd.Item.WHwprq9Xym2DOr2x",
    "greaterFanged": "Compendium.pf2e.equipment-srd.Item.cvb47A6K1w7RfNiv",
    "greaterFearsome": "Compendium.pf2e.equipment-srd.Item.uz3JCjRvkE44jxMd",
    "greaterFlaming": "Compendium.pf2e.equipment-srd.Item.RSZwUlCzUX7Nb4UA",
    "greaterFrost": "Compendium.pf2e.equipment-srd.Item.Sexud7FdxIrg50vU",
    "greaterGiantKilling": "Compendium.pf2e.equipment-srd.Item.CxadMTEjnuXyqmcQ",
    "greaterHauling": "Compendium.pf2e.equipment-srd.Item.o0XXVVymB8kluwLK",
    "greaterImpactful": "Compendium.pf2e.equipment-srd.Item.ri9QkRCD6cAbQ6t3",
    "greaterKolssOath": "Compendium.pf2e.equipment-srd.Item.BuQsMeD7IP4mvDCQ",
    "greaterRooting": "Compendium.pf2e.equipment-srd.Item.T5KifnxLN3vWuUJa",
    "greaterShock": "Compendium.pf2e.equipment-srd.Item.TEa1oKZbwsOvC6TZ",
    "greaterThundering": "Compendium.pf2e.equipment-srd.Item.Lb7F2BR9X9TF1vjX",
    "greaterTruddsStrength": "Compendium.pf2e.equipment-srd.Item.wvo5Qaj5qn7jFHaA",
    "grievous": "Compendium.pf2e.equipment-srd.Item.qUnDHEXteUQGE8yp",
    "hauling": "Compendium.pf2e.equipment-srd.Item.2ovu1AioLLff9p8w",
    "holy": "Compendium.pf2e.equipment-srd.Item.DH0kB9Wbr5pDeunX",
    "hopeful": "Compendium.pf2e.equipment-srd.Item.NCE7g1U3q3RYwCY2",
    "hooked": "Compendium.pf2e.equipment-srd.Item.S9eytXwDMdwdSh2z",
    "impactful": "Compendium.pf2e.equipment-srd.Item.H9qYN48voa2ZDy3i",
    "impossible": "Compendium.pf2e.equipment-srd.Item.uU4VC8OlhDHslT4i",
    "keen": "Compendium.pf2e.equipment-srd.Item.hg3IogR8ue2IWwgS",
    "kinWarding": "Compendium.pf2e.equipment-srd.Item.7vwcuBIe4BNS5uuE",
    "kolssOath": "Compendium.pf2e.equipment-srd.Item.tvFMexALNZ70NVwh",
    "majorFanged": "Compendium.pf2e.equipment-srd.Item.qL1S3vGfv8Dh5yAE",
    "majorRooting": "Compendium.pf2e.equipment-srd.Item.h4n9PdQrOkCrJ9sY",
    "merciful": "Compendium.pf2e.equipment-srd.Item.r28DjJEjF6jvCcfb",
    "nightmare": "Compendium.pf2e.equipment-srd.Item.TRUl7Iro5aKtqFMA",
    "pacifying": "Compendium.pf2e.equipment-srd.Item.R8I13CDRzvpVXOVe",
    "returning": "Compendium.pf2e.equipment-srd.Item.qlunQzfnzPQpMG6U",
    "rooting": "Compendium.pf2e.equipment-srd.Item.yGgsoSA8EaaEsYZn",
    "serrating": "Compendium.pf2e.equipment-srd.Item.SV7W0lC2d8mfYuhy",
    "shifting": "Compendium.pf2e.equipment-srd.Item.roeYtwlIe65BPMJ1",
    "shock": "Compendium.pf2e.equipment-srd.Item.NVst7e69agGG9Qwd",
    "shockwave": "Compendium.pf2e.equipment-srd.Item.QNaCujl2faKRyLD1",
    "spellStoring": "Compendium.pf2e.equipment-srd.Item.payq4TwkN2BRF6fs",
    "speed": "Compendium.pf2e.equipment-srd.Item.KnZL0xPWDzQx9vWQ",
    "swarming": "Compendium.pf2e.equipment-srd.Item.z8nKK4rSUGQVT2t9",
    "thundering": "Compendium.pf2e.equipment-srd.Item.dTxbaa7HSiJbIuNN",
    "truddsStrength": "Compendium.pf2e.equipment-srd.Item.I8XecIUYhwagAnXv",
    "trueRooting": "Compendium.pf2e.equipment-srd.Item.aXqCFjLSSjC3a1Mq",
    "underwater": "Compendium.pf2e.equipment-srd.Item.5QKAoWrpSetjHVJs",
    "unholy": "Compendium.pf2e.equipment-srd.Item.gmMrJREf4JSHd2dZ",
    "vorpal": "Compendium.pf2e.equipment-srd.Item.6xaxxKfvXED6LfIY",
    "wounding": "Compendium.pf2e.equipment-srd.Item.fo6Yhq5mbQXsnZs0"
}