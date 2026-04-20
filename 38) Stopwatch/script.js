let minutes = 0, seconds = 0, milliseconds = 0;
let timer;
let isRunning = false;

const startPauseBtn = document.getElementById("startPause");
const resetBtn = document.getElementById("reset");
const minutesDisplay = document.getElementById("minutes");
const secondsDisplay = document.getElementById("seconds");
const millisecondsDisplay = document.getElementById("milliseconds");

function startPauseTimer() {
    if (isRunning) {
        clearInterval(timer);
        startPauseBtn.innerText = "Start";
    } else {
        timer = setInterval(updateTime, 10);
        startPauseBtn.innerText = "Pause";
    }
    isRunning = !isRunning;
}

function updateTime() {
    milliseconds += 10;
    if (milliseconds === 1000) {
        milliseconds = 0;
        seconds++;
    }
    if (seconds === 60) {
        seconds = 0;
        minutes++;
    }
    minutesDisplay.innerText = String(minutes).padStart(2, "0");
    secondsDisplay.innerText = String(seconds).padStart(2, "0");
    millisecondsDisplay.innerText = String(milliseconds / 10).padStart(2, "0");
}

function resetTimer() {
    clearInterval(timer);
    isRunning = false;
    minutes = 0;
    seconds = 0;
    milliseconds = 0;
    minutesDisplay.innerText = "00";
    secondsDisplay.innerText = "00";
    millisecondsDisplay.innerText = "00";
    startPauseBtn.innerText = "Start";
}

startPauseBtn.addEventListener("click", startPauseTimer);
resetBtn.addEventListener("click", resetTimer);