let hours = 0;
let minutes = 0;
let seconds = 0;
let milliseconds = 0;
let timerInterval = null;
let lapCount = 1;

const display = document.getElementById("display");
const startBtn = document.getElementById("startBtn");
const pauseBtn = document.getElementById("pauseBtn");
const resetBtn = document.getElementById("resetBtn");
const lapBtn = document.getElementById("lapBtn");
const lapList = document.getElementById("lapList");

function updateDisplay() {
  display.textContent = 
    String(hours).padStart(2, "0") + ":" +
    String(minutes).padStart(2, "0") + ":" +
    String(seconds).padStart(2, "0");
}

function startTimer() {
  if (!timerInterval) {
    timerInterval = setInterval(() => {
      milliseconds++;
      if (milliseconds === 100) {
        seconds++;
        milliseconds = 0;
      }
      if (seconds === 60) {
        minutes++;
        seconds = 0;
      }
      if (minutes === 60) {
        hours++;
        minutes = 0;
      }
      updateDisplay();
    }, 10);
  }
}

function pauseTimer() {
  clearInterval(timerInterval);
  timerInterval = null;
}

function resetTimer() {
  pauseTimer();
  hours = 0;
  minutes = 0;
  seconds = 0;
  milliseconds = 0;
  lapCount = 1;
  updateDisplay();
  lapList.innerHTML = "";
}

function recordLap() {
  if (timerInterval) {
    const lapItem = document.createElement("li");
    lapItem.textContent = `Lap ${lapCount}: ${display.textContent}`;
    lapList.appendChild(lapItem);
    lapCount++;
  }
}

startBtn.addEventListener("click", startTimer);
pauseBtn.addEventListener("click", pauseTimer);
resetBtn.addEventListener("click", resetTimer);
lapBtn.addEventListener("click", recordLap);