export async function openPlayerNotes({ open, edit }) {
    const actor = game.user?.character ?? canvas.tokens.controlled?.[0]?.actor;
    if (!actor || actor.type !== 'character') {
        ui.notifications.warn(
            game.i18n.localize(`${MODULE_ID}.notification.player-notes.no-character`)
        )
        return;
    }
    const noteInfo = actor?.system?.details?.biography.campaignNotes;

    const actorName = actor?.name

    // Create dialog with ProseMirror editor
    const display = await TextEditor.enrichHTML(noteInfo);
    const content = `
        <div>
            <prose-mirror
                name="biography"
                value="${noteInfo}"
                style="height: 390px">
                    ${display}
            </prose-mirror>
        </div>
    `;

    const dialog = await foundry.applications.api.DialogV2.wait({
        window: {
            title: `${game.i18n.localize(`${MODULE_ID}.display.player-notes.title`)} (${actorName})`
        },
        content,
        position: {
            width: 750,
            height: 500
        },
        buttons: [
            {
                label: "Save",
                action: "save",
                icon: "fas fa-save",
                default: true,
                callback: (event, button, dialog) => {
                    return button.form.elements.biography.value;
                }
            },
            {
                label: "Cancel",
                action: "cancel",
                icon: "fas fa-times"
            }
        ]
    });

    // If user clicked Save, update the actor
    if (dialog !== "cancel" && dialog !== null && dialog) {
        await actor.update({
            "system.details.biography.campaignNotes": dialog
        });

        ui.notifications.info(
            game.i18n.localize(`${MODULE_ID}.notification.player-notes.updated`)
        );
    }
}