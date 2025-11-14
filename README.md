![](https://img.shields.io/badge/Foundry-v12-orange) ![](https://img.shields.io/badge/Foundry-v13-informational)
![All Downloads](https://img.shields.io/github/downloads/ChasarooniZ/sundry/total?color=5e0000&label=All%20Downloads)
![Latest Release Download Count](https://img.shields.io/github/downloads/ChasarooniZ/sundry/latest/module.zip)
![Forge Installs](https://img.shields.io/badge/dynamic/json?label=Forge%20Installs&query=package.installs&suffix=%25&url=https%3A%2F%2Fforge-vtt.com%2Fapi%2Fbazaar%2Fpackage%2Fsundry&colorB=4aa94a)

![module_banner](https://github.com/ChasarooniZ/pf2e-usage-updater/assets/79132112/3b2a4f8c-7ba1-4647-b073-d8ecac9d93a6)

[![gitlocalized ](https://gitlocalize.com/repo/10447/whole_project/badge.svg)](https://gitlocalize.com/repo/10447?utm_source=badge)
[![](https://img.shields.io/badge/ko--fi-donate-%23FF5E5B?style=flat-square&logo=ko-fi&logoColor=white)](https://ko-fi.com/Chasarooni)

# Sundry. Toggleable Tweaks for mainly Pf2e

> [!NOTE]  
> This module is intended to be a grab bag of useful features which are all intended to be **toggleable** and off by default. IE you can choose which ones you like to turn on! Maybe one day i'll add a sort of gui setup process or something but that's a later me problem :)

> [!WARNING]  
> While v12 is technically supported, support for some features may fail as this module is developed primarily for FVTT v13

## Table of Contents

- [Changelog](#changelog)
- [Features](#features)

## Changelog

You can access the changelog [here](/CHANGELOG.md).

## Features

- **Colorize**

  - `PF2e HUD`'s `Persistent HUD`

  ![](https://github.com/user-attachments/assets/250de37f-511a-439a-b07d-3e02abe3346a)
  ![](https://github.com/user-attachments/assets/9ea66861-1094-4a5d-bcfb-f2f701bfdb28)

  - `PF2e Toolbelt`'s `Target Helper`

  ![](https://github.com/user-attachments/assets/eb7b0c58-ac2b-4e85-8c0f-86f534cf8829)

- **Display**

  - `Property Runes` - Displays property runes on (item sheets) for items with them

    <img height="250" alt="image" src="https://github.com/user-attachments/assets/13f3e51b-2941-4a9d-82f9-811e0a605201" />

  - `Weapon Base Damage` - Adds a little display below the price on weapon sheets that displays their base damage (Note: This includes any Striking runes the weapon has)

    <img width="280" height="236" alt="image" src="https://github.com/user-attachments/assets/0c3083f5-710d-43f9-b906-b87924ace4a4" />

- **Hide**

  - `Default Craft Checks` (for Heroic Crafting)
  - `Hide Header Button Text`
    - Hides the text (not the icons) for sheet Header Buttons

  <img width="669" height="213" alt="image" src="https://github.com/user-attachments/assets/a5881f19-e376-4a37-aa4a-f44e68527053" />

  - `Sell All Treasure`

- **Highlight**

  - `Pf2e Toolbelt`'s `Target Helper` unrolled rolls and make them glow

  ![highlight-save](https://github.com/user-attachments/assets/0f8e1237-da4a-4e1f-947e-df5e94294bf3)

  - `Known Languages on Creatures` Highlights which languages (on NPC stat block pages) are known by the current active party as well as adds a tooltip to make sure its clear

  <img width="280" height="171" alt="image" src="https://github.com/user-attachments/assets/0bf22994-8524-47f1-9e16-ce9104f5534e" />


- **Hotkey**

  - `Character Campaign Notes` - Adds a new hotkey (Default `N`) to open an editable dialog of their assigned character's `Campaign Notes` field on their character sheet for quick access

- **Minify**

  - `Simple Requests` module to minify the chat area it takes up

  ![](https://github.com/user-attachments/assets/b0d6f241-0000-4560-ab4c-077c3b5c36b3)

- **Notify**
  - Notify when you have recharged your `spellstrike`
  - Start of session reminder (open a journal)
    - One for `Players` another for the `GM`
- **Track**
  - `Reaction Tracker`
    - This has 2 features:
      - When a reaction is used, it creates an effect marking a character has used a reaction, or if they have already used a reaction in the last round, increments a counter showing the total number of reactions used (to helpfully track characters with multiple reactions)
      - When combat starts you gain the Reaction Used effect until your turn starts [in line with RAW](https://2e.aonprd.com/Rules.aspx?ID=2432&Redirected=1)
    - Note: this feature requires the GM to be active to work
- **Replace**
  - `Pause Image`
    - Allows you to replace the pause image
  - `Pause Image Class`
    - Allows you to replace the class for the pause image (animation) see the options [here](https://docs.fontawesome.com/web/style/animate)
  - `Pause Text`
    - Allows you to replace the pause text (Can be replaced with multiple messages separate them with '|' or ';') (Also supports a Rolltable of options by setting this to the Table's UUID)

## Contributors

You can see everyone else who contributed to the module [here](CONTRIBUTORS.md)

## Licenses & Attributions

- The styling author name code is adapted from [`PF2e Dorako UI`](https://github.com/Dorako/pf2e-dorako-ui) under the MIT license
