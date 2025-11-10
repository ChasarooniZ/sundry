function setupHidePlayerUI() {}

const collapser = document.createElement("div");
collapser.innerHTML = `<div class="players-hider">
    <button on-click="const playerList = document.querySelector('div#players-active'); playerList.classList.contains('hidden') ? playerList.classList.remove('hidden') : playerList.classList.add('hidden')">
        <i class="fa-solid fa-caret-up"></i>
    </button>
</div>`;
playerList.after(collapser);
