import { MODULE_ID } from "../module.js";

export function setupMystificationHelper(active = true) {
  Hooks[active ? "on" : "off"]("renderItemSheetPF2e", renderItemSheetPF2e);

  if (game.user.isGM) {
    Hooks[active ? "on" : "off"]("updateItem", hideCursedTrait);
  }
}

async function hideCursedTrait(item, changes) {
  if (
    changes?.system?.identification?.status &&
    (item?.system?.traits?.value?.includes("cursed") ||
      item.getFlag(MODULE_ID, "cursed"))
  ) {
    if (isUnidentified(changes)) {
      if (!item.getFlag(MODULE_ID, "cursed")) {
        await item?.setFlag(MODULE_ID, "cursed", true);
        await item?.update({
          "system.traits.value": item.system.traits.value.filter(
            (trait) => trait !== "cursed",
          ),
        });
      }
    } else {
      await item?.unsetFlag(MODULE_ID, "cursed");
      await item?.update({
        "system.traits.value": [item.system.traits.value, "cursed"].flat(),
      });
    }
  }
}

async function renderItemSheetPF2e(sheet, html, info) {
  const item = sheet.item;

  insertHTML(html, item);
}

function insertHTML(sheetHTML, sourceItem) {
  const dropLocation = sheetHTML?.[0]?.querySelector(
    ".pf2e.item.sheet form .sheet-body .tab.mystification .form-group .img-name",
  );
  dropLocation.insertAdjacentHTML(
    "beforeend",
    `<div class="drop-zone empty" id="sundry-mystification-drop-zone"
        data-tooltip="${game.i18n.localize("sundry.tooltip.mystification-drop-zone")}">
            <picture class="icon-placeholder"></picture>
            <span class="name">${game.i18n.localize("sundry.display.drop-item")}</span>
    </div>`,
  );
  if (dropLocation) {
    const dropZone = dropLocation?.querySelector(
      ".drop-zone#sundry-mystification-drop-zone",
    );
    if (dropZone) {
      dropZone.addEventListener("drop", async (event) => {
        const dataString = event.dataTransfer?.getData("text/plain");
        const dropData = JSON.parse(dataString ?? "");
        if (dropData?.type === "Item" && dropData?.uuid) {
          const i = await fromUuid(dropData?.uuid);
          if (i) {
            const mystificationData = getMystificationData(i);
            await sourceItem.update({
              "system.identification.unidentified": mystificationData,
            });
          }
        }
      });
    }
  }
}

function isUnidentified(item) {
  return item?.system?.identification?.status === "unidentified";
}

function getMystificationData(item) {
  return {
    name: item.name,
    img: item.img,
    data: {
      description: {
        value: item.system.description.value,
      },
    },
  };
}
