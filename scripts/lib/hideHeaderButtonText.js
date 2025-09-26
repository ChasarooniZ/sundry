export function setupHideHeaderButtonText(active) {
    if (active) {
        Hooks.on('renderApplication', hideHeaderButtons);
        Hooks.on('renderDocumentSheet', hideHeaderButtons);
        Hooks.on('renderActorSheet', hideHeaderButtons);
        Hooks.on('renderJournalSheet', hideHeaderButtons);
        Hooks.on('renderItemSheet', hideHeaderButtons);
        Hooks.on('renderRollTableConfig', hideHeaderButtons);
        Hooks.on('renderSidebarTab', hideHeaderButtons);
        Hooks.on('renderFormApplication', hideHeaderButtons);
    } else {

        Hooks.off('renderApplication', hideHeaderButtons);
        Hooks.off('renderDocumentSheet', hideHeaderButtons);
        Hooks.off('renderActorSheet', hideHeaderButtons);
        Hooks.off('renderJournalSheet', hideHeaderButtons);
        Hooks.off('renderItemSheet', hideHeaderButtons);
        Hooks.off('renderRollTableConfig', hideHeaderButtons);
        Hooks.off('renderSidebarTab', hideHeaderButtons);
        Hooks.off('renderFormApplication', hideHeaderButtons);
    }
}

async function hideHeaderButtons(_sheet, html) {
    html?.[0]?.classList?.add('sundry-hide-button-text')
}