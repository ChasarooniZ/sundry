import { MODULE_ID } from "../module.js";

export async function openPlayerNotes({ open, edit }) {
  const actor = game.user?.character ?? canvas.tokens.controlled?.[0]?.actor;
  if (
    !actor ||
    (actor.type !== "character" && actor.type !== "npc") ||
    !actor.isOwner
  ) {
    ui.notifications.warn(
      game.i18n.localize(`${MODULE_ID}.notification.player-notes.no-character`),
    );
    return;
  }
  const noteInfo =
    actor.type === "character"
      ? {
          public: actor?.system?.details?.biography.campaignNotes,
          private: null,
        }
      : {
          public: actor?.system?.details?.publicNotes,
          private: actor?.system?.details?.privateNotes,
        };

  const actorName = actor?.name;

  // Create dialog with ProseMirror editor
  const displayPub = await TextEditor.enrichHTML(noteInfo?.public);
  const displayPriv = await TextEditor.enrichHTML(noteInfo?.private);
  const content = `
        <div>
            <prose-mirror
                name="public"
                value="${noteInfo?.public}"
                style="height: 390px">
                    ${displayPub}
            </prose-mirror>
           ${
             actor.type === "character"
               ? ""
               : `<prose-mirror
                name="private"
                value="${noteInfo?.private}"
                style="height: 390px">
                    ${displayPriv}
            </prose-mirror>`
           }
        </div>
    `;

  const dialog = await foundry.applications.api.DialogV2.wait({
    window: {
      title: `${game.i18n.localize(`${MODULE_ID}.display.player-notes.title`)} (${actorName})`,
    },
    content,
    position: {
      width: 750,
      height: actor.type === "character" ? 500 : 1000,
    },
    buttons: [
      {
        label: "Save",
        action: "save",
        icon: "fas fa-save",
        default: true,
        callback: (event, button, dialog) => {
          return {
            public: button?.form?.elements?.public?.value,
            private: button?.form?.elements?.private?.value,
          };
        },
      },
      {
        label: "Cancel",
        action: "cancel",
        icon: "fas fa-times",
      },
    ],
  });

  // If user clicked Save, update the actor
  if (dialog !== "cancel" && dialog !== null && dialog) {
    (await actor.type) === "character"
      ? actor.update({
          "system.details.biography.campaignNotes": dialog?.public,
        })
      : actor.update({
          "system.details.publicNotes": dialog?.public,
          "system.details.privateNotes": dialog?.private,
        });

    ui.notifications.info(
      game.i18n.localize(`${MODULE_ID}.notification.player-notes.updated`),
    );
  }
}
