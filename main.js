"use strict";

const start = document.querySelector(".metalnome__start");
const blinker = document.querySelector(".metalnome__blinker");

// this function creates the visual time-keeper of a broken heart </3

function blinkOn() {
  blinker.classList.add("metalnome__blinker--on");
}

function blinkOff() {
  blinker.classList.remove("metalnome__blinker--on");
}

function timeKeeper() {
  const seq = new Tone.Sequence(
    (time, action) => {
      Tone.Draw.schedule(() => {
        if (metalnomeOn) action();
      }, time);
    },
    [blinkOn, blinkOff],
    "16n"
  ).start(0);
  return () => seq.start(0);
}

//////////////////////////////////

function basicStart() {
  const bpm = document.getElementById("bpm");
  const synth = new Tone.Synth().toDestination();
  Tone.Transport.bpm.value = bpm.value;
  const timeKeeperCall = timeKeeper();
  const metroLoop = new Tone.Loop((time) => {
    synth.triggerAttackRelease("G#4", "16n", time);
  }, "8n").start(0);
  Tone.Transport.start();
}

function blastBeat() {
  const bpm = document.getElementById("bpm");
  const synth = new Tone.Synth().toDestination();
  Tone.Transport.bpm.value = bpm.value;
  const timeKeeperCall = timeKeeper();
  const seq = new Tone.Sequence(
    (time, note) => {
      synth.triggerAttackRelease(note, "16n", time);
    },
    ["C4", "G#4"],
    "16n"
  ).start(0);
  Tone.Transport.start();
}

function stop() {
  metalnomeOn = false;
  Tone.Transport.stop();
  Tone.Transport.cancel();
  Tone.Draw.cancel();
  blinkOff();
}

let metalnomeOn = false;
start.addEventListener("click", async (event) => {
  event.preventDefault();
  const blinker = document.querySelector(".metalnome__blinker");
  await Tone.start(); //connects to the WebAudio API and enable AudioContext
  metalnomeOn = !metalnomeOn;
  if (metalnomeOn) {
    blastBeat();
  } else {
    stop();
  }
});
