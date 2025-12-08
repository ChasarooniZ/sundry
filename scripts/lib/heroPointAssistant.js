export async function heroPointOnTheHour() {
  if (!game.user.isGM) return;
  // Get all users who are not GMs and not named "zCamera"
  const eligibleUsers = game.users.filter(
    (u) => !u.isGM && u.active && u.name !== "zCamera"
  );

  // Check if we have any eligible users
  if (eligibleUsers.length === 0) {
    ui.notifications.warn("No eligible players found!");
  } else {
    // Hero Point Random
    const randomUser2 =
      eligibleUsers[Math.floor(Math.random() * eligibleUsers.length)];
    const actor = randomUser2.character;
    actor.update({
      "system.resources.heroPoints.value": Math.min(
        actor.system.resources.heroPoints.value + 1,
        actor.system.resources.heroPoints.max
      ),
    });

    // Pick a random user for granting a Hero point
    const randomUser =
      eligibleUsers[Math.floor(Math.random() * eligibleUsers.length)];
    giveAllyHeroPoint(randomUser);

    // Send their name to chat
    ChatMessage.create({
      content: `<h3>Hero Points!</h3>
      <b><img src="${
        randomUser2?.character?.prototypeToken.texture.src
      }" height="30">${
        randomUser2?.character?.name ?? randomUser2?.name
      }</b> is the luckiest <u>+1 Hero Point</u><hr>
        <b><img src="${
          randomUser?.character?.prototypeToken.texture.src
        }" height="30">${
        randomUser?.character?.name ?? randomUser?.name
      }</b> has been granted the awesome power to give a hero point
      </ul>`,
    });
  }
}

async function giveAllyHeroPoint(user) {
  let users = game.users.filter((u) => u.character);
  let choices = users
    .sort(
      (a, b) =>
        a.character.system.resources.heroPoints.value -
        b.character.system.resources.heroPoints.value
    )
    .map((u) => ({
      uuid: u.character?.uuid,
      name: u.character?.prototypeToken?.name,
      hpVal: u.character.system.resources.heroPoints.value,
      hpMax: u.character.system.resources.heroPoints.max,
      img: u.character?.prototypeToken.texture.src,
    }));

  // Create radio options for each character
  const radioOptions = choices
    .map(
      (c) => `
    <label class="radio-label">
        <input type="radio" name="selectedCharacter" value="${c.uuid}" required>
        <img src="${c.img}" 
             data-uuid="${c.uuid}" 
             data-tooltip="(${c.hpVal}/${c.hpMax})" 
             data-tooltip-direction="UP">
        <span class="item-name">${c.name}</span>
        <progress value="${c.hpVal}" max="${c.hpMax}" style="width: 60px; height: 8px;">${c.hpVal}</progress>
    </label>
`
    )
    .join("");

  const content = `
<style>
    .item-picker .form-group {
        display: flex;
        flex-wrap: wrap;
        width: 100%;
        align-items: flex-start;
    }

    .item-picker .radio-label {
        display: flex;
        flex-direction: column;
        align-items: center;
        text-align: center;
        justify-items: center;
        flex: 1 0 16%;
        line-height: normal;
        margin: 5px;
    }

    .item-picker input[type="radio"] {
        display: none;
    }

    .item-picker img {
        border: 0px;
        width: 75px;
        height: 75px;
        cursor: pointer;
        transition: outline 0.2s ease;
    }

    .item-picker .item-name {
        margin-top: 5px;
        font-size: 12px;
        font-weight: bold;
        word-wrap: break-word;
        max-width: 80px;
    }

    .item-picker img.selected {
        outline: 3px solid #4CAF50;
    }

    .item-picker img:hover {
        outline: 2px solid #ccc;
    }

    .item-picker img.selected:hover {
        outline: 3px solid #4CAF50;
    }

    .item-picker progress {
        margin-top: 3px;
    }
</style>
<form class="item-picker">
    <div class="item-picker form-group" id="characters">
        ${radioOptions}
    </div>
</form>
`;

  const res = await foundry.applications.api.DialogV2.query(user, "wait", {
    window: {
      title: "Pick Whom to Give the Hero Point To",
      icon: "fa-solid fa-star",
    },
    content,
    position: {
      width: 800,
    },
    buttons: [
      {
        action: "grant",
        label: "Grant Hero Point",
        icon: "fa-solid fa-gift",
        default: true,
        callback: (event, button, dialog) => {
          const form = button.form.elements;
          return form.selectedCharacter?.value;
        },
      },
      {
        action: "cancel",
        label: "Cancel",
        callback: () => null,
      },
    ],
    render: (event) => {
      const html = event.target.element;

      $(html)
        .find("img")
        .on("click", function () {
          const uuid = $(this).data("uuid");

          const radio = $(html).find(`input[value="${uuid}"]`);
          radio.prop("checked", true);

          $(html).find("img").removeClass("selected");
          $(this).addClass("selected");
        });
    },
    submit: async (result) => {
      if (result) {
        const selectedChoice = choices?.find((c) => c.uuid === result);
        if (selectedChoice) {
          return result;
        }
      }
    },
  });

  const actor = await fromUuid(res);
  actor.update({
    "system.resources.heroPoints.value": Math.min(
      actor.system.resources.heroPoints.value + 1,
      actor.system.resources.heroPoints.max
    ),
  });
}
