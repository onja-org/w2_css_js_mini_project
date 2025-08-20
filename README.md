# Music Dashboard Lab

![Demonstration of finished music player](assets/music_player_demo.png)

**Week 9 Mini Project: HTML + CSS + JavaScript**

Welcome to your capstone project for Week 9! You'll build an interactive music dashboard that showcases how HTML, CSS, and JavaScript work together to create dynamic web applications.

This project embodies the theme: **"CSS creates possibilities, JavaScript activates them."**

## 🎯 Project Overview

You're building a music dashboard similar to Spotify or Apple Music - a beautiful interface where users can view their playlist, see what's currently playing, and control playback.

**Important**: This lab has two distinct stages:
1. **Stage 1**: Build the complete visual interface (HTML + CSS)  
2. **Stage 2**: Add JavaScript interactivity to bring it to life

We'll focus on Stage 1 first, creating a stunning visual foundation that JavaScript can later activate.

---

## 🛠️ Getting Started with Stage 1

**Your Mission**: Build a beautiful, complete music dashboard interface using HTML and CSS.

### Step 1: Set Up Your Files
1. Create `index.html` and `style.css` files
2. Run `npm install` to set up testing

### Step 2: Plan Your Layout

Your music dashboard needs three main sections:

```
┌─────────────┬─────────────────────────────┐
│             │                             │
│   SIDEBAR   │       MAIN CONTENT         │
│             │     (Song List Area)       │
│  - Logo     │                             │
│  - Nav Menu │  ┌─────────────────────────┐ │
│             │  │  Song 1: Title - Artist │ │
│             │  │  Song 2: Title - Artist │ │
│             │  │  Song 3: Title - Artist │ │
│             │  │         ...             │ │
│             │  └─────────────────────────┘ │
├─────────────┴─────────────────────────────┤
│             CONTROLS SECTION              │
│  [Album Art] [Current Song Info] [▶️ ⏮️ ⏭️] │
└───────────────────────────────────────────┘
```

### Step 3: Build and Style Creatively!

**Creative Freedom**: Make this dashboard your own! You have complete creative control over colors, fonts, spacing, and visual effects. The wireframe above shows the layout structure, but the styling is entirely up to you.

**As you build, test frequently**: Run `npm test` to make sure your structure will work with JavaScript later.

---

## 📋 Stage 1: Detailed Requirements

*Use this section as a reference while building - you don't need to memorize everything upfront!*

### 🏗️ Required Structure & IDs

**IMPORTANT**: For Stage 2 to work, your HTML must include these specific elements with exact IDs and classes:

#### Main Container
- Wrap everything in a container with class `music-player`
- Use CSS Grid or Flexbox for the three-section layout

#### Sidebar Section  
- Container with class `sidebar`
- Include logo/branding area
- Add navigation menu (can be decorative for now)

#### Main Content Section
- Container with class `main-content`  
- Song list container with `id="trackList"`
- **Each song item must have:**
  - Class: `track-item`
  - Sequential ID: `song-0`, `song-1`, `song-2`, etc. (at least 6 songs)
  - Child element with class `track-title` (contains song title)
  - Child element with class `track-artist` (contains artist name)
  - Set `cursor: pointer` in CSS to indicate clickability

#### Controls Section
- Container with class `controls-section`
- **Now Playing display:**
  - Element with `id="currentTitle"` (shows current song title)
  - Element with `id="currentArtist"` (shows current artist)
- **Control buttons:**
  - Play button with `id="playBtn"`
  - Previous button with `id="prevBtn"`  
  - Next button with `id="nextBtn"`
- **Progress bar:**
  - Progress fill element with `id="progressFill"`

### 🎵 Song List Data

Use these songs in your playlist (feel free to swap in your favorites!):

1. **Bohemian Rhapsody** - Queen (5:55)
2. **King** - Florence And The Machine (5:19) 
3. **Highway Chile** - Jimi Hendrix (3:33)
4. **Buffalo Soldier** - Bob Marley (4:16)
5. **Patience** - Guns N' Roses (5:55)
6. **My Sweet Lord** - George Harrison (4:41)
7. **Let It Be** - The Beatles (3:51)
8. **Everything In Its Right Place** - Radiohead (4:12)

### 🎨 Button Icons & Symbols

For consistent styling, use these emoji icons:

**Control Buttons:**
- Play: ▶️
- Pause: ⏸️ 
- Previous: ⏮️
- Next: ⏭️
- Shuffle: 🔀
- Repeat: 🔁

**Sidebar Icons:**
- Music: 🎵
- Library: 📁
- Favorites: ❤️
- Radio: 📻

**Other:**
- Volume: 🔊
- Like: ❤️
- More options: ⋯

### 🎨 Design Guidelines

**Creative Freedom**: Make this dashboard your own! The layout structure above is required, but how it is styled is up to you. The screenshot is just an example of how your music player might look. You have complete creative control over:

- **Colors & Theme**: Dark mode, light mode, colorful, monochrome - your choice!
- **Typography**: Font families, sizes, weights
- **Spacing**: Padding, margins, gap sizes  
- **Visual Effects**: Gradients, shadows, borders, animations
- **Hover States**: How elements respond to mouse interaction
- **Music Selection**: Which songs you include in the playlist (Make sure to update the JavaScript file later to match your choices! We'll remind you in the next stage.)

**Layout Requirements**:
- Use CSS Grid or Flexbox for main layout
- Make sure all buttons are properly sized (at least 20px × 20px)
- Ensure text is readable and elements are visually distinct
- Track items should look clickable (hint: `cursor: pointer`)

**Responsive Considerations**:
- Design for desktop first (mobile adaptation comes later)
- Make sure content doesn't overflow containers

### ✅ Testing Your Work

Run the tests to verify your structure is ready for JavaScript integration:

```bash
npm install
npm test
```

The tests check for:
- ✅ All required IDs and classes are present
- ✅ Song list has proper structure  
- ✅ Control elements exist and are clickable
- ✅ Layout uses modern CSS (Grid/Flexbox)
- ✅ Visual elements are properly styled and visible

**Note**: Tests focus on structure and functionality, not specific design choices. Your creative decisions won't affect test results!

### 🎯 Stage 1 Success Criteria

You'll know you're ready for Stage 2 when:

1. **Visual Polish**: Your dashboard looks professional and engaging
2. **All tests pass**: Structure is ready for JavaScript integration  
3. **Interactive Feel**: Elements look clickable and responsive to hover
4. **Content Complete**: All songs display with proper information
5. **Layout Solid**: Three-section layout works smoothly

---

---

## 🚀 Stage 2: Adding JavaScript Magic

**Prerequisites**: Stage 1 complete with all tests passing ✅

Welcome to Stage 2! Now we'll bring your beautiful interface to life with JavaScript. You'll see how **"CSS creates possibilities, JavaScript activates them"** in action.

### Understanding the Approach

JavaScript will work with the HTML structure you built by:
- **Finding elements** using the IDs you created (`playBtn`, `currentTitle`, etc.)
- **Listening for clicks** on buttons and song items
- **Changing CSS classes** to trigger your existing styles (like adding `.playing` class)
- **Updating text content** to show current song information

The key insight: **JavaScript doesn't create the visual effects - it just tells your CSS when to show them!**

### Step 1: Get Your Starter Code

1. Copy the starter JavaScript file to `script.js`:

```bash
cp script-starter.js script.js
```

2. Open `script.js` in your editor and take a look around.

**What's already provided:**
- ✅ Song data array (update this if you changed your playlist!)
- ✅ State variables (`currentSongIndex`, `isPlaying`, `currentProgress`)
- ✅ DOM element references (finding all your HTML elements)
- ✅ Helper functions for updating displays and progress animation
- ✅ Previous/next navigation logic
- ✅ Bonus keyboard controls (Space = play/pause, arrows = next/prev)

**What you'll add:**
- 🎯 Event listeners to connect clicks to functions
- 🎯 Song selection logic 
- 🎯 Play/pause toggle logic

### Step 2: Connect Your Buttons (You Code This!)

Find the TODO comment in the `DOMContentLoaded` event listener. This is where you'll connect your HTML buttons to JavaScript functions.

**⌨️ Important: Type this code out rather than copy-pasting!** Typing helps you understand each piece and builds muscle memory.

Add these three event listeners inside the function:

```javascript
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
});
```

**What this does:**
- When someone clicks the play button → call `togglePlayPause()`
- When someone clicks prev/next → call `previousSong()` or `nextSong()`
- When someone clicks any song → call `selectSong()` with that song's number

**Test it:** Save and refresh your page. Try clicking the previous/next buttons. They should work now! (Play button won't work yet - we'll fix that next.)

### Step 3: Make Songs Selectable (You Code This!)

Find the first TODO comment for the `selectSong` function. This is the heart of your music player - it handles when someone clicks a song.

**⌨️ Remember: Type this out!** Feel how the logic flows as you write each line.

Add this function:

```javascript
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
```

**What this does:**
- Updates the `currentSongIndex` variable to track which song is selected
- Calls helper functions to update the "Now Playing" display and highlight the selected song
- If music is playing, starts playing the newly selected song

**Test it:** Click on different songs in your list. You should see:
- The "Now Playing" area updates with the song title and artist
- The clicked song gets highlighted with your `.playing` CSS styles
- Try clicking songs while "playing" (after we add the play button in the next step)

### Step 4: Add Play/Pause Control (You Code This!)

Find the TODO comment for the `togglePlayPause` function. This controls the main play button.

**⌨️ Keep typing!** This is the final piece that brings everything together.

Add this function:

```javascript
function togglePlayPause() {
    if (isPlaying) {
        pauseSong();
    } else {
        playCurrentSong();
    }
}
```

**What this does:**
- Checks if music is currently playing
- If playing → pause it
- If paused → start playing

The `playCurrentSong()` and `pauseSong()` functions are already provided - they handle updating the button icon, starting/stopping the progress bar, and updating displays.

**Test it:** Now everything should work!
- Click play → button changes to pause, progress bar starts moving
- Click pause → button changes to play, progress bar stops
- Click songs while playing → switches to the new song immediately
- Click next/prev → changes songs and keeps playing if you were playing

### Step 5: Customize Your Songs (Important!)

**If you changed the song list in your HTML**, update the `songs` array at the top of `script.js` to match. The array order must match your HTML song order.

For example, if your first song is "Thunderstruck" by AC/DC, make sure the first object in the array has:
```javascript
{
    title: "Thunderstruck",
    artist: "AC/DC", 
    duration: "4:52"
}
```

### Step 6: Test Everything!

Try all these interactions:
- ✅ Click any song → it becomes selected and shows in "Now Playing"
- ✅ Click play → button changes to pause, progress bar animates
- ✅ Click pause → button changes to play, animation stops
- ✅ Click next/prev → navigates through songs
- ✅ Progress bar fills → automatically goes to next song
- ✅ Click songs while playing → immediately switches songs
- ✅ Keyboard controls work (Space, left/right arrows)

### 🎉 You Did It!

**What you just learned:**
- How JavaScript **finds HTML elements** using IDs you created
- How **event listeners** connect user actions to code functions  
- How JavaScript **manipulates CSS classes** to trigger your visual styles
- How **state management** tracks what's currently happening (which song, playing/paused)
- How the **HTML + CSS + JavaScript relationship** works in real applications

**The Big Picture:**
Your CSS defined all the visual possibilities (colors, layouts, hover effects, playing states). JavaScript just decides *when* to show them. This is the power of separation of concerns - each technology does what it does best!

### 🚀 Going Further (Optional Challenges)

Want to add more features? Try these extensions:
- **Volume control**: Make the volume slider actually work
- **Shuffle mode**: Randomize the next song selection  
- **Repeat modes**: Single song repeat, playlist repeat
- **Real progress bar**: Click to jump to different parts of songs
- **Search/filter**: Add a search box to filter the song list

---

## 🆘 Need Help?

If you get stuck on Stage 1, you can check the `solution` branch to see one approach to the styling and structure. Remember, there are many valid ways to achieve the requirements - the solution is just one example!

**Remember**: Focus on creating something you're proud of. This is your chance to showcase everything you've learned about HTML and CSS while preparing for the JavaScript magic to come!
