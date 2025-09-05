import { toggleCustomCSS } from "./helpers.js";

export function colorizeToolbeltMessageSaves(active = true) {
    toggleCustomCSS(colorizeToolbeltMessageSavesCSS,
        colorizeToolbeltMessageSavesStyleID, active)
}

export function highlightToolbeltRollSaves(active = true) {
    toggleCustomCSS(highlightToolbeltRollSavesCSS,
        highlightToolbeltRollSavesStyleID, active)
}



const colorizeToolbeltMessageSavesStyleID = 'colorize-toolbelt-message-saves';
const highlightToolbeltRollSavesStyleID = 'make-toolbelt-roll-saves-glow';

const colorizeToolbeltMessageSavesCSS = `
.chat-message .message-content .pf2e-toolbelt-target-targetRows .target-row .target-header {

    .controls {
        /* reflex toolbelt*/
        i.fa-person-running {
            color: rgb(77, 209, 108);
        }

        /* will toolbelt*/
        i.fa-brain {
            color: deeppink;
        
        }

        /* fort toolbelt*/
        i.fa-chess-rook {
            color: rgb(110, 143, 54);
        
        }
    }
}
`

const highlightToolbeltRollSavesCSS = `
.chat-message .message-content .pf2e-toolbelt-target-targetRows .target-row .target-header {
	/* Changes font size of PF2e Toolbelt savings throw elements */
	font-size: 1em;

    .controls {

        /* Pulsing unclicked roll */
        i.die {
            animation: endTurnGlow 2.5s infinite;
        }
    }
}

@keyframes endTurnGlow {
  0% { color: #fff; }
  50% { color: #fd782f; }
  100% { color: #fff; }
}
`