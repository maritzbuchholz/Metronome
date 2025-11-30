"use strict"

const start = document.querySelector(".metalnome__start");


// this function creates the visual time-keeper of a broken heart </3
//
const blinker = document.querySelector(".metalnome__blinker");
let lastStamp = 0;
let running = true;

function startBlinker (time) {
    // const interval = Tone.Time("16n").toSeconds() * 1000; //converts time signature to milliseconds
    const interval = 100;
    function animation (time) {
        if (time - lastStamp >= interval && running) {
            blinker.style.visibility =
                blinker.style.visibility === "hidden" ? "visible" : "hidden"; //flips blinker from visible to hidden
            lastStamp = time;
        }
        requestAnimationFrame(animation); //pass the function but do not call it
    }
    requestAnimationFrame(animation); //need to call twice to get it to blink
}

function stopBlinker(){
    running = false;
    blinker.style.visibility = "hidden";
}

//////////////////////////////////

function basicStart () {
    const bpm = document.getElementById("bpm");
    const synth = new Tone.Synth().toDestination();
    Tone.Transport.bpm.value = bpm.value;
    const metroLoop = new Tone.Loop(
        (time) => {
            synth.triggerAttackRelease("G#4", "16n", time);
            Tone.Draw.schedule(startBlinker, time);
        },"8n"
    ).start(0);
    Tone.Transport.start();
}

function stop() {
    stopBlinker();
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