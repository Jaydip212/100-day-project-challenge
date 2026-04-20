let timer;
let timeLeft = 25 * 60;
let isRunning = false;
let isWorkMode = true;
const timeDisplay = document.getElementById("time");
const alarm = document.getElementById("alarm");

document.getElementById("start").addEventListener("click", startTimer);
document.getElementById("pause").addEventListener("click", pauseTimer);
document.getElementById("reset").addEventListener("click", resetTimer);
document.getElementById("work-mode").addEventListener("click", () => switchMode(true));
document.getElementById("break-mode").addEventListener("click", () => switchMode(false));

function startTimer() {
    if (!isRunning) {
        isRunning = true;
        timer = setInterval(updateTimer, 1000);
    }
}

function pauseTimer() {
    clearInterval(timer);
    isRunning = false;
}

function resetTimer() {
    clearInterval(timer);
    timeLeft = isWorkMode ? 25 * 60 : 5 * 60;
    updateDisplay();
    isRunning = false;
}

function switchMode(work) {
    isWorkMode = work;
    timeLeft = isWorkMode ? 25 * 60 : 5 * 60;
    updateDisplay();
    resetTimer();
}

function updateTimer() {
    if (timeLeft > 0) {
        timeLeft--;
        updateDisplay();
    } else {
        clearInterval(timer);
        isRunning = false;
        alarm.play();
        alert(isWorkMode ? "Time to take a break!" : "Back to work!");
        switchMode(!isWorkMode);
    }
}

function updateDisplay() {
    let minutes = Math.floor(timeLeft / 60);
    let seconds = timeLeft % 60;
    timeDisplay.textContent = `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
}