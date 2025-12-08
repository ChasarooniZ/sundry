function heroPointSetterUpper() {
  const heroPointConfig = {
    random: true, // Picks a random Player
    handout: true, // Pick a random player who can hand out a hero Point
    voted: true, // Players all Vote
    gmHandout: true, // GM gives it out
  };
  heroPointOnTheHour(heroPointConfig);
}

async function heroPointOnTheHour(cfg) {
  if (!game.user.isGM) return;
  // Get all users who are not GMs and not named "zCamera"
  const eligibleUsers = game.users.filter(
    (u) => !u.isGM && u.active && u.name !== "zCamera"
  );

  // Check if we have any eligible users
  if (eligibleUsers.length === 0) {
    ui.notifications.warn("No eligible players found!");
  } else {
    const picked = {};
    // Hero Point Random
    if (cfg.random) {
      picked.random = await heroPointRandomCharacter(eligibleUsers);
    }

    // Pick a random user for granting a Hero point
    if (cfg.handout) {
      picked.handout =
        eligibleUsers[Math.floor(Math.random() * eligibleUsers.length)];
      giveAllyHeroPoint(picked.handout);
    }

    // Send their name to chat
    ChatMessage.create({
      content: `<h3>Hero Points!</h3>
      <b><img src="${
        picked.random?.character?.prototypeToken.texture.src
      }" height="30">${
        picked.random?.character?.name ?? picked.random?.name
      }</b> is the luckiest <u>+1 Hero Point</u><hr>
        <b><img src="${
          picked.handout?.character?.prototypeToken.texture.src
        }" height="30">${
        picked.handout?.character?.name ?? picked.handout?.name
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
    <form class="hero-point-picker">
        <div class="hero-point-picker form-group" id="characters">
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
        label: "Cancel"
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
  giveActorHeroPoint(actor)
}

async function heroPointRandomCharacter(params) {
  const { eligibleUsers } = params;
  const user = eligibleUsers[Math.floor(Math.random() * eligibleUsers.length)];
  const actor = picked.random.character;
  giveActorHeroPoint(actor);
  return user;
}

async function giveActorHeroPoint(actor) {
  return await actor.update({
    "system.resources.heroPoints.value": Math.min(
      actor.system.resources.heroPoints.value + 1,
      actor.system.resources.heroPoints.max
    ),
  });
}
