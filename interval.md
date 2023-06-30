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
            oninput="updateValue(this, true)" onchange="updateValue(this, true)">
    </div>
    <div>
        <label id="volumeLabel" for="volume">Volume: </label>
        <br>
        <input id="volumeSlider" name="volume" style="width: 25%;" type="range" min="0" max="1" step="0.05"
            oninput="updateValue(this, true)" onchange="updateValue(this, true)">
    </div>
    <div>
        <label id="durationLabel" for="duration">Duration: </label>
        <br>
        <input id="durationSlider" name="duration" style="width: 25%;" type="range" min="0.1" max="5" step="0.1"
            oninput="updateValue(this, true)" onchange="updateValue(this, true)">
    </div>
    <div>
        <label id="typeLabel" for="type">Type: </label>
        <select id="typeSelect" name="type" style="width: 20%;" oninput="updateValue(this, true)"
            onchange="updateValue(this, true)">
            <option value="sine">Sine</option>
            <option value="square">Square</option>
            <option value="sawtooth">Sawtooth</option>
            <option value="triangle">Triangle</option>
        </select>
    </div>

    <br>
    <button style="width: 25%;" onclick="testSound()">Test Sound</button>
    <br><br>

    <div>
        <label id="intervalLabel" for="interval">Interval: </label>
        <br>
        <input id="intervalSlider" name="interval" style="width: 25%;" type="range" min="1" max="360" step="1"
            oninput="updateValue(this, true)" onchange="updateValue(this, true)">
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
    let playing = false;

    function updateValue(inputItem, user = false) {
        // audioContext's need to be initialized 
        if (user) init();

        labelName = inputItem.name + "Label";
        label = document.getElementById(labelName)
        endCap = ""
        replValue = inputItem.value

        if (inputItem.name === "duration" || inputItem.name === "interval") endCap = "s"
        else if (inputItem.name === "frequency") {
            if (initialized)
                oscillator.frequency.setValueAtTime(inputItem.value, context.currentTime)
            endCap = "Hz"
        }
        else if (inputItem.name === "volume") {
            endCap = "%"
            replValue = parseFloat((replValue * 2 * 100).toFixed(1))
            if (initialized)
                gainNode.gain.setValueAtTime(inputItem.value, context.currentTime)
        }
        else if (inputItem.name === "type") {
            if (initialized)
                oscillator.type = inputItem.value;
            return; // Ignore the funky weird label code for this one since the select object describes it already.
        }

        label.innerHTML = label.innerHTML.split(":")[0] + ": " + replValue + endCap;
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
            type: document.getElementById("typeSelect").value,
            frequency: document.getElementById("frequencySlider").value
        })

        oscillator.start();
        oscillator.connect(context.destination);
        oscillator.disconnect();
        initialized = true;
    }

    const play = (frequency = 300, duration = 1e3, volume = 50, type = "sine") => {
        playing = true;
        console.log(`Playing sound with frequency: ${frequency}, duration: ${duration}ms, volume: ${volume}`)
        init();
        oscillator.disconnect();
        oscillator.type = type;
        oscillator.frequency.value = frequency;

        gainNode.gain.setTargetAtTime(volume, context.currentTime, 0.135); // Having to use this is a weird side effect of JS
        oscillator.connect(gainNode).connect(context.destination);

        // Schedule a fadeout
        setTimeout(() => {
            gainNode.gain.setTargetAtTime(0, context.currentTime, 0.135);
            playing = false;
        }, duration + 100);

        setTimeout(() => {
            oscillator.disconnect();
        }, duration + 750);
    };

    function playSound() {
        // Stop playing the current sound if we're playing a sound right now
        if (playing) oscillator.disconnect();

        ms = (document.getElementById("durationSlider").value) * 1000;
        volume = document.getElementById("volumeSlider").value;
        hz = document.getElementById("frequencySlider").value;
        type = document.getElementById("typeSelect").value;

        play(hz, ms, volume, type)
        return { hz: hz, ms: ms, volume: volume, type: type }
    }

    function testSound() {
        timerStarted = true; // The function will flip this later so we can toggle off the timer
        startStopTimer();
        // Play the actual sound
        playSound();
    }

    let counter = 0;
    let timerStarted = false;
    let timeouts = [];
    var timerTick = function () {
        if (timerStarted) {
            counter += 1;
            document.getElementById("counter").innerText = counter;
            const snd = playSound();
            timeouts.push(setTimeout(timerTick, (document.getElementById("intervalSlider").value * 1000) + snd.ms));
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
            // Stop all of the previously running timeouts for the timer ticks
            for (var i = 0; i < timeouts.length; i++) {
                clearTimeout(timeouts[i]);
            }
        }
    }
</script>