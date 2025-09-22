## Unreleased

- Add User Color to Message Header

## 0.4.0

- **Added**
  - `Display Property Runes`
    - Displays property runes on items with them

## 0.3.3

- **Updated**
  - Added French translation (🌐 @rectulo)

## 0.3.2

- **Updated**
  - `Reaction Tracker`
    - Catches reaction spells now too (🐛 @boothy13)
    - Now only adds reaction used when the actor is in combat

## 0.3.1

- **Updated**
  - `Reaction Tracker`
    - Updated setting to allow you to only enable the reaction use tracker (and not the start of combat)
    - Added specific handling for start of combat for `Guardian's Ever Ready` ability

## 0.3.0

- **Added**
  - `Reaction Tracker`
    - This has 2 features:
      - When a reaction is used, it creates an effect marking a character has used a reaction, or if they have already used a reaction in the last round, increments a counter showing the total number of reactions used (to helpfully track characters with multiple reactions)
      - When combat starts you gain the Reaction Used effect until your turn starts [in line with RAW](https://2e.aonprd.com/Rules.aspx?ID=2432&Redirected=1)
    - Note: this feature requires the GM to be active to work

## 0.2.0

- **Added**
  - Notify player when they recharge their `spellstrike`
- **Updated**
  - Reworked much of the CSS for stuff to be easier to contribute to
    - Colorize `PF2e HUD`'s `Persistent HUD`
    - Colorize `PF2e Toolbelt`'s `Target Helper`
    - Highlight `Pf2e Toolbelt`'s `Target Helper` unrolled rolls and make them glow
  - Reworked module settings names to be more straight forward

## 0.1.1

- **Updated**
  - Target Helper will save colorization now matches the `Persistent HUD` colorization (🐛 @poindexter1985)

## 0.1.0

- **Added**
  - Minify `Simple Requests` module to minify the chat area it takes up
  - Colorize `PF2e HUD`'s `Persistent HUD`
  - Colorize `PF2e Toolbelt`'s `Target Helper`
  - Highlight `Pf2e Toolbelt`'s `Target Helper` unrolled rolls and make them glow
  - Hide `Sell All Treasure`
  - Hide `Default Craft Checks` (for Heroic Crafting)
