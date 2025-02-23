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
gainNode.gain.value = 0.10; // starting volume, silent

oscillator.start(); //start oscillator



//gate open function, make noise
const startOscillator = function() { 
    // console.log(gainNode.gain.value);
    gainNode.gain.value = 1.0;
    
    console.log("started");
    console.log(gainNode.gain.value);
};

//gate close function, make silent
const stopOscillator = function() { 
    gainNode.gain.value = 0;

};

//add sliding scale frequency updater
const updateFrequency = function (event) {
    oscillator.frequency.value = event.target.value;
};

//update sliding scale gain updater
const updateGain = function (event) {
    gainNode.gain.value = parseFloat(event.target.value);
    console.log("gain updated");
    console.log(gainNode.gain.value);
};




document.getElementById("startButton").addEventListener("click", startOscillator); //link HTML start button to startOscillator function
document.getElementById("stopButton").addEventListener("click", stopOscillator); //link HTML stop button to stopOscillator function


document.getElementById("freqSlider").addEventListener("input", updateFrequency); //link HTML freq slider to Oscillator freq
document.getElementById("gainSlider").addEventListener("input", updateGain); //link HTML gain slider to oscillator gain
