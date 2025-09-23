export const CLASS = {
    COLORIZE: {
        PF2E_TOOLBELT: {
            MESSAGE_SAVES: "sundry-pf2e-toolbelt-colorize-saves"
        },
        PF2E_HUD: {
            PERSISTENT_HUD: 'sundry-pf2e-hud-persistent-colorized'
        }
    },
    HIGHLIGHT: {
        PF2E_TOOLBELT: {
            UNROLLED_ROLLS: "sundry-pf2e-toolbelt-highlight-unrolled"
        }
    }
}

export const QUERY = {
    MESSAGE: {
        PF2E_TOOLBELT: {
            TARGET_ROWS: ".chat-message:has(.pf2e-toolbelt-target-targetRows)"
        }
    },
    PF2E_HUD: {
        PERSISTENT_HUD: {
            BASE: "#pf2e-hud-persistent"
        }
    }
}

export const TEMPLATES = {
    RUNES_ON_ITEM: `modules/sundry/templates/runes.hbs`,
    BASE_DAMAGE: `modules/sundry/templates/baseDamage.hbs`
}