export function setupReactionTracker(setting) {
    if (game.user.isGM) {
        switch (setting) {
            case "all":
                Hooks.on("combatStart", startOfCombatReactions)
                Hooks.on("createChatMessage", usedReaction)
                Hooks.on("deleteCombat", removeEncounterReactions);
                break;
            case "reaction-only":
                Hooks.off("combatStart", startOfCombatReactions)
                Hooks.on("createChatMessage", usedReaction)
                Hooks.on("deleteCombat", removeEncounterReactions);
                break;
            case "off":
                Hooks.off("combatStart", startOfCombatReactions)
                Hooks.off("createChatMessage", usedReaction)
                Hooks.off("deleteCombat", removeEncounterReactions);
                break;
            default:
                break;
        }
    }
}

async function startOfCombatReactions(encounter) {
    reactionUsed(encounter?.combatants?.contents?.map(combatant => combatant.actor), true);
}

async function usedReaction(message) {
    if (
        (
            message?.item?.system?.actionType?.value === "reaction"
            || message?.item?.system?.time?.value === "reaction"
        )
        && message?.actor?.combatant
        && !message?.flags?.pf2e?.context?.type
        && message.actor
    ) {
        reactionUsed([message.actor], false)
    }
}

async function removeEncounterReactions(encounter) {
    const actors = encounter?.combatants?.contents?.map(combatant => combatant.actor);
    for (const actor of actors) {
        const existing = actor.itemTypes.effect.find(
            (e) => e.slug === "effect-reaction-used"
        );
        if (existing)
            existing.delete();
    }
}


async function reactionUsed(actors, combatStart) {
    if (actors.length === 0) return;

    const item = REACTION_USED_EFFECT(combatStart);

    const actorsToCheck = actors.filter(actor => {
        if (combatStart) {
            return !ROLL_OPTIONS_WITH_REACTIONS_AT_START_OF_COMBAT.some(rollOption =>
                actor?.rollOptions?.all?.[rollOption]
            )
        } else {
            return true;
        }
    })

    for (const actor of actorsToCheck) {
        const existing = actor.itemTypes.effect.find(
            (e) => e.slug === "effect-reaction-used"
        );
        if (existing) {
            actor.updateEmbeddedDocuments("Item", [
                {
                    _id: existing.id,
                    "system.badge.value": existing.system.badge.value + 1,
                },
            ]);
        } else {
            const tempItem = foundry.utils.deepClone(item)
            tempItem.system = {
                ...item.system,
                context: {
                    origin: {
                        actor: actor.uuid,
                        token: actor?.getActiveTokens()?.[0]?.document?.uuid
                    }
                }
            }
            actor.createEmbeddedDocuments("Item", [tempItem]);
        }
    }
}

const REACTION_USED_EFFECT = (combatStart) => ({
    name: game.i18n.has("sundry.items.effects.reaction-used.name")
        ? game.i18n.localize("sundry.items.effects.reaction-used.name")
        : "Effect: Reaction Used",
    img: "systems/pf2e/icons/actions/Reaction.webp",
    type: "effect",
    system: {
        badge: {
            type: "counter",
            value: 1,
        },
        duration: {
            value: combatStart ? 0 : 1,
            unit: "rounds",
            expiry: "turn-start",
            sustained: false,
        },
        publication: {
            title: "PF2e Sundry",
        },
        slug: "effect-reaction-used",
    },
});



const ROLL_OPTIONS_WITH_REACTIONS_AT_START_OF_COMBAT = ["feature:guardians-techniques"]