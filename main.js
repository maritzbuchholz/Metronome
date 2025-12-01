"use strict"

const start = document.querySelector(".metalnome__start");


// this function creates the visual time-keeper of a broken heart </3
//

let lastStamp = 0;
let running = true;

function blinkOn() {
    const blinker = document.querySelector(".metalnome__blinker");
    blinker.classList.add("metalnome__blinker--on");
}

function blinkOff() {
    const blinker = document.querySelector(".metalnome__blinker");
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
            Tone.Draw.schedule(blinkOn, time);
        },"8n"
    ).start(0);
    const metroLoop2 = new Tone.Loop(
        (time) => {
            Tone.Draw.schedule(blinkOff, time);
        },"8n"
    ).start("16n");
    Tone.Transport.start();
}

function stop() {
    Tone.Transport.stop();
    Tone.Transport.cancel(); // Clears all scheduled events
}


let metalnomeOn = false;
start.addEventListener("click", async (event) => {
    event.preventDefault();
    metalnomeOn = !metalnomeOn;
    if (metalnomeOn){
        running = true;
        await Tone.start();
        basicStart();
    } else {
        stop();
    }
});