/*
2 buttons
2 sliders
webaudio api
oscillator node
gain node
frequency control node
*/

let audioCtx = new AudioContext(); //open webaudio
let oscillator = audioCtx.createOscillator(); //add oscillator from webAudio
let gainNode = audioCtx.createGain(); // add gain node from webAudio

oscillator.connect(gainNode);
gainNode.connect(audioCtx.destination);

oscillator.type = "sine"; //wavetype
oscillator.frequency.value = 440; //default frequency
gainNode.gain.value = 0; // starting volume, silent

oscillator.start(); //start oscillator



//gate open function, make noise
const startOscillator = function() { 
gainNode.gain.value = 1;
};

//gate close function, make silent
const stopOscillator = function() { 
gainNode.gain.value = 0;
};


document.getElementById("startButton").addEventListener("click", startOscillator); //link HTML start button to startOscillator function
document.getElementById("stopButton").addEventListener("click", stopOscillator); //link HTML stop button to stopOscillator function


//add sliding scale frequency updater
const updateFrequency = function (event) {
    oscillator.frequency.value = event.target.value;
};

//update sliding scale gain updater. HAd some help from AI to convert to dB

const updateGain = function (event) {
    let dbValue = event.target.value;
    let linearGain = dbValue <= -60 ? 0 : Math.pow(10, dbValue / 20); // Prevent extremely small values
    gainNode.gain.value = linearGain;
};



document.getElementById("freqSlider").addEventListener("input", updateFrequency); //link HTML freq slider to Oscillator freq
document.getElementById("gainSlider").addEventListener("input", updateGain); //link HTML gain slider to oscillator gain
