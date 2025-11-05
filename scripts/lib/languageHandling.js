export function setuplanguageHandling(active) {
  Hooks[active ? "on" : "off"](
    "renderCreatureSheetPF2e",
    showRelevantLanguages
  );
}

async function showRelevantLanguages(_sheet, html, info) {
  const commonLanguage = game.settings.get(
    "pf2e",
    "homebrew.languageRarities"
  )?.commonLanguage;

  const languages = info?.languages?.map((lang) => lang?.slug);
  const partyMembers = game.actors.party.members.filter(
    (m) => m.type === "character"
  );
  const partyCount = partyMembers?.length;

  const halfThreshold = Math.round(partyCount / 2);

  const partyLanguages = partyMembers.map((act) => ({
    name: act.name,
    langauges: [
      ...act.system.details.languages.value,
      ...(commonLanguage &&
      act.system.details.languages.value?.includes("common")
        ? [commonLanguage]
        : []),
    ],
  }));

  for (const languageSlug of languages) {
    const langItem = html?.[0]?.querySelector(
      `.languages .comma-separated li[data-slug="${languageSlug}"]`
    );

    const knowLangugeMembers = partyLanguages
      .filter((member) => member.langauges.includes(languageSlug))
      .map((member) => member.name);

    const notKnowLanguageMembers = partyLanguages
      .filter((member) => !member.langauges.includes(languageSlug))
      .map((member) => member.name);

    const knowLangugeMembersCount = knowLangugeMembers.length;

    const style = getStyle(partyCount, knowLangugeMembersCount, halfThreshold);

    const tooltip = getLanguageTooltip({
      partyCount,
      knowLangugeMembersCount,
      knowLangugeMembers,
      notKnowLanguageMembers,
      style,
    });

    langItem.classList.add(style);
    langItem.dataset.tooltip = tooltip;
  }
}

function getStyle(partyCount, knowLangugeMembersCount, halfThreshold) {
  if (partyCount === knowLangugeMembersCount) return "all";
  if (knowLangugeMembersCount >= halfThreshold) return "half";
  if (knowLangugeMembersCount > 0) return "some";
  return "none";
}

function getLanguageTooltip({
  partyCount,
  knowLangugeMembersCount,
  knowLangugeMembers,
  notKnowLanguageMembers,
  style,
}) {
  return `<div class='${style}'>${knowLangugeMembersCount} / ${[
    partyCount,
  ]} members</div>
    <hr>

    ${knowLangugeMembersCount > 0 ? '<ul class="know"><li>' : ""}
    ${knowLangugeMembers.join("</li><li>")}
    ${knowLangugeMembersCount > 0 ? "</ul" : ""}

    ${
      knowLangugeMembersCount !== partyCount
        ? "<hr><div class='not-know'><li>"
        : ""
    }
    ${notKnowLanguageMembers.join("</li><li>")}
    ${knowLangugeMembersCount !== partyCount ? "</ul" : ""}`;
}
