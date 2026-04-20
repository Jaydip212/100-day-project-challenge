const songs = [
    { name: "pyar huwa ", src: "songs/song  1.mp3" },
    { name: "Hanuman Chalisa", src: "songs/song 2.mp3" },
    { name: "mere ghar ram aaye", src: "songs/ song 3.mp3" }
];

let songIndex = 0;
const audioPlayer = document.getElementById("audio-player");
const songTitle = document.getElementById("song-title");
const progress = document.getElementById("progress");

function loadSong(index) {
    songTitle.textContent = songs[index].name;
    audioPlayer.src = songs[index].src;
}

function togglePlay() {
    if (audioPlayer.paused) {
        audioPlayer.play();
    } else {
        audioPlayer.pause();
    }
}

function nextSong() {
    songIndex = (songIndex + 1) % songs.length;
    loadSong(songIndex);
    audioPlayer.play();
}

function prevSong() {
    songIndex = (songIndex - 1 + songs.length) % songs.length;
    loadSong(songIndex);
    audioPlayer.play();
}

audioPlayer.addEventListener("timeupdate", () => {
    progress.value = (audioPlayer.currentTime / audioPlayer.duration) * 100;
});

progress.addEventListener("input", () => {
    audioPlayer.currentTime = (progress.value / 100) * audioPlayer.duration;
});

// Load the first song on start
loadSong(songIndex);