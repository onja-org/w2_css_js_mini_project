# Music Dashboard Lab

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

## 📋 Stage 1: Build Your Visual Dashboard

### Layout Overview

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

**Creative Freedom**: Make this dashboard your own! The layout structure above is required, but you have complete creative control over:

- **Colors & Theme**: Dark mode, light mode, colorful, monochrome - your choice!
- **Typography**: Font families, sizes, weights
- **Spacing**: Padding, margins, gap sizes  
- **Visual Effects**: Gradients, shadows, borders, animations
- **Hover States**: How elements respond to mouse interaction

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

## 🚀 Ready for Stage 2?

Once your visual foundation is complete and tests are passing, you'll move to Stage 2 where we add JavaScript to make everything interactive!

In Stage 2, you'll learn how JavaScript can:
- Make songs selectable by clicking
- Update the "Now Playing" display
- Control the play/pause button  
- Navigate between tracks
- Show visual feedback for the current song

The beautiful interface you're building now will become the canvas that JavaScript brings to life!

---

## 🛠️ Getting Started

1. Create your `index.html` and `style.css` files
2. Build the HTML structure with required IDs and classes
3. Style your dashboard with CSS
4. Test frequently with `npm test`
5. Refine until everything looks great and tests pass!

**Remember**: Focus on creating something you're proud of. This is your chance to showcase everything you've learned about HTML and CSS while preparing for the JavaScript magic to come!