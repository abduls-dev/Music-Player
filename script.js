const audio = document.getElementById("audio");
const playBtn = document.getElementById("play");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");
const progressContainer = document.getElementById("progress-container");
const progress = document.getElementById("progress");
const title = document.getElementById("title");
const artist = document.getElementById("artist");
const cover = document.getElementById("cover-img");
const currentTimeEl = document.getElementById("current-time");
const durationEl = document.getElementById("duration");
const volumeSlider = document.getElementById("volume");

const songs = [
  {
    name: "song1",
    title: "Song Title 1",
    artist: "Artist 1",
    cover: "cover.png", // Local cover image path
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
  },
  {
    name: "song2",
    title: "Song Title 2",
    artist: "Artist 2",
    cover: "cover2.png", // Local cover image path
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
  },
  {
    name: "song3",
    title: "Song Title 3",
    artist: "Artist 3",
    cover: "cover3.png", // Local cover image path
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
  },
];

let songIndex = 0;

function loadSong(song) {
  title.textContent = song.title;
  artist.textContent = song.artist;
  audio.src = song.url;
  cover.src = song.cover;
}

function playSong() {
  audio.play();
  playBtn.innerHTML = '<i class="fas fa-pause"></i>';
}

function pauseSong() {
  audio.pause();
  playBtn.innerHTML = '<i class="fas fa-play"></i>';
}

function updateProgress() {
  const { duration, currentTime } = audio;
  const progressPercent = (currentTime / duration) * 100;
  progress.style.width = `${progressPercent}%`;

  const currentMinutes = Math.floor(currentTime / 60);
  const currentSeconds = Math.floor(currentTime % 60);
  const durationMinutes = Math.floor(duration / 60);
  const durationSeconds = Math.floor(duration % 60);

  currentTimeEl.textContent = `${currentMinutes}:${
    currentSeconds < 10 ? "0" + currentSeconds : currentSeconds
  }`;
  if (durationSeconds) {
    durationEl.textContent = `${durationMinutes}:${
      durationSeconds < 10 ? "0" + durationSeconds : durationSeconds
    }`;
  }
}

function setProgress(e) {
  const width = this.clientWidth;
  const clickX = e.offsetX;
  const duration = audio.duration;
  audio.currentTime = (clickX / width) * duration;
}

function prevSong() {
  songIndex--;
  if (songIndex < 0) {
    songIndex = songs.length - 1;
  }
  loadSong(songs[songIndex]);
  playSong();
}

function nextSong() {
  songIndex++;
  if (songIndex >= songs.length) {
    songIndex = 0;
  }
  loadSong(songs[songIndex]);
  playSong();
}

function setVolume(e) {
  audio.volume = e.target.value;
}

playBtn.addEventListener("click", () => {
  const isPlaying = playBtn
    .querySelector(".fas")
    .classList.contains("fa-pause");
  if (isPlaying) {
    pauseSong();
  } else {
    playSong();
  }
});

prevBtn.addEventListener("click", prevSong);
nextBtn.addEventListener("click", nextSong);
audio.addEventListener("timeupdate", updateProgress);
progressContainer.addEventListener("click", setProgress);
audio.addEventListener("ended", nextSong);
volumeSlider.addEventListener("input", setVolume);

// Load the first song initially
loadSong(songs[songIndex]);
