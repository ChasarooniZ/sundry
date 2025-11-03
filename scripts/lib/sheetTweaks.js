import { toggleCustomCSS } from "./helpers.js";

export function hideSellAllTreasure(active = true) {
    toggleCustomCSS(hideSellAllTreasureCSS,
        hideSellAllTreasureStyleID, active)
}

export function hideDefaultCraftChecks(active = true) {
    toggleCustomCSS(hideDefaultCraftChecksCSS,
        hideDefaultCraftChecksStyleID, active)
}



const hideSellAllTreasureStyleID = 'hide-sell-all-treasure';
const hideDefaultCraftChecksStyleID = 'hide-default-craft-checks';

const hideSellAllTreasureCSS = `
li[data-tooltip="Sell All Treasure"], a.item-sell-treasure {
    display: none;
}
`

const hideDefaultCraftChecksCSS = `
.actor.sheet .tab.crafting section.window-content button.blue {
	display: none;
}
.actor.sheet .tab.crafting section.window-content button.craft {
	display: none;
}
`