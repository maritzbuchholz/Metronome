"use strict";
import * as Tone from "tone";
import NoSleep from "nosleep.js";

const start = document.querySelector(".metalnome__button");
const blinker = document.querySelector(".metalnome__blinker");

// 1. Silent Loop (Bypasses Silent Switch)
const silentAudio = document.getElementById("silent-audio");
if (silentAudio) {
  // Use a tiny silent mp3 or wav. This one works well.
  silentAudio.src = "data:audio/wav;base64,UklGRjIAAABXQVZFZm10IBIAAAABAAEAQB8AAEAfAAABAAgAAABmYWN0BAAAAAAAAABkYXRhAAAAAA==";
}

// 2. NoSleep (Keeps App Awake in Background)
const noSleep = new NoSleep();


const grooveList = {
  standard: standard,
  blast: blastBeat,
  motor: motorhead,
  slipknot: slipknot,
  breakdown: breakdown,
  windmills: windmills,
  faceripper: faceripper,
}

//utilities

function stop() {
  metalnomeOn = false;
  // Disable hacks
  if(silentAudio) silentAudio.pause();
  noSleep.disable();
  
  Tone.Transport.stop();
  Tone.Transport.cancel();
  Tone.Draw.cancel();
  blinkOff();
}


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

// instruments

const players = new Tone.Players({
    "kick": "./assets/samplers/kick.wav",
    "snare": "./assets/samplers/snare.wav",
    "openhh": "./assets/samplers/openhh.wav",
    "closedhh": "./assets/samplers/closedhh.wav",
    "crash": "./assets/samplers/crash.wav",
}).toDestination();


//grooves

function standard() {
  const bpm = document.getElementById("bpm");
  const synth = new Tone.Synth().toDestination();
  Tone.Transport.bpm.value = bpm.value;
  const timeKeeperCall = timeKeeper();
  const seq = new Tone.Sequence(
    (time, note) => {
      synth.triggerAttackRelease(note, "16n", time);
    },
    ["A4", "G#4", "G#4", "G#4", "G#4", "G#4", "G#4", "G#4"],
    "8n"
  ).start(0);
  Tone.Transport.start();
}

function blastBeat() {
  const bpm = document.getElementById("bpm");
  const synth = new Tone.Synth().toDestination();
  Tone.Transport.bpm.value = bpm.value;
  const timeKeeperCall = timeKeeper();

  const cymbals = new Tone.Sequence(
    (time, note) => {
      players.player(note).start(time);
    },
    ["crash"   , "closedhh", "closedhh", "closedhh",
     "closedhh", "closedhh", "closedhh", "closedhh"],
    "8n"
  ).start(0);

  const drums = new Tone.Sequence(
    (time, note) => {
      players.player(note).start(time);
    },
    ["kick", "snare"],
    "16n"
  ).start(0);
  Tone.Transport.start();
}

function motorhead() {
  const bpm = document.getElementById("bpm");
  const synth = new Tone.Synth().toDestination();
  Tone.Transport.bpm.value = bpm.value;
  const timeKeeperCall = timeKeeper();



  const cymbals = new Tone.Sequence(
    (time, note) => {
      players.player(note).start(time);
    },
    ["closedhh"],
    "8n"
  ).start(0);

  const kick = new Tone.Sequence(
    (time, note) => {
      players.player(note).start(time);
    },
    ["kick"],
    "16n"
  ).start(0);
  Tone.Transport.start();

  const snare = new Tone.Sequence(
    (time, note) => {
      players.player(note).start(time);
    },
    ["snare"],
    "4n"
  ).start("8n");
  Tone.Transport.start();
}

function slipknot() {
  const bpm = document.getElementById("bpm");
  const synth = new Tone.Synth().toDestination();
  Tone.Transport.bpm.value = bpm.value;
  const timeKeeperCall = timeKeeper();

  const cymbals = new Tone.Sequence(
    (time, note) => {
      players.player(note).start(time);
    },
    ["closedhh"],
    "4n"
  ).start(0);

  const kick = new Tone.Sequence(
    (time, note) => {
      players.player(note).start(time);
    },
    ["kick"],
    "16n"
  ).start(0);

  const snare = new Tone.Sequence(
    (time, note) => {
      players.player(note).start(time);
    },
    ["snare"],
    "2n"
  ).start("4n");
  Tone.Transport.start();
}

function breakdown() {
  const bpm = document.getElementById("bpm");
  const synth = new Tone.Synth().toDestination();
  Tone.Transport.bpm.value = bpm.value;
  const timeKeeperCall = timeKeeper();

  const cymbals = new Tone.Sequence(
    (time, note) => {
      players.player(note).start(time);
    },
    ["closedhh"],
    "4n"
  ).start(0);

  const kick = new Tone.Sequence(
    (time, note) => {
      players.player(note).start(time);
    },
    ["kick"],
    "16n"
  ).start(0);

  const snare = new Tone.Sequence(
    (time, note) => {
      players.player(note).start(time);
    },
    ["snare"],
    "1n"
  ).start("2n");
  Tone.Transport.start();
}

function windmills() {
  const bpm = document.getElementById("bpm");
  const synth = new Tone.Synth().toDestination();
  Tone.Transport.bpm.value = bpm.value;
  const timeKeeperCall = timeKeeper();

  const cymbals = new Tone.Sequence(
    (time, note) => {
      players.player(note).start(time);
    },
    ["closedhh"],
    "2n"
  ).start(0);

  const kick = new Tone.Sequence(
    (time, note) => {
      players.player(note).start(time);
    },
    ["kick", "kick", null, null, null, null, "kick", "kick",
     null, null, null, null, null, null, null, null,
    ],
    "8n"
  ).start(0);

  const snare = new Tone.Sequence(
    (time, note) => {
      players.player(note).start(time);
    },
    ["snare"],
    "1n"
  ).start("2n");
  Tone.Transport.start();
}

function faceripper() {
  const bpm = document.getElementById("bpm");
  const synth = new Tone.Synth().toDestination();
  Tone.Transport.bpm.value = bpm.value;
  const timeKeeperCall = timeKeeper();

  const cymbals = new Tone.Sequence(
    (time, note) => {
      players.player(note).start(time);
    },
    ["closedhh"],
    "4n"
  ).start(0);

  const drum = new Tone.Sequence(
    (time, note) => {
      players.player(note).start(time);
    },
    [
    "kick", null  , null  , "kick", "snare", null, "kick", null  ,
    null  , null  , "kick", null  , "snare", null, "kick", "kick",
    "kick", null  , null  , "kick", "snare", null, "kick", null  ,
    null  , null  , "kick", "kick", "snare", null, null  , null  ,
    "kick", null  , null  , "kick", "snare", null, "kick", null  ,
    null  , null  , "kick", null  , "snare", null, "kick", "kick",
    "kick", null  , null  , "kick", "snare", null, "kick", null  ,
    "kick", "kick", "kick", "kick", "snare", null, "kick", null  ,
    ],
    "16n"
  ).start(0);
  Tone.Transport.start();
}

//////////////////////////////////


let metalnomeOn = false;
start.addEventListener("click", async (event) => {
  event.preventDefault();
  const selectedGroove = document.querySelector(".metalnome__groove").value;
  
  if (!metalnomeOn) {
      // STARTING: Trigger hacks IMMEDIATELY on user gesture
      if(silentAudio) silentAudio.play().catch(e => console.log("Audio play failed", e));
      noSleep.enable();
  }

  await Tone.start(); //connects to the WebAudio API and enable AudioContext
  metalnomeOn = !metalnomeOn;
  if (metalnomeOn) {
    grooveList[selectedGroove]();
  } else {
    stop();
  }
});
