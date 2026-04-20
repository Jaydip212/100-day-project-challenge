let timer;
const startBtn = document.getElementById("startBtn");

startBtn.addEventListener("click", () => {
    let minutes = document.getElementById("minutes").value;
    let timeInSeconds = minutes * 60;

    if (isNaN(timeInSeconds) || timeInSeconds <= 0) {
        alert("Please enter a valid number of minutes.");
        return;
    }

    clearInterval(timer); // Clear any existing timer

    timer = setInterval(() => {
        let minutes = Math.floor(timeInSeconds / 60);
        let seconds = timeInSeconds % 60;

        document.getElementById("timer").innerText = 
            `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

        if (timeInSeconds <= 0) {
            clearInterval(timer);
            alert("Time's up!");
        } else {
            timeInSeconds--;
        }
    }, 1000);
});