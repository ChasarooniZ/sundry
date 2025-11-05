function setuplanguageHandling(active) {
  Hooks[active ? "on" : "off"](
    "renderCreatureSheetPF2e",
    showRelevantLanguages
  );
}

async function showRelevantLanguages(_sheet, html, info) {
  const languages = info?.languages?.map((lang) => lang?.slug);
  const partyMembers = game.actors.party.members.filter(
    (m) => m.type === "character"
  );
  const partyCount = partyMembers?.length;

  const halfThreshold = Math.round(partyCount / 2);

  const partyLanguages = partyMembers.map((act) => ({
    name: act.name,
    langauges: act.system.details.languages.value,
  }));

  for (const languageSlug in languages) {
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
    <div class="know'>
    ${knowLangugeMembers.join("<br>")}
    </div>
    ${knowLangugeMembersCount !== partyCount ? "<hr>" : ""}
    <div class="not-know'>
    ${notKnowLanguageMembers.join("<br>")}
    </div>`;
}
