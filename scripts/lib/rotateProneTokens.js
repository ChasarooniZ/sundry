export async function setupRotateProneTokens(active = true) {
  Hooks[active ? "on" : "off"](
    "preCreateItem",
    (item, _info, _action, userID) => {
      if (item?.system?.slug === "prone" && game.user.id === userID) {
        const tokenDocs = item?.actor?.getActiveTokens(false, true);
        for (const tokenDoc of tokenDocs) {
          updateTokenRotation(tokenDoc, true);
        }
      }
    },
  );

  Hooks[active ? "on" : "off"]("preDeleteItem", (item, _action, userID) => {
    if (item?.system?.slug === "prone" && game.user.id === userID) {
      const tokenDocs = item?.actor?.getActiveTokens(false, true);
      for (const tokenDoc of tokenDocs) {
        updateTokenRotation(tokenDoc, false);
      }
    }
  });
}

function updateTokenRotation(tokenDoc, isAdded) {
  const rotation = isAdded ? 270 : 0;
  if (tokenDoc.rotation !== rotation) {
    tokenDoc.update({ rotation });
  }
}
