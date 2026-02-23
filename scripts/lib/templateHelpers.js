export function setupTemplateHooks() {
  Hooks.on("createItem", (item) => {
    if (
      isSundryTemplate &&
      item.rules.some(
        (rule) =>
          rule?.key === "FlatModifier" &&
          rule?.selector?.includes("hp") &&
          (rule?.value > 0 || !rule?.value?.startsWith("-")),
      ) &&
      item?.actor?.system?.attributes?.hp?.value <
        item?.actor?.system?.attributes?.hp?.max
    ) {
      console.log(`HP Updated higher`);
      item.actor.update({
        system: {
          attributes: {
            hp: {
              value: item?.actor?.system?.attributes?.hp?.max,
            },
          },
        },
      });
    }
  });
}

function isSundryTemplate(item) {
  return (
    item.name.startsWith("Template") ||
    item.slug.startsWith("template") ||
    item.sourceId.startsWith("Compendium.sundry.sundry-pf2e-templates") ||
    item.grantedBy?.name?.startsWith("Template") ||
    item.grantedBy?.slug?.startsWith("template") ||
    item.grantedBy?.sourceId?.startsWith(
      "Compendium.sundry.sundry-pf2e-templates",
    )
  );
}
