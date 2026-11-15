import { MODULE_ID } from "../module.js";

export function setupVoiceActivityChecker() {
  // Source - https://stackoverflow.com/a/52952907
  // Posted by Morphasis, modified by community. See post 'Timeline' for change history
  // Retrieved 2026-11-14, License - CC BY-SA 4.0
  const debug = false; //true;

  Hooks.on("renderSettingsConfig", (_, html) => {
    window.sundryVoiceSettingsOpen = true;
  });
  Hooks.on("closeSettingsConfig", () => {
    window.sundryVoiceSettingsOpen = false;
  });

  navigator.mediaDevices
    .getUserMedia({
      audio: true,
      video: true,
    })
    .then(function (stream) {
      const audioContext = new AudioContext();
      const analyser = audioContext.createAnalyser();
      const microphone = audioContext.createMediaStreamSource(stream);
      const scriptProcessor = audioContext.createScriptProcessor(2048, 1, 1);

      analyser.smoothingTimeConstant = 0.8;
      analyser.fftSize = 1024;

      microphone.connect(analyser);
      analyser.connect(scriptProcessor);
      scriptProcessor.connect(audioContext.destination);
      let passed = false;
      scriptProcessor.onaudioprocess = function () {
        const array = new Float32Array(analyser.frequencyBinCount);
        analyser.getFloatTimeDomainData(array);

        // Source - https://stackoverflow.com/a/13735541
        // Posted by Jason Olson, modified by community. See post 'Timeline' for change history
        // Retrieved 2026-11-14, License - CC BY-SA 3.0

        const rms = calculateRMS(array);
        const decibel = 20 * Math.log10(rms);

        if (window.sundryVoiceSettingsOpen) {
          const moduleTab = document.querySelector(
            `.tab[data-tab=${MODULE_ID}]`,
          );
          const setting = moduleTab.querySelector(
            `div.form-group:has(range-picker[name^="${MODULE_ID}.display.voice-activity.threshold"])`,
          );
          if (setting) {
            const existingDB = setting.querySelector("span#db");
            if (existingDB) {
              existingDB.innerText = ` ${decibel}DB`;
            } else {
              setting
                .querySelector("label")
                .insertAdjacentHTML(
                  "beforeend",
                  `<span id="db" data-tooltip="Current Decibels"> ${decibel} DB</span>`,
                );
            }
          }
        }

        //   console.log(Math.round(decibel));

        if (decibel > window.sundryVoiceActivityThreshold) {
          if (!passed) {
            passed = true;
            const t =
              game?.user?.character?.getActiveTokens()?.[0] ??
              canvas.tokens.controlled?.[0];
            if (t) {
              new Sequence()
                .effect()
                .file("modules/sundry/assets/border/default.svg")
                .name(`voice-activity-${game.user.id}`)
                .fadeIn(200)
                .fadeOut(200)
                .extraEndDuration(200)
                .attachTo(t)
                .scaleToObject(1.5)
                .persist()
                .play();
            }
          }
        } else if (passed) {
          Sequencer.EffectManager.endEffects({
            name: `voice-activity-${game.user.id}`,
          });
        }
        passed = decibel >= window.sundryVoiceActivityThreshold;
        // colorPids(average);
      };
    })
    .catch(function (err) {
      /* handle the error */
      console.error(err);
    });
}

// From Geeks for Geeks
function calculateRMS(arr) {
  // Calculate the square of each element
  let squares = arr.map((val) => val * val);

  // Calculate the sum of squared values
  let sum = squares.reduce((acc, val) => acc + val, 0);

  // Calculate and return RMS
  let mean = sum / arr.length;
  return Math.sqrt(mean);
}

setupVoiceActivityChecker();
