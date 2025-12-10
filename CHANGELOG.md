## Unreleased

- Add User Color to Message Header
- **Updated**
  - `Display Property Runes` - Now also displays on character sheet as well as the item description

## 0.12.0

- **Updated**
  - `Colorize PF2e HUD`
    - Added some more colors to some sections
  - `Controls`
    - Fixed issue where description wasn't being localized

## 0.11.3

- Fixed error showing when languages couldn't be highlighted (💻 @Nythz)

## 0.11.2

- **Updated**
  - `Display Property Runes` - Add localization of title
  - Updated French translation (🌐 @rectulo)
  - Updated Chinese translation (🌐 @AlphaStarguide)
  - Updated Polish translation (🌐 @Lioheart)

## 0.11.1

- **Updated**
  - `Display Property Runes` - added a caching mechanism for the runes

## 0.11.0

- **New**
  - `Start of Session Reminders`
    - This feature has been split out into two separate reminder journal options: (🧠 @thebigham, @TheJoester)
      - Players
      - GM
    - Both of these use the same trigger (IE player count)
  - Added Chinese translation (🌐 @AlphaStarguide)
  - **Updated**
    - Updated French translation (🌐 @rectulo)

## 0.10.2

- Updated French translation (🌐 @rectulo)

## 0.10.1

- Fixed bug with **Start of Session Reminders** where the logic check if there were _less_ players than the value inputted not _more_ (@thebigham)

## 0.10.0

- **New**
  - `Highlight`
    - **Known Languages on Creatures**
      - Highlights which languages (on NPC stat block pages) are known by the current active party as well as adds a tooltip to make sure its clear
- **Update**
  - Hide the previous version setting from being displayed

## 0.9.4

- **Update**
  - Fixed bug where the assumed default pause animation was `fa-beat` not `fa-spin` (also updated translations to match and added a migration for any that had the old default)

## 0.9.3

- **Update**
  - Fixed code error causing `Pause` Features to not work (💻 @thejoestar)
  - Updated French translation (🌐 @rectulo)
  - Updated Polish translation (🌐 @Lioheart)

## 0.9.2

- Repushing Version as the previous release errored for an odd reason

## 0.9.1

- **Update**
  - Fixed up styling for `Replace Pause Text` to better support longer messages (@Icarus)

## 0.9.0

- **New**
  - `Notify`
    - **Start of Session Reminders**
      - Allows you to set a Journal or Journal Page to open at the start of a session (IE when enough players are in the world) which you could fill with reminders of what to do at the start of a session
- **Update**
  - Hide `Default Craft Checks` (for Heroic Crafting)
  - Updated Polish translation (🌐 @Lioheart)

## 0.8.6

- **Update**
  - `Replace Pause Text`
    - Fixed bug causing `Roll Table` mode to fail

## 0.8.5

- **Update**
  - `Replace Pause Text`
    - Now Supports `Roll Table` UUID as the input to pull from that for its options (🧠 @TangledLion)

## 0.8.4

- **Update**
  - `Replace Pause Image`
    - **Pause Image Class.** New setting to change the pause image class, can be used to change up the animation (see Font Awesome animations)
    - **Webm Support.** Now handles `.webm` specifically
  - Updated French translation (🌐 @rectulo)

## 0.8.3

- **Update**
  - Fix Polish translation not being loaded by the `module.json` (🐛 @Lioheart)

## 0.8.2

- **Update**
  - Updated Polish translation (🌐 @Lioheart)

## 0.8.1

- **Update**
  - `Replace Pause Text`
    - Change random message grabbing method to be based on the current minute (this provides a hacky way to sync up the messages for now)

## 0.8.0

- **New**
  - `Replace`
    - **Pause Image**
      - Allows you to replace the pause image
    - **Pause Text**
      - Allows you to replace the pause text (Can be replaced with multiple messages separate them with '|' or ';')

## 0.7.5

- **Updated**
  - `Reaction Tracker`
    - Updated hint for settings to be a bit clearer
    - Don't apply reaction used to the first combatant anymore to fix a bug where the effect isn't removed

## 0.7.4

- **Updated**
  - Changed `manifest` to allow `v12` installation (and added note on module page about possible non compatability of features
  - Updated French translation (🌐 @rectulo)
  - Updated Polish translation (🌐 @Lioheart)

## 0.7.3

- Fixed bug with campaign notes failing due to missing import (🐛 @DoritoBob)

## 0.7.2

- **Updated**
  - `Character Campaign Notes`
    - Added fallback if you have no Assigned Character defaults to first selected token (so now GMs can easily stalk player notes)
    - Added warning if no actor is found
    - Added Actor name to the notes header to prevent confusion
    - Fixed some styling issues

## 0.7.1

- **Updated**
  - `Character Campaign Notes`
    - Fixed Possible bug where closing out via the `X` causes the notes to become null
  - Updated French translation (🌐 @rectulo)

## 0.7.0

- **Added**
  - `Character Campaign Notes`
    - Adds a new hotkey (Default `N`) to open an editable dialog of their assigned character's `Campaign Notes` field on their character sheet for quick access

## 0.6.0

- **Added**
  - `Hide Header Button Text`
    - Hides the text (not the icons) for sheet Header Buttons (🧠 @weepingminotaur)

## 0.5.1

- **Updated**
  - `Display Property Runes`
    - Fixed bug where false displays on items with no property runes (🐛 @Le Chat Lunatique)
  - Updated French translation (🌐 @rectulo)

## 0.5.0

- **Added**
  - `Display Base Damage`
    - Adds a little display below the price on weapon sheets that displays their base damage (Note: This includes any Striking runes the weapon has)
- **Updated**
  - `Reaction Tracker`
    - Fixed Effect Name localization path
  - Updated French translation (🌐 @rectulo)

## 0.4.4

- **Updated**
  - `Display Property Runes`
    - Only show property runes for identified Items
    - Simplified the code a bit

## 0.4.3

- **Updated**
  - `Display Property Runes`
    - Fixed `Embed` bug introduced

## 0.4.2

- **Updated**
  - `Reaction Tracker`
    - Fixed error of trying to delete a reaction used that doesn't exist

## 0.4.1

- **Updated**
  - `Display Property Runes`
    - Improved visual by using `inline` instead of `embed` (@Vauxs)

## 0.4.0

- **Added**
  - `Display Property Runes`
    - Displays property runes on (item sheets) for items with them

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
