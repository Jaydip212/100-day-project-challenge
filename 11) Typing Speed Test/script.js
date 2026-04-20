const quotes = [
    "I Am A Jaydip Coder and  i support the whatsapp group study material.",
    "The quick brown fox jumps over the lazy dog.",
    "Typing speed test is fun and engaging.",
    "Practice makes perfect, so keep typing!",
    "Coding is like magic, you create something from nothing."
];

let startTime, endTime;
let currentQuote = "";

function startTest() {
    let randomIndex = Math.floor(Math.random() * quotes.length);
    currentQuote = quotes[randomIndex];

    document.getElementById("quote").innerText = currentQuote;
    document.getElementById("textInput").value = "";
    document.getElementById("textInput").disabled = false;
    document.getElementById("submitButton").disabled = false;
    document.getElementById("result").innerText = "";

    startTime = new Date().getTime();
    document.getElementById("textInput").focus();
}

function checkTyping() {
    let typedText = document.getElementById("textInput").value.trim();
    let words = currentQuote.split(" ").length;

    if (typedText === currentQuote) {
        endTime = new Date().getTime();
        let timeTaken = (endTime - startTime) / 1000; // in seconds
        let speed = Math.round((words / timeTaken) * 60); // WPM
        document.getElementById("result").innerHTML = `<span class="correct">Speed: ${speed} WPM ✅ (Perfect!)</span>`;
    } else {
        let incorrectWords = checkErrors(typedText, currentQuote);
        document.getElementById("result").innerHTML = `<span class="incorrect">❌ Incorrect: ${incorrectWords} words</span>`;
    }

    document.getElementById("textInput").disabled = true;
    document.getElementById("submitButton").disabled = true;
}

function checkErrors(userText, correctText) {
    let userWords = userText.split(" ");
    let correctWords = correctText.split(" ");
    let incorrectCount = 0;

    for (let i = 0; i < correctWords.length; i++) {
        if (userWords[i] !== correctWords[i]) {
            incorrectCount++;
        }
    }
    return incorrectCount;
}