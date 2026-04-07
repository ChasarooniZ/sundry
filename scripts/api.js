import { reactionUsed } from "./lib/reactionTracker.js";

export function setupAPI() {
  window.sundry = {
    api: {
      reactionUsed: (actors) => {
        reactionUsed(actors, false);
      },
    },
  };
}
