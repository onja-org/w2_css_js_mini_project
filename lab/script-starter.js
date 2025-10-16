// Song data - UPDATE THIS to match your HTML if you changed the songs!
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

// Current state - tracks what's happening in our player
let currentSongIndex = 0;  // Which song is selected (starts at song 0)
let isPlaying = false;     // Whether music is currently playing
let currentProgress = 0;   // Progress bar position (0-100%)

// Get references to all the HTML elements we'll need to control
const playBtn = document.getElementById('playBtn');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const currentTitle = document.getElementById('currentTitle');
const currentArtist = document.getElementById('currentArtist');
const progressFill = document.getElementById('progressFill');
const trackItems = document.querySelectorAll('.track-item');

// Initialize everything when the page loads
document.addEventListener('DOMContentLoaded', function() {
    // Connect the control buttons to their functions
    playBtn.addEventListener('click', togglePlayPause);
    prevBtn.addEventListener('click', previousSong);  
    nextBtn.addEventListener('click', nextSong);
    
    // Make each song clickable
    trackItems.forEach((trackItem, index) => {
        trackItem.addEventListener('click', () => {
            selectSong(index);
        });
    });
    
    // Initialize the display
    updateNowPlaying();
    updateTrackSelection();
});

// Select and switch to a specific song
function selectSong(index) {
    // Update which song is current
    currentSongIndex = index;
    
    // Update the displays
    updateNowPlaying();
    updateTrackSelection();
    
    // If we're already playing, start playing the new song
    if (isPlaying) {
        playCurrentSong();
    }
}

// Update the "Now Playing" display with current song info
function updateNowPlaying() {
    const currentSong = songs[currentSongIndex];
    currentTitle.textContent = currentSong.title;
    currentArtist.textContent = currentSong.artist;
}

// Update which track appears selected/playing in the list
function updateTrackSelection() {
    // Remove 'playing' class from all tracks
    trackItems.forEach(item => {
        item.classList.remove('playing');
    });
    
    // Add 'playing' class to current track
    if (trackItems[currentSongIndex]) {
        trackItems[currentSongIndex].classList.add('playing');
    }
}

// Toggle between play and pause
function togglePlayPause() {
    if (isPlaying) {
        pauseSong();
    } else {
        playCurrentSong();
    }
}

// Play the current song (called by togglePlayPause)
function playCurrentSong() {
    isPlaying = true;
    playBtn.textContent = '⏸️';  // Change to pause icon
    
    // Update displays
    updateNowPlaying();
    updateTrackSelection();
    
    // Start progress animation
    startProgressAnimation();
}

// Pause the current song (called by togglePlayPause)
function pauseSong() {
    isPlaying = false;
    playBtn.textContent = '▶️';  // Change to play icon
    
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

// Progress bar animation functions (simulates song playback)
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
        progressFill.style.width = currentProgress + '%';
    }, 100);
}

function stopProgressAnimation() {
    if (progressInterval) {
        clearInterval(progressInterval);
        progressInterval = null;
    }
}

// Optional keyboard controls (bonus feature!)
document.addEventListener('keydown', (event) => {
    switch(event.code) {
        case 'Space':
            event.preventDefault();
            togglePlayPause();
            break;
        case 'ArrowLeft':
            previousSong();
            break;
        case 'ArrowRight':
            nextSong();
            break;
    }
});