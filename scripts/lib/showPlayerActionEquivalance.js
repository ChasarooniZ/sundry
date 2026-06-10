export function setupDisplayActionComparison(active = true) {
  Hooks[active ? "on" : "off"](
    "renderChatMessageHTML",
    (message, html, _data) => {
      if (!game.combat || message?.token?.disposition === 1) {
        return;
      }
      const party = game.combat.combatants.contents.filter(
        (c) => c.token.disposition === 1,
      );
      const playerCount = party.length;
      const partyLevel =
        Math.sumPrecise(party.map((c) => c.actor.level)) / playerCount;
      const enemies = game.combat.combatants.contents.filter(
        (c) => c.token.disposition !== 1,
      );
      const enemiesLevels = enemies.map((t) => t.actor.level);
      const combatantCount = enemies.length;

      const actionRatio = Math.round((playerCount / combatantCount) * 10) / 10;

      const totalXP = game.pf2e.gm.calculateXP(
        partyLevel,
        playerCount,
        enemiesLevels,
        [],
        {},
      ).totalXP;
      const personalXP = game.pf2e.gm.calculateXP(
        partyLevel,
        playerCount,
        [message.actor.level],
        [],
        {},
      ).totalXP;

      const percentOfForce = personalXP / totalXP;

      const actionGlyphs = html.querySelectorAll("span.action-glyph");

      for (const action of actionGlyphs) {
        const val = action.innerText;
        const actionInfo = getActionInfo(val);
        console.log({ actionInfo, actionRatio });
        action.dataset.tooltip = game.i18n.format(
          "sundry.tooltip.action-comparison.main",
          {
            actionCount: actionRatio * percentOfForce * actionInfo.cnt,
            actionType: game.i18n.localize(
              `sundry.tooltip.action-comparison.${actionInfo.type}`,
            ),
          },
        );
      }
    },
  );
}

function getActionInfo(type) {
  switch (type?.toLowerCase()) {
    case `1`:
    case `a`:
      return { type: `action`, cnt: 1 };
    case `2`:
    case `d`:
      return { type: `action`, cnt: 2 };
    case `3`:
    case `t`:
      return { type: `action`, cnt: 3 };
    case `r`:
      return { type: `reaction`, cnt: 1 };
    case `f`:
      return { type: `free`, cnt: 1 };
  }
}
