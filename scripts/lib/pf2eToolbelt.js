import { CLASS, QUERY } from "./const.js";
import { addElementsClass, removeElementsClass } from "./helpers.js";


export function setupColorizeToolbeltMessageSaves(active = true) {
    const elements = document.querySelectorAll(QUERY.MESSAGE.PF2E_TOOLBELT.TARGET_ROWS);
    if (active) {
        addElementsClass(elements, CLASS.COLORIZE.PF2E_TOOLBELT.MESSAGE_SAVES)
        Hooks.on('renderChatMessageHTML', colorizeToolbeltMessageSavesHook)
    } else {
        removeElementsClass(elements, CLASS.COLORIZE.PF2E_TOOLBELT.MESSAGE_SAVES)
        Hooks.off('renderChatMessageHTML', colorizeToolbeltMessageSavesHook)
    }
}

export function setupHighlightToolbeltRollSaves(active = true) {
    const elements = document.querySelectorAll(QUERY.MESSAGE.PF2E_TOOLBELT.TARGET_ROWS);
    if (active) {
        addElementsClass(elements, CLASS.HIGHLIGHT.PF2E_TOOLBELT.UNROLLED_ROLLS)
        Hooks.on('renderChatMessageHTML', highlightToolbeltRollSavesHook)
    } else {
        removeElementsClass(elements, CLASS.HIGHLIGHT.PF2E_TOOLBELT.UNROLLED_ROLLS)
        Hooks.off('renderChatMessageHTML', highlightToolbeltRollSavesHook)
    }
}

async function colorizeToolbeltMessageSavesHook(data, html) {
    html.classList.add(CLASS.COLORIZE.PF2E_TOOLBELT.MESSAGE_SAVES)
}

async function highlightToolbeltRollSavesHook(data, html) {
    html.classList.add(CLASS.HIGHLIGHT.PF2E_TOOLBELT.UNROLLED_ROLLS)
}
