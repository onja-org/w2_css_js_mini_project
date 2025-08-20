// Song data - matches the HTML structure
const songs = [
  {
    title: "Bohemian Rhapsody",
    artist: "Queen",
    duration: "5:55",
  },
  {
    title: "King",
    artist: "Florence And The Machine",
    duration: "5:19",
  },
  {
    title: "Highway Chile",
    artist: "Jimi Hendrix",
    duration: "3:33",
  },
  {
    title: "Buffalo Soldier",
    artist: "Bob Marley",
    duration: "4:16",
  },
  {
    title: "Patience",
    artist: "Guns N' Roses",
    duration: "5:55",
  },
  {
    title: "My Sweet Lord",
    artist: "George Harrison",
    duration: "4:41",
  },
  {
    title: "Let It Be",
    artist: "The Beatles",
    duration: "3:51",
  },
  {
    title: "Everything In Its Right Place",
    artist: "Radiohead",
    duration: "4:12",
  },
];

// Current state
let currentSongIndex = 0;
let isPlaying = false;
let currentProgress = 0;

// Get DOM elements
const playBtn = document.getElementById("playBtn");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const currentTitle = document.getElementById("currentTitle");
const currentArtist = document.getElementById("currentArtist");
const progressFill = document.getElementById("progressFill");
const trackItems = document.querySelectorAll(".track-item");

// Initialize the player
function initializePlayer() {
  // Set up click listeners for all track items
  trackItems.forEach((trackItem, index) => {
    trackItem.addEventListener("click", () => {
      selectSong(index);
    });
  });

  // Set up control button listeners
  playBtn.addEventListener("click", togglePlayPause);
  prevBtn.addEventListener("click", previousSong);
  nextBtn.addEventListener("click", nextSong);
}

// Select a song by index
function selectSong(index) {
  // Update current song index
  currentSongIndex = index;

  // Update the display
  updateNowPlaying();
  updateTrackSelection();

  // If we're playing, start playing the new song
  if (isPlaying) {
    playCurrentSong();
  }
}

// Update the "Now Playing" display
function updateNowPlaying() {
  const currentSong = songs[currentSongIndex];
  currentTitle.textContent = currentSong.title;
  currentArtist.textContent = currentSong.artist;
}

// Update which track appears selected/playing
function updateTrackSelection() {
  // Remove 'playing' class from all tracks
  trackItems.forEach(item => {
    item.classList.remove("playing");
  });

  // Add 'playing' class to current track
  if (trackItems[currentSongIndex]) {
    trackItems[currentSongIndex].classList.add("playing");
  }
}

// Toggle play/pause
function togglePlayPause() {
  if (isPlaying) {
    pauseSong();
  } else {
    playCurrentSong();
  }
}

// Play the current song
function playCurrentSong() {
  isPlaying = true;
  playBtn.textContent = "⏸️";

  // Update displays
  updateNowPlaying();
  updateTrackSelection();

  // Start progress animation
  startProgressAnimation();
}

// Pause the current song
function pauseSong() {
  isPlaying = false;
  playBtn.textContent = "▶️";

  // Stop progress animation
  stopProgressAnimation();
}

// Go to previous song
function previousSong() {
  if (currentSongIndex > 0) {
    selectSong(currentSongIndex - 1);
  } else {
    // Loop to last song
    selectSong(songs.length - 1);
  }
}

// Go to next song
function nextSong() {
  if (currentSongIndex < songs.length - 1) {
    selectSong(currentSongIndex + 1);
  } else {
    // Loop to first song
    selectSong(0);
  }
}

// Simple progress bar animation
let progressInterval;

function startProgressAnimation() {
  // Reset progress
  currentProgress = 0;

  // Clear any existing interval
  stopProgressAnimation();

  // Start new interval - simulate song progress
  progressInterval = setInterval(() => {
    currentProgress += 0.5; // Increase by 0.5% every 100ms

    if (currentProgress >= 100) {
      currentProgress = 100;
      // Song finished - go to next song
      nextSong();
    }

    // Update progress bar
    progressFill.style.width = currentProgress + "%";
  }, 100);
}

function stopProgressAnimation() {
  if (progressInterval) {
    clearInterval(progressInterval);
    progressInterval = null;
  }
}

// Initialize everything when the page loads
document.addEventListener("DOMContentLoaded", initializePlayer);

// Optional: Add keyboard controls
document.addEventListener("keydown", event => {
  switch (event.code) {
    case "Space":
      event.preventDefault();
      togglePlayPause();
      break;
    case "ArrowLeft":
      previousSong();
      break;
    case "ArrowRight":
      nextSong();
      break;
  }
});
