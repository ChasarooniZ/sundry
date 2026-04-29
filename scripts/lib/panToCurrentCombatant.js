import { getSetting } from "./helpers.js";

export function setupPanToCombatant(active = false) {
  Hooks?.[active ? "on" : "off"]("combatTurnChange", panToCombatant);
}

const MAX_ZOOM = 2.5;

async function panToCombatant(_encounter, newTurn) {
  if (
    game.user.isGM &&
    !getSetting("highlight.pan-current-combatant.enabled-gm")
  )
    return;
  const tokens = canvas.tokens.controlled?.length
    ? canvas.tokens.controlled
    : canvas.tokens.placeables.filter(
        (t) => game.user.character?.uuid === t?.actor?.uuid && t.visible,
      );

  const currentToken = canvas.tokens.get(newTurn?.tokenId);
  if (!currentToken || currentToken?.visible === false) return;

  tokens.push(currentToken);

  const positions = tokens.map((t) => [t.x, t.y, t.w, t.h]);
  panToFitPositions(positions);
}

// Code borrowed shamelessly from Aeris Cinematic Camera

const panToFitPositions = (positions, options) => {
  if (!positions.length) return;

  const xs = positions.map((p) => p[0]),
    ys = positions.map((p) => p[1]),
    xEnds = positions.map((p) => p[0] + p[2]),
    yEnds = positions.map((p) => p[1] + p[3]);

  const minX = Math.min(...xs),
    maxX = Math.max(...xEnds);
  const minY = Math.min(...ys),
    maxY = Math.max(...yEnds);

  const groupW = maxX - minX,
    groupH = maxY - minY;

  const vis = getVisibleBoardRect();
  const usableW = vis.width;
  const usableH = vis.height;
  const scaleX = usableW / groupW,
    scaleY = usableH / groupH;
  const scale = Math.min(
    MAX_ZOOM,
    options?.targetScale ?? Math.min(scaleX, scaleY),
  );

  const centerX = (minX + maxX) / 2,
    centerY = (minY + maxY) / 2;

  canvas.animatePan({ x: centerX, y: centerY, scale, duration: 1500 });
};

function getVisibleBoardRect() {
  const board = document.getElementById("board");
  const bRect = board.getBoundingClientRect();

  const leftPanel = document.getElementById("controls");
  const rightPanel = document.getElementById("ui-right");
  const leftW = leftPanel?.offsetWidth || 0;
  const rightW = rightPanel?.offsetWidth || 0;

  return {
    x: bRect.left + leftW,
    y: bRect.top,
    width: bRect.width - leftW - rightW,
    height: bRect.height,
  };
}
