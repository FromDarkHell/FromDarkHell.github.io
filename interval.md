---
layout: default
title: Interval Timer
redirect_from:
- /timer/
---

<style>
    input {
        margin-top: 5px;
    }
</style>

<div style="text-align: center">

    <div>
        <label id="frequencyLabel" for="frequency">Frequency: </label>
        <br>
        <input id="frequencySlider" name="frequency" style="width: 25%;" type="range" min="0" max="8000" step="10"
            oninput="updateValue(this)" onchange="updateValue(this)">
    </div>
    <div>
        <label id="volumeLabel" for="volume">Volume: </label>
        <br>
        <input id="volumeSlider" name="volume" style="width: 25%;" type="range" min="0" max="1" step="0.05"
            oninput="updateValue(this)" onchange="updateValue(this)">
    </div>
    <div>
        <label id="durationLabel" for="duration">Duration: </label>
        <br>
        <input id="durationSlider" name="duration" style="width: 25%;" type="range" min="0" max="5" step="0.1"
            oninput="updateValue(this)" onchange="updateValue(this)">
    </div>
    <button style="width: 25%;" onclick="testSound()">Test Sound</button>
    <br><br>

    <div>
        <label id="intervalLabel" for="interval">Interval: </label>
        <br>
        <input id="intervalSlider" name="interval" style="width: 25%;" type="range" min="0" max="360" step="1"
            oninput="updateValue(this)" onchange="updateValue(this)">
    </div>

    <button style="width: 25%" id="timerButton" onclick="startStopTimer()">Start Timer</button>
    <br><br>
    <label id="counterLabel">Session Count: </label>
    <label id="counter">0</label>
</div>

<script>
    let context = null;
    let oscillator = null;
    let gainNode = null;
    let initialized = false;

    function updateValue(slider) {
        labelName = slider.name + "Label";
        label = document.getElementById(labelName)
        endCap = ""
        replValue = slider.value
        if (slider.name === "duration" || slider.name === "interval") endCap = "s"
        else if (slider.name === "volume") {
            endCap = "%"
            replValue = parseFloat((replValue * 2 * 100).toFixed(1))
        }

        label.innerHTML = label.innerHTML.split(":")[0] + ": " + replValue + endCap;

        init();
    }

    inputs = document.getElementsByTagName("input")
    for (let index = 0; index < inputs.length; index++) {
        const inp = inputs[index];
        if (inp.type === "range") {
            updateValue(inp);
        }
    }


    function init() {
        if (initialized) return;
        var AudioContext = window.AudioContext || window.webkitAudioContext;
        context = new AudioContext();
        gainNode = new GainNode(context, {
            gain: document.getElementById("volumeSlider").value
        });
        oscillator = new OscillatorNode(context, {
            type: "sine",
            frequency: document.getElementById("frequencySlider").value
        })
    }

    const play = (frequency = 300, duration = 1e3, volume = 50) => {
        console.log(`Playing sound with frequency: ${frequency}, duration: ${duration}ms, volume: ${volume}`)
        init();
        oscillator.disconnect();
        oscillator.frequency.value = frequency;
        oscillator.type = 'sine';

        gainNode.gain = volume;
        oscillator.connect(gainNode).connect(context.destination);

        oscillator.start(0);

        // Schedule a fadeout
        setTimeout(() => {
            gainNode.gain.setTargetAtTime(0, context.currentTime, 0.135);
        }, duration + 100);
    };

    function playSound() {
        ms = (document.getElementById("durationSlider").value) * 1000;
        volume = document.getElementById("volumeSlider").value / 100;
        hz = document.getElementById("frequencySlider").value;
        play(hz, ms, volume)
    }

    function testSound() {
        timerStarted = true; // The function will flip this later so we can toggle off the timer
        startStopTimer();
        // Play the actual sound
        playSound();
    }

    let counter = 0;
    let timerStarted = false;
    var timerTick = function () {
        if (timerStarted) {
            counter += 1;
            document.getElementById("counter").innerText = counter;
            playSound();
            setTimeout(timerTick, document.getElementById("intervalSlider").value * 1000)
        }
    }

    function startStopTimer() {
        timerStarted = !timerStarted;
        if (timerStarted) {
            document.getElementById("timerButton").innerText = "Stop Timer"
            timerTick();
        }
        else {
            document.getElementById("timerButton").innerText = "Start Timer"
        }
    }
</script>