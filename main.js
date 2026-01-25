"use strict";
import * as Tone from "tone";

const start = document.querySelector(".metalnome__button");
const blinker = document.querySelector(".metalnome__blinker");

// 1. Silent Loop (Bypasses Silent Switch & Keeps App Alive)
const silentAudio = document.getElementById("silent-audio");
if (silentAudio) {
  // Use a proper silent MP3 (approx 0.5s silence). This works better than the tiny WAV.
  silentAudio.src = "data:audio/mp3;base64,//OEAAAAAAAAAAAAAAAAAAAAAAAASW5mbwAAAA8AAAAEAAABIADAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV6urq6urq6urq6urq6urq6urq6urq6urq6v////////////////////////////////8AAAAATGF2YzU2LjQxAAAAAAAAAAAAAAAAJAAAAAAAAAAAASDs90hvAAAAAAAAAAAAAAAAAAAA//MUZAAAAAGkAAAAAAAAA0gAAAAATEFN//MUZAMAAAGkAAAAAAAAA0gAAAAARTMu//MUZAYAAAGkAAAAAAAAA0gAAAAAOTku//MUZAkAAAGkAAAAAAAAA0gAAAAANVVV";
}

// 1. PRIME AUDIO ON FIRST TOUCH (Global Unlock)
function primeAudio() {
  if (Tone.context.state !== 'running') {
    Tone.context.resume();
  }
  
  if(silentAudio) {
    silentAudio.play().catch(e => console.log("Silent audio failed", e));
  }
  
  // Only play the silent audio once to unlock the channel
  // We can leave it looping or pause it, but keeping it playing is safer for silent mode
  // However, users might not want it running forever if they never click play.
  // Actually, for silent mode to work, it MUST be playing. 
  // So we let it run. It's silent.
  
  if ('mediaSession' in navigator) {
    navigator.mediaSession.metadata = new MediaMetadata({
      title: 'Metalnome',
      artist: 'BrainStation',
      album: 'Metronome',
      artwork: [
        { src: './assets/skull.png', sizes: '512x512', type: 'image/png' },
      ]
    });
  
    // iOS requires these handlers to enable background audio
    navigator.mediaSession.setActionHandler('play', () => { 
        if(silentAudio) silentAudio.play();
        Tone.Transport.start(); 
        navigator.mediaSession.playbackState = "playing";
    });
    navigator.mediaSession.setActionHandler('pause', () => { 
        if(silentAudio) silentAudio.pause();
        Tone.Transport.pause();
        navigator.mediaSession.playbackState = "paused";
    });
  }
  
  document.removeEventListener('touchstart', primeAudio);
  document.removeEventListener('click', primeAudio);
}

document.addEventListener('touchstart', primeAudio);
document.addEventListener('click', primeAudio);

// 3. Detect correct event (Touch vs Click)
const triggerEvent = 'ontouchend' in document ? 'touchend' : 'click';


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
start.addEventListener(triggerEvent, (event) => {
  // event.preventDefault() removed to allow native audio unlock
  
  const selectedGroove = document.querySelector(".metalnome__groove").value;
  
  // 1. UNLOCK IMMEDIATELY (Synchronous)
  if (!metalnomeOn) {
      if(silentAudio) silentAudio.play().catch(e => console.log("Audio play failed", e));
      Tone.start(); 
  }

  // 2. Proceed without awaiting (Tone.start is handled by unlockiOS resume)
  
  metalnomeOn = !metalnomeOn;
  if (metalnomeOn) {
    grooveList[selectedGroove]();
    if ('mediaSession' in navigator) navigator.mediaSession.playbackState = "playing";
  } else {
    stop();
    if ('mediaSession' in navigator) navigator.mediaSession.playbackState = "paused";
  }
});
