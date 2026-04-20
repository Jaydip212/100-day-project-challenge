const textarea = document.querySelector("textarea");
const voiceSelect = document.querySelector("select");
const speedSlider = document.querySelector(".speed-slider");
const speedValue = document.querySelector(".speed-value");
const playButton = document.querySelector(".play");
const pauseButton = document.querySelector(".pause");
const stopButton = document.querySelector(".stop");

let synth = window.speechSynthesis;
let isSpeaking = false;
let currentUtterance = null;

function populateVoices() {
    voiceSelect.innerHTML = '';
    const voices = synth.getVoices();
    
    voices.forEach((voice, i) => {
        const option = new Option(voice.name, i);
        voiceSelect.appendChild(option);
    });
}

populateVoices();
if (speechSynthesis.onvoiceschanged !== undefined) {
    speechSynthesis.onvoiceschanged = populateVoices;
}

function speak() {
    if (textarea.value !== '') {
        if (synth.speaking) {
            synth.cancel();
        }

        const utterance = new SpeechSynthesisUtterance(textarea.value);
        currentUtterance = utterance;
        
        utterance.voice = synth.getVoices()[voiceSelect.value];
        utterance.rate = speedSlider.value;
        
        utterance.onstart = () => {
            isSpeaking = true;
            playButton.style.background = '#4CAF50';
        };
        
        utterance.onend = () => {
            isSpeaking = false;
            playButton.style.background = '#667eea';
            currentUtterance = null;
        };
        
        synth.speak(utterance);
    }
}

playButton.addEventListener("click", () => {
    if (!synth.speaking || (synth.speaking && synth.paused)) {
        speak();
    }
});

pauseButton.addEventListener("click", () => {
    if (synth.speaking) {
        if (synth.paused) {
            synth.resume();
        } else {
            synth.pause();
        }
    }
});

stopButton.addEventListener("click", () => {
    synth.cancel();
    isSpeaking = false;
    playButton.style.background = '#667eea';
});

speedSlider.addEventListener("input", (e) => {
    const speed = e.target.value;
    speedValue.textContent = speed + 'x';
    if (currentUtterance) {
        currentUtterance.rate = speed;
    }
});

// Handle textarea placeholder
textarea.addEventListener("focus", () => {
    if (textarea.value === textarea.getAttribute("placeholder")) {
        textarea.value = '';
    }
});

textarea.addEventListener("blur", () => {
    if (textarea.value === '') {
        textarea.value = textarea.getAttribute("placeholder");
    }
});
