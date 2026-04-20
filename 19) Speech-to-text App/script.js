const button = document.getElementById('startButton');
const output = document.getElementById('output');

if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.continuous = false;
    recognition.lang = 'en-US';

    button.onclick = () => {
        recognition.start();
        button.innerText = "🎤 Listening...";
    };

    recognition.onresult = (event) => {
        output.innerText = event.results[0][0].transcript;
        button.innerText = "🎤 Start Speaking";
    };

    recognition.onerror = (event) => {
        output.innerText = "Error: " + event.error;
        button.innerText = "🎤 Start Speaking";
    };
} else {
    output.innerText = "Speech recognition not supported in this browser.";
}