export function setupTemplateHooks() {
  Hooks.on("createItem", (item) => {
    if (
      item.rules.some(
        (rule) =>
          rule?.key === "FlatModifier" && rule?.selector?.includes("hp"),
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
