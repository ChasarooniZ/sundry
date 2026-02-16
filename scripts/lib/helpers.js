import { MODULE_ID } from "../module.js";

export function toggleCustomCSS(customCSS, styleID, enable = true) {
  let style = document.getElementById(styleID);
  if (enable && !style) {
    style = document.createElement("style");
    style.id = styleID;
    style.textContent = customCSS;
    document.head.appendChild(style);
  } else if (style) {
    style.remove();
  }
}

export function getSetting(settingID) {
  return game.settings.get(MODULE_ID, settingID);
}

export async function setSetting(settingID, value) {
  return game.settings.set(MODULE_ID, settingID, value);
}

export function addElementsClass(elements, cssClass) {
  return elements?.forEach((element) => {
    element?.classList?.add(cssClass);
  });
}

export function removeElementsClass(elements, cssClass) {
  return elements?.forEach((element) => {
    element?.classList?.remove(cssClass);
  });
}

export function versionMigration() {
  if (
    foundry.utils.isNewerVersion(
      game.settings.get(MODULE_ID, "version"),
      "0.9.4",
    )
  ) {
    const oldPauseClass = game.settings.get(
      MODULE_ID,
      "sundry.replace.pause-img-class",
    );
    if (oldPauseClass === "fa-beat") {
      game.settings.set(MODULE_ID, "sundry.replace.pause-img-class", "fa-spin");
    }
  }

  game.settings.get(MODULE_ID, "version", game.modules?.get("sundry")?.version);
}

export function isF2eSystem() {
  return game.system.id === "pf2e" || game.system.id === "sf2e";
}

const spellEntry = {
  _id: "1AmZDKEmlr6DEFSl",
  img: "systems/pf2e/icons/default-icons/spellcastingEntry.svg",
  name: "Monk Focus Spells",
  sort: 100000,
  system: {
    description: {
      gm: "",
      value: "",
    },
    rules: [],
    slug: null,
    _migration: {
      version: 0.955,
      lastMigration: null,
      previous: null,
    },
    traits: {
      otherTags: [],
    },
    publication: {
      title: "",
      authors: "",
      license: "ORC",
      remaster: true,
    },
    ability: {
      value: "cha",
    },
    spelldc: {
      value: 23,
      dc: 32,
    },
    tradition: {
      value: "occult",
    },
    prepared: {
      value: "focus",
    },
    showSlotlessLevels: {
      value: true,
    },
    proficiency: {
      value: 1,
    },
    slots: {
      slot0: {
        prepared: [],
        value: 0,
        max: 0,
      },
      slot1: {
        prepared: [],
        value: 0,
        max: 0,
      },
      slot2: {
        prepared: [],
        value: 0,
        max: 0,
      },
      slot3: {
        prepared: [],
        value: 0,
        max: 0,
      },
      slot4: {
        prepared: [],
        value: 0,
        max: 0,
      },
      slot5: {
        prepared: [],
        value: 0,
        max: 0,
      },
      slot6: {
        prepared: [],
        value: 0,
        max: 0,
      },
      slot7: {
        prepared: [],
        value: 0,
        max: 0,
      },
      slot8: {
        prepared: [],
        value: 0,
        max: 0,
      },
      slot9: {
        prepared: [],
        value: 0,
        max: 0,
      },
      slot10: {
        prepared: [],
        value: 0,
        max: 0,
      },
      slot11: {
        prepared: [],
        value: 0,
        max: 0,
      },
    },
    autoHeightenLevel: {
      value: null,
    },
  },
  type: "spellcastingEntry",
  _stats: {
    compendiumSource: null,
    duplicateSource: null,
    exportSource: null,
    coreVersion: "13.351",
    systemId: "pf2e",
    systemVersion: "7.10.1",
    lastModifiedBy: null,
  },
  effects: [],
  folder: null,
  flags: {},
  ownership: {
    default: 0,
  },
};
_token.actor.createEmbeddedDocuments("Item", [
  game.actors
    .getName("Ezren (Level 1)")
    .spellcasting.get("RHIVw79uXDgwbPFE")
    .toObject(),
]);

const spellDataToFit = {
  system: {
    location: {
      value: "DsG6LxgJQHfvD6TB",
      heightenedLevel: 7,
      uses: {
        value: 1,
        max: 1,
      },
    },
  },
};
