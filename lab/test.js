const puppeteer = require("puppeteer");
const fs = require("fs");
const path = require("path");

// Test configuration
const TEST_URL = `file://${path.resolve("index.html")}`;

let browser, page;

// Setup and teardown
beforeAll(async () => {
  browser = await puppeteer.launch();
  page = await browser.newPage();
});

afterAll(async () => {
  await browser.close();
});

beforeEach(async () => {
  await page.goto(TEST_URL);
});

// Helper function to check if element exists with specific ID
async function elementExistsWithId(selector, id) {
  const element = await page.$(selector);
  if (!element) return false;
  const elementId = await page.evaluate(el => el.id, element);
  return elementId === id;
}

describe("Music Dashboard Structure Tests", () => {
  test("HTML file exists and is valid", () => {
    expect(fs.existsSync("index.html")).toBe(true);
    expect(fs.existsSync("style.css")).toBe(true);
  });

  test("Page loads successfully", async () => {
    const title = await page.title();
    expect(title).toBeTruthy();
  });

  // Essential structure for JavaScript integration
  describe("Required Elements for JavaScript", () => {
    test("Track list container exists with correct ID", async () => {
      const trackList = await page.$("#trackList");
      expect(trackList).toBeTruthy();
    });

    test("Has at least 6 song items with sequential IDs", async () => {
      for (let i = 0; i < 6; i++) {
        const songElement = await page.$(`#song-${i}`);
        expect(songElement).toBeTruthy();
      }
    });

    test("Each song item has required structure", async () => {
      const firstSong = await page.$("#song-0");
      expect(firstSong).toBeTruthy();

      // Check for basic song info structure
      const titleElement = await firstSong.$(".track-title");
      const artistElement = await firstSong.$(".track-artist");
      expect(titleElement).toBeTruthy();
      expect(artistElement).toBeTruthy();
    });

    test("Play button exists with correct ID", async () => {
      const playBtn = await elementExistsWithId("#playBtn", "playBtn");
      expect(playBtn).toBe(true);
    });

    test("Previous button exists with correct ID", async () => {
      const prevBtn = await elementExistsWithId("#prevBtn", "prevBtn");
      expect(prevBtn).toBe(true);
    });

    test("Next button exists with correct ID", async () => {
      const nextBtn = await elementExistsWithId("#nextBtn", "nextBtn");
      expect(nextBtn).toBe(true);
    });

    test("Current title display exists with correct ID", async () => {
      const currentTitle = await elementExistsWithId("#currentTitle", "currentTitle");
      expect(currentTitle).toBe(true);
    });

    test("Current artist display exists with correct ID", async () => {
      const currentArtist = await elementExistsWithId("#currentArtist", "currentArtist");
      expect(currentArtist).toBe(true);
    });

    test("Progress fill element exists with correct ID", async () => {
      const progressFill = await elementExistsWithId("#progressFill", "progressFill");
      expect(progressFill).toBe(true);
    });
  });

  // Visual completeness tests
  describe("Visual Completeness", () => {
    test("Has sidebar navigation area", async () => {
      const sidebar = await page.$(".sidebar");
      expect(sidebar).toBeTruthy();
    });

    test("Has main content area", async () => {
      const mainContent = await page.$(".main-content");
      expect(mainContent).toBeTruthy();
    });

    test("Has controls section at bottom", async () => {
      const controls = await page.$(".controls-section");
      expect(controls).toBeTruthy();
    });

    test("Songs display title and artist information", async () => {
      const firstTitle = await page.$eval("#song-0 .track-title", el => el.textContent.trim());
      const firstArtist = await page.$eval("#song-0 .track-artist", el => el.textContent.trim());

      expect(firstTitle.length).toBeGreaterThan(0);
      expect(firstArtist.length).toBeGreaterThan(0);
    });

    test("Control buttons are styled and visible", async () => {
      const playBtn = await page.$("#playBtn");
      const isVisible = await page.evaluate(el => {
        const style = window.getComputedStyle(el);
        return style.display !== "none" && style.visibility !== "hidden";
      }, playBtn);
      expect(isVisible).toBe(true);
    });
  });

  // CSS Integration Tests
  describe("CSS Styling Requirements", () => {
    test("CSS file loads successfully", async () => {
      const cssLoaded = await page.evaluate(() => {
        const links = document.querySelectorAll('link[rel="stylesheet"]');
        return links.length > 0;
      });
      expect(cssLoaded).toBe(true);
    });

    test("Track items have hover effects", async () => {
      const firstTrack = await page.$("#song-0");

      // Check if cursor changes on hover (indicates interactivity)
      const cursor = await page.evaluate(el => {
        return window.getComputedStyle(el).cursor;
      }, firstTrack);

      expect(cursor).toBe("pointer");
    });

    test("Layout uses CSS Grid or Flexbox for main structure", async () => {
      const musicPlayer = await page.$(".music-player");
      const display = await page.evaluate(el => {
        return window.getComputedStyle(el).display;
      }, musicPlayer);

      expect(["grid", "flex"].includes(display)).toBe(true);
    });
  });

  // Accessibility and User Experience
  describe("User Experience", () => {
    test("Buttons are properly sized and clickable", async () => {
      const playBtn = await page.$("#playBtn");
      const boundingBox = await playBtn.boundingBox();

      expect(boundingBox.width).toBeGreaterThan(20);
      expect(boundingBox.height).toBeGreaterThan(20);
    });

    test("Text content is readable (not empty)", async () => {
      const currentTitle = await page.$eval("#currentTitle", el => el.textContent.trim());
      const currentArtist = await page.$eval("#currentArtist", el => el.textContent.trim());

      expect(currentTitle.length).toBeGreaterThan(0);
      expect(currentArtist.length).toBeGreaterThan(0);
    });
  });
});

describe("JavaScript Integration Readiness", () => {
  test("All required song elements can be selected by JavaScript", async () => {
    const trackItems = await page.$$(".track-item");
    expect(trackItems.length).toBeGreaterThanOrEqual(6);

    // Verify each has an ID that JavaScript can use
    for (let i = 0; i < Math.min(trackItems.length, 8); i++) {
      const songId = await page.evaluate(
        (el, index) => {
          const song = document.querySelector(`#song-${index}`);
          return song ? song.id : null;
        },
        trackItems[i],
        i
      );
      expect(songId).toBe(`song-${i}`);
    }
  });

  test("Control elements are ready for event listeners", async () => {
    // Test that all control buttons exist and can receive events
    const controlIds = ["playBtn", "prevBtn", "nextBtn"];

    for (const id of controlIds) {
      const element = await page.$(`#${id}`);
      expect(element).toBeTruthy();

      // Verify element can receive click events
      const isClickable = await page.evaluate(id => {
        const el = document.getElementById(id);
        return el && typeof el.click === "function";
      }, id);
      expect(isClickable).toBe(true);
    }
  });

  test("Display elements are ready for content updates", async () => {
    // Test that text content can be updated by JavaScript
    const currentTitle = await page.$("#currentTitle");
    const currentArtist = await page.$("#currentArtist");

    expect(currentTitle).toBeTruthy();
    expect(currentArtist).toBeTruthy();

    // Verify they can have text content set
    const canUpdateText = await page.evaluate(() => {
      const title = document.getElementById("currentTitle");
      const artist = document.getElementById("currentArtist");

      const originalTitle = title.textContent;
      const originalArtist = artist.textContent;

      title.textContent = "Test Title";
      artist.textContent = "Test Artist";

      const updated = title.textContent === "Test Title" && artist.textContent === "Test Artist";

      // Restore original content
      title.textContent = originalTitle;
      artist.textContent = originalArtist;

      return updated;
    });

    expect(canUpdateText).toBe(true);
  });
});
