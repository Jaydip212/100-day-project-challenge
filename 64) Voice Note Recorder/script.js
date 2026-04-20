const startBtn = document.getElementById("startBtn");
const pauseBtn = document.getElementById("pauseBtn");
const resumeBtn = document.getElementById("resumeBtn");
const stopBtn = document.getElementById("stopBtn");
const audioPlayback = document.getElementById("audioPlayback");
const downloadLink = document.getElementById("downloadLink");

let mediaRecorder;
let audioChunks = [];

// Check for browser support
if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
  alert("Your browser does not support audio recording.");
}

// Start recording
startBtn.addEventListener("click", async () => {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    mediaRecorder = new MediaRecorder(stream);

    audioChunks = [];

    mediaRecorder.addEventListener("dataavailable", event => {
      audioChunks.push(event.data);
    });

    mediaRecorder.addEventListener("stop", () => {
      const blob = new Blob(audioChunks, { type: "audio/webm" });
      const url = URL.createObjectURL(blob);
      audioPlayback.src = url;
      downloadLink.href = url;
      downloadLink.removeAttribute("hidden");
    });

    mediaRecorder.start();
    toggleButtons(true);
  } catch (err) {
    alert("Microphone access denied or not supported.");
    console.error(err);
  }
});

// Pause recording
pauseBtn.addEventListener("click", () => {
  if (mediaRecorder && mediaRecorder.state === "recording") {
    mediaRecorder.pause();
    toggleButtons(false, "paused");
  }
});

// Resume recording
resumeBtn.addEventListener("click", () => {
  if (mediaRecorder && mediaRecorder.state === "paused") {
    mediaRecorder.resume();
    toggleButtons(false, "recording");
  }
});

// Stop recording
stopBtn.addEventListener("click", () => {
  if (mediaRecorder && mediaRecorder.state !== "inactive") {
    mediaRecorder.stop();
    toggleButtons(false, "inactive");
  }
});

// Toggle buttons state
function toggleButtons(isRecording, state = "recording") {
  startBtn.disabled = isRecording;
  pauseBtn.disabled = state !== "recording";
  resumeBtn.disabled = state !== "paused";
  stopBtn.disabled = state === "inactive";
}