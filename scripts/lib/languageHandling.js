export function setuplanguageHandling(active) {
  Hooks[active ? "on" : "off"](
    "renderNPCSheetPF2e",
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

    const style = getStyle(partyCount, knowLangugeMembersCount);

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

function getStyle(partyCount, knowLangugeMembersCount) {
  if (partyCount === knowLangugeMembersCount) return "all";
  if (knowLangugeMembersCount > 0) return "some";
  return "none";
}

function getLanguageTooltip({
  partyCount,
  knowLangugeMembersCount,
  knowLangugeMembers,
  notKnowLanguageMembers,
}) {
  return `<div class='header' style='font-weight: 900;'>${knowLangugeMembersCount} / ${[
    partyCount,
  ]} ${game.i18n.localize("sundry.display.team-members")}</div>
    ${knowLangugeMembersCount > 0 ? '<div class="know">' : ""}
    ${knowLangugeMembers.join("<br>")}
    ${knowLangugeMembersCount > 0 ? "</div>" : ""}

    ${
      knowLangugeMembersCount !== partyCount
        ? "<div class='not-know' style='color: var(--color-text-subtle);'>"
        : ""
    }
    ${notKnowLanguageMembers.join("<br>")}
    ${knowLangugeMembersCount !== partyCount ? "</div>" : ""}`;
}
