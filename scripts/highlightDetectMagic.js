// Code based on work from Spappz 2024 (based on work by @maplealmond) (https://gist.github.com/Spappz/2de1b88782ed4924e2bf16a45ccd6c32)
// This macro automates most aspects of the Detect Magic spell. It scans the scene for valid detection targets (creatures, creatures' items, loot actors' items, hazards, etc.) then plays some animations to indicate the detection (if any). Although it works pretty well, there are some caveats:
//  - Ambient magical effects—attached to a template or otherwise—are not detected. If it doesn't have a token, the macro can't see it.
//  - If more than one token has the highest-level magic, and detect magic is cast at 3rd rank or higher, then RAW it's up to the GM to determine which is "most powerful". In that case, (almost) nothing happens and the player is just prompted to ask the GM directly.
//  - (There's also some other caveats explained in the settings below.)

// Detect magic requires line-of-effect. This is hard to compute, so you can either use line-of-sight (`true`) or allow the spell to pass through walls (`false`).
const USE_LINE_OF_SIGHT = true;

// You can automatically ignore your allies' magic to avoid repeatedly pinging the fighter's unfairly high-level magic sword (or your own!). Caveat: enabling this means you won't be able to detect unknown magic on an ally or yourself, such as unidentified magic items or magic effects (e.g. curses).
const IGNORE_ALLIES_MAGIC = true;

// The computer isn't smart enough to figure out whether something with the illusion trait is 'deceptive' in appearance or not, so your choices are either 'treat all illusion as deceptive' (`true`) or 'ignore the trait' (`false`).
const ILLUSION_IS_ALWAYS_DECEPTIVE = true;

// This macro can detect standard spell effects if their 'source ID' matches the pf2e system "spell-effects" compendium. However, effects don't have traits, so the macro can't know whether the effects are illusory or not! You can choose to either ignore all spell effects just to be safe (`true`), or to detect spell effects regardless of their illusionary-ness (`false`).
// Note: 'effect' here refers to items with `type: "effect"` (i.e. the ones that show up in the 'Effects' tab on a character sheet). It still can't detect whether a creature's persistent damage was caused by a spell!
const IGNORE_SPELL_EFFECTS = true;

// You can customise the animations' colours too! Use the options listed, or use the value `false` to disable that animation.
// "blue" (free), "dark_red", "greenorange", "green", "grey", "purple", "yellow"
const INITIAL_EMANATION_COLOUR = "blue";
// "blue" (free), "green", "orangepurple", "orangeyellow", "purple", "red", "multicolored01", "multicolored02"
const NONSPECIFIC_DETECTION_COLOUR = "blue";
// "bluegreen" (free), "redyellow"
const DIRECTIONAL_DETECTION_COLOUR = "bluegreen";
// "bluegreen" (free), "redyellow"
const LOCATIONAL_DETECTION_COLOUR = "bluegreen";

// You can add any homebrew traits (in lowercase) that imply an item is magical to this array; just follow the pattern.
const MAGIC_TRAITS = new Set([
  "arcane",
  "divine",
  "primal",
  "occult",
  "magical",
]);

// You can also add or remove possible responses if you like, or even leave any or all of them empty if you want no text at all
const NO_DETECTION_MESSAGES = [
  "No magic detected",
  "Nothing!",
  "Can't sense anything...",
  "I've got nothing",
  "That's a negative",
  "Nope, no magic here",
  "I'm reading no magic",
  "Coming up empty-handed",
  "Maybe someplace else?",
  "Must have been the wind",
];
const LEVELLESS_DETECTION_MESSAGES = [
  "Magic detected!",
  "I smell some magic",
  "Sensing some magic nearby",
  "Aha—magic!",
  "There's magic afoot...",
  "Magic's somewhere close",
  "Wait a sec—there's magic",
  "We've got magic",
  "My magic-sense is tingling!",
  "PING!",
];
const LEVELLED_DETECTION_MESSAGE_GENERATORS = [
  (level) => `Got some ${level.ordinalString()}-level magic`,
  (level) => `Detecting magic at level ${level}`,
  (level) => `Seems like some ${level.ordinalString()}-level magic`,
  (level) => `Tastes like ${level.ordinalString()}-level magic`,
  (level) => `${level} whole level${level === 1 ? "" : "s"} of magic!`,
  (level) => `I'm sensing ${level.ordinalString()}-level magic`,
  (level) => `Magic... of ${level.ordinalString()} level?`,
  (level) => `Smell that? Gotta be ${level.ordinalString()}-level`,
  (level) => `I know ${level.ordinalString()}-level magic when I feel it`,
  (level) => `Something's got the aura of level-${level} magic`,
];

// END CONFIGURABLE SETTINGS

// ---

// SCARY CODE STUFF BEGIN

// Set-up

export async function detectMagicAnimation(token) {
  if (!token) return;
  const detectMagic = token.actor.items.find(
    (i) => i.type === "spell" && i.slug === "detect-magic",
  );
  if (!detectMagic) {
    ui.notifications.error("Token doesn't have detect magic");
    return false;
  }
  const spellRank = detectMagic.rank;

  const sequenceName = `Detect Magic: ${token.id}`;
  const sequence = new Sequence();

  if (INITIAL_EMANATION_COLOUR) {
    sequence
      .sound()
      .file("ggg-sfx.magic.arcane.cast.astral.01.03")
      .preset("troveSound")
      .atLocation(token)
      .effect()
      .file(`jb2a.detect_magic.circle.${INITIAL_EMANATION_COLOUR}`)
      .name(sequenceName)
      .attachTo(token)
      .playbackRate(2)
      .waitUntilFinished(-300);
  }

  // Get list of detectable placeables
  const magicDetections = canvas.tokens.placeables
    .filter((placeable) => placeable.actor)
    .filter((placeable) =>
      IGNORE_ALLIES_MAGIC ? placeable.actor.alliance !== "party" : true,
    )
    .filter((placeable) => placeable.distanceTo(token) <= 30)
    .filter((placeable) => {
      if (!USE_LINE_OF_SIGHT) return true;
      return !CONFIG.Canvas.polygonBackends.move.testCollision(
        token,
        placeable,
        {
          type: "move",
          mode: "any",
        },
      );
    })
    .map((placeable) => {
      if (
        // Don't detect magic hazards with a minimum proficiency...
        placeable.actor.type === "hazard" &&
        placeable.actor.system.attributes.stealth.details.match(
          /\((trained|expert|master|legendary)\)/i,
        ) &&
        // ... unless they explicitly allow it
        !placeable.actor.system.attributes.stealth.details.match(
          /\b(detect magic|pf2e\.spells-srd\.Item\.gpzpAAAJ1Lza2JVl)\b/i,
        )
      )
        return false;

      const placeableIsMagic = itemHasMagicTraits(placeable.actor);
      const itemTypes = new Set([
        "ancestry",
        "armor",
        "backpack",
        "condition",
        "consumable",
        "effect",
        "equipment",
        "heritage",
        "shield",
        "treasure",
        "weapon",
      ]);
      const magicItems = placeable.actor.items
        .filter((item) => itemTypes.has(item.type))
        .filter((item) => itemHasMagicTraits(item));

      const maxLevelMagicItem = magicItems.reduce(
        (prev, curr) => {
          // Sometimes an item's level is `undefined`
          curr.level = curr.level ?? -990;
          return prev.level > curr.level ? prev : curr;
        },
        { level: -999 }, // result on empty array
      );

      if (!placeableIsMagic && !magicItems.length) return false;
      if (placeableIsMagic && placeable.actor.level > maxLevelMagicItem.level)
        return {
          placeable: placeable,
          type: placeable.actor.type === "hazard" ? "hazard" : "creature",
          level: placeable.actor.level,
        };
      return {
        placeable: placeable,
        type: "item",
        item: maxLevelMagicItem,
        level: maxLevelMagicItem.level,
      };
    })
    .filter((result) => result);
  // end

  // ---

  // Handle animations
  if (!magicDetections.length) {
    if (NO_DETECTION_MESSAGES.length) {
      sequence
        .scrollingText()
        .atLocation(token)
        .delay(200, 600)
        .duration(3000)
        .text(
          NO_DETECTION_MESSAGES[
            Math.floor(NO_DETECTION_MESSAGES.length * Math.random())
          ],
        );
    }
  } else {
    if (spellRank < 4 && NONSPECIFIC_DETECTION_COLOUR) {
      sequence
        .effect()
        .file(`jb2a.soundwave.01.${NONSPECIFIC_DETECTION_COLOUR}`)
        .scale(0.5)
        .atLocation(token)
        .xray()
        .waitUntilFinished(-300);
    }

    if (spellRank >= 3) {
      const maxDetectionLevel = magicDetections
        .map((detection) => detection.level)
        .reduce((prev, curr) => (prev > curr ? prev : curr));
      const maxLevelDetections = magicDetections.filter(
        (detection) => detection.level === maxDetectionLevel,
      );

      let finalDetection = maxLevelDetections[0];
      if (maxLevelDetections.length > 1) {
        if (Sequencer.EffectManager.getEffects({ name: sequenceName })) {
          await sequence.play();
          ui.notifications.notify(
            "Something odd happened with your <i>detect magic</i>. Your GM should be able to tell you the result.",
          );
          return Promise.resolve();
        }
        return Promise.reject(
          `Something went wrong with token ${token.id}'s Detect Magic sequence`,
        );
      }

      if (spellRank >= 4) {
        if (DIRECTIONAL_DETECTION_COLOUR) {
          sequence
            .effect()
            .file(
              `jb2a.zoning.outward.cone.loop.${DIRECTIONAL_DETECTION_COLOUR}.01.01`,
            )
            .atLocation(token)
            .rotateTowards(finalDetection.placeable)
            .scale(finalDetection.placeable.distanceTo(token) / 60)
            .fadeIn(800)
            .fadeOut(800)
            .xray();
        }
        if (LOCATIONAL_DETECTION_COLOUR) {
          sequence
            .effect()
            .file(
              `jb2a.zoning.outward.circle.loop.${LOCATIONAL_DETECTION_COLOUR}.01.01`,
            )
            .scale(0.5)
            .atLocation(finalDetection.placeable)
            .fadeIn(800)
            .fadeOut(800)
            .xray()
            .waitUntilFinished(-800);
        }
      }

      if (LEVELLED_DETECTION_MESSAGE_GENERATORS.length) {
        sequence
          .scrollingText()
          .atLocation(token)
          .duration(3000)
          .text(
            LEVELLED_DETECTION_MESSAGE_GENERATORS[
              Math.floor(
                LEVELLED_DETECTION_MESSAGE_GENERATORS.length * Math.random(),
              )
            ](maxDetectionLevel < -1 ? 0 : maxDetectionLevel),
          );
      }
    } else if (LEVELLESS_DETECTION_MESSAGES.length) {
      sequence
        .scrollingText()
        .atLocation(token)
        .duration(3000)
        .text(
          LEVELLESS_DETECTION_MESSAGES[
            Math.floor(LEVELLESS_DETECTION_MESSAGES.length * Math.random())
          ],
        );
    }
  }
  // end

  // Fire the animations!
  if (Sequencer.EffectManager.getEffects({ name: sequenceName }))
    return sequence.play();

  // If we got here, the animation didn't register, so something went wrong
  return Promise.reject(
    `Something went wrong with token ${token.id}'s Detect Magic sequence`,
  );
}

     function itemHasMagicTraits(item) {
        if (
          !IGNORE_SPELL_EFFECTS &&
          item.sourceId.match(/^Compendium\.pf2e\.spell-effects\./)
        )
          return true;

        if (!item.system.traits) return false;

        let magicTraitFound = false;
        for (trait of item.system.traits.value) {
          if (MAGIC_TRAITS.has(trait)) magicTraitFound = true;
          // Break early (as non-magical) if item has illusion trait and is sufficiently high-level
          if (
            trait === "illusion" &&
            ILLUSION_IS_ALWAYS_DECEPTIVE &&
            spellRank <= (item.level ?? 0)
          )
            return false;
        }
        return magicTraitFound;
      }