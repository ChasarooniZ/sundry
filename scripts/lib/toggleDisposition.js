import { DISPOSITION_STATES } from "./const.js";

export function toggleDispositionStates(isIncrease = true) {
  const tok = canvas.tokens.hover;

  let curState = "";
  for (const state of DISPOSITION_STATES) {
    if (tok.actor.hasCondition(state)) {
      curState = state;
      break;
    }
  }
  if (!curState) {
    tok.actor.toggleCondition("indifferent");
  } else {
    const idx = DISPOSITION_STATES.indexOf(curState);
    tok.actor.toggleCondition(curState);
    let newState = "";
    if (isIncrease) {
      newState = DISPOSITION_STATES?.[idx + 1];
    } else {
      newState = DISPOSITION_STATES?.[idx - 1];
    }
    if (newState) {
      tok.actor.toggleCondition(newState);
    }
  }
}
