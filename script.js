const audio = document.getElementById('audio');
const playBtn = document.getElementById('play');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const volumeControl = document.getElementById('volume');
const progressContainer = document.querySelector('.progress-container');
const progress = document.getElementById('progress');
const songList = document.getElementById('song-list').children;

const songTitle = document.getElementById('song-title');
const songArtist = document.getElementById('song-artist');
const songAlbum = document.getElementById('song-album');

let currentSongIndex = 0;

// Load the song details and audio source
function loadSong(index) {
  const song = songList[index];
  audio.src = song.dataset.src;
  songTitle.textContent = song.dataset.title;
  songArtist.textContent = `Artist: ${song.dataset.artist}`;
  songAlbum.textContent = `Album: ${song.dataset.album}`;
}

// Play or Pause
playBtn.addEventListener('click', () => {
  if (audio.paused) {
    audio.play();
    playBtn.textContent = '⏸️';
  } else {
    audio.pause();
    playBtn.textContent = '▶️';
  }
});

// Next Song
nextBtn.addEventListener('click', () => {
  currentSongIndex = (currentSongIndex + 1) % songList.length;
  loadSong(currentSongIndex);
  audio.play();
});

// Previous Song
prevBtn.addEventListener('click', () => {
  currentSongIndex = (currentSongIndex - 1 + songList.length) % songList.length;
  loadSong(currentSongIndex);
  audio.play();
});

// Volume Control
volumeControl.addEventListener('input', () => {
  audio.volume = volumeControl.value;
});

// Update Progress Bar
audio.addEventListener('timeupdate', () => {
  const percentage = (audio.currentTime / audio.duration) * 100;
  progress.style.width = `${percentage}%`;
});

// Seek Progress
progressContainer.addEventListener('click', (e) => {
  const width = progressContainer.clientWidth;
  const clickX = e.offsetX;
  const duration = audio.duration;

  audio.currentTime = (clickX / width) * duration;
});

// Play Selected Song
Array.from(songList).forEach((song, index) => {
  song.addEventListener('click', () => {
    currentSongIndex = index;
    loadSong(currentSongIndex);
    audio.play();
  });
});

// Initialize
loadSong(currentSongIndex);
