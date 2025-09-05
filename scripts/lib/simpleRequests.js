import { toggleCustomCSS } from "./helpers.js";

export function minifySimpleRequests(active = true) {
    toggleCustomCSS(css, styleID, active)
}

const styleID = 'simple-requests-minifed';

const css = `.simple-requests-chat-body {
  height: 40px;
  .ar-chat-buttons {
    flex-direction: row;
    .ar-chat-button {
      height: 100%;
    }
  }
}

.ar-chat-queue, .ar-freeScreen-queue {
  overflow-x: hidden;
}

.theatre-control-button-bar {
  display: inline-block;
}
a.button.ui-control.icon.resync-theatre {
  width: 100%;
  height: 15px;
}`