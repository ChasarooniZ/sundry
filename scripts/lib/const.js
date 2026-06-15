export const CLASS = {
  COLORIZE: {
    PF2E_TOOLBELT: {
      MESSAGE_SAVES: "sundry-pf2e-toolbelt-colorize-saves",
    },
    PF2E_HUD: {
      PERSISTENT_HUD: "sundry-pf2e-hud-persistent-colorized",
    },
  },
  HIGHLIGHT: {
    PF2E_TOOLBELT: {
      UNROLLED_ROLLS: "sundry-pf2e-toolbelt-highlight-unrolled",
    },
  },
};

export const QUERY = {
  MESSAGE: {
    PF2E_TOOLBELT: {
      TARGET_ROWS: ".chat-message:has(.pf2e-toolbelt-target-targetRows)",
    },
  },
  PF2E_HUD: {
    PERSISTENT_HUD: {
      BASE: "#pf2e-hud-persistent",
    },
  },
};

export const TEMPLATES = {
  RUNES_ON_ITEM: `modules/sundry/templates/runes.hbs`,
  BASE_DAMAGE: `modules/sundry/templates/baseDamage.hbs`,
};

export const DISPOSITION_STATES = [
  "hostile",
  "unfriendly",
  "indifferent",
  "friendly",
  "helpful",
];
export const STYLE_MODES = {
  "20-percent": "sundry-message-user-color-gradient-twenty",
  "set-length": "sundry-message-user-color-header-set-amt",
};
export const STYLE_LIST = Object.values(STYLE_MODES);

export const BG_FRAME_SKIP_MODULES = [
  "pf2e-dorako-ux",
  "pathfinder-ui",
  "pf2e-effects-halo",
];

export const RELEVANT_EFFECTS = {
  SLUGS: new Set([
    // Conditions
    "blinded",
    "broken",
    "clumsy",
    "concealed",
    "confused",
    "controlled",
    "dazzled",
    "deafened",
    "doomed",
    "drained",
    "dying",
    "encumbered",
    "enfeebled",
    "fascinated",
    "fatigued",
    "frightened",
    "grabbed",
    "hidden",
    "immobilized",
    "invisible",
    "off-guard",
    "paralyzed",
    "persistent-damage",
    "petrified",
    "prone",
    "quickened",
    "restrained",
    "sickened",
    "slowed",
    "stunned",
    "stupefied",
    "unconscious",
    "undetected",
    "wounded",
    "cursebound",
    "friendly",
    "helpful",
    "hostile",
    "indifferent",
    "malevolence",
    "observed",
    "unfriendly",
    "unnoticed",
    //Custom
    "effect-crowd-boost-1",
    "effect-crowd-boost-2",
  ]),
};

export const DURATION = {
  SECOND: 1,
  MINUTE: 60,
  HOUR: 3600,
};

export const RELEVANT_MODES = new Set([
  "relevant",
  "relevant-under-1-hour",
  "relevant-under-10-min",
  "relevant-under-1-min",
]);
