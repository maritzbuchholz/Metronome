"use strict"

const start = document.querySelector(".metalnome__start");
const blinker = document.querySelector(".metalnome__blinker");


// this function creates the visual time-keeper of a broken heart </3


function blinkOn() {
    blinker.classList.add("metalnome__blinker--on");
}

function blinkOff() {
    blinker.classList.remove("metalnome__blinker--on");
}


//////////////////////////////////

function basicStart () {
    const bpm = document.getElementById("bpm");
    const synth = new Tone.Synth().toDestination();
    Tone.Transport.bpm.value = bpm.value;
    const metroLoop = new Tone.Loop(
        (time) => {
            synth.triggerAttackRelease("G#4", "16n", time);
            Tone.Draw.schedule(()=> {
                if(metalnomeOn) blinkOn();
            }, time);
        },"8n"
    ).start(0);
    const metroLoop2 = new Tone.Loop(
        (time) => {
            Tone.Draw.schedule(()=> {
                if(metalnomeOn) blinkOff();
            }, time);
        },"8n"
    ).start("16n");
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
    if (metalnomeOn){
        basicStart();
    } else {
        stop();
    }
});