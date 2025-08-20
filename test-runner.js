const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

// Test cases to run
const testCases = [
    {
        name: 'Minimal but Correct',
        file: 'test-cases/test-case-1-minimal.html',
        expectation: 'Should pass - has all required elements'
    },
    {
        name: 'Missing Required IDs', 
        file: 'test-cases/test-case-2-missing-ids.html',
        expectation: 'Should fail - missing trackList ID, currentTitle ID, prevBtn ID'
    },
    {
        name: 'Creative Flexbox Layout',
        file: 'test-cases/test-case-3-flexbox.html', 
        expectation: 'Should pass - uses Flexbox instead of Grid but has all elements'
    },
    {
        name: 'Incomplete Controls',
        file: 'test-cases/test-case-4-incomplete.html',
        expectation: 'Should fail - missing control buttons and IDs'
    }
];

let browser, page;

async function runTestSuite(testFile, caseName) {
    const TEST_URL = `file://${path.resolve(testFile)}`;
    
    console.log(`\n🧪 Testing: ${caseName}`);
    console.log(`📁 File: ${testFile}`);
    console.log(`🔗 URL: ${TEST_URL}`);
    
    try {
        await page.goto(TEST_URL);
        
        const results = {
            passed: 0,
            failed: 0,
            errors: []
        };

        // Test 1: Basic file structure
        try {
            const title = await page.title();
            if (title) {
                console.log('✅ Page loads successfully');
                results.passed++;
            }
        } catch (error) {
            console.log('❌ Page failed to load');
            results.failed++;
            results.errors.push('Page load failed');
        }

        // Test 2: Track list container
        try {
            const trackList = await page.$('#trackList');
            if (trackList) {
                console.log('✅ Track list container exists with correct ID');
                results.passed++;
            } else {
                console.log('❌ Missing #trackList element');
                results.failed++;
                results.errors.push('Missing #trackList element');
            }
        } catch (error) {
            console.log('❌ Error checking track list');
            results.failed++;
            results.errors.push('Error checking #trackList');
        }

        // Test 3: Song items with sequential IDs
        let songTestsPassed = 0;
        for (let i = 0; i < 6; i++) {
            try {
                const songElement = await page.$(`#song-${i}`);
                if (songElement) {
                    songTestsPassed++;
                } else {
                    results.errors.push(`Missing #song-${i} element`);
                }
            } catch (error) {
                results.errors.push(`Error checking #song-${i}`);
            }
        }
        
        if (songTestsPassed >= 6) {
            console.log(`✅ Has ${songTestsPassed} song items with sequential IDs`);
            results.passed++;
        } else {
            console.log(`❌ Only found ${songTestsPassed}/6 required song items`);
            results.failed++;
        }

        // Test 4: Song structure (track-title and track-artist classes)
        try {
            const firstSong = await page.$('#song-0');
            if (firstSong) {
                const titleElement = await firstSong.$('.track-title');
                const artistElement = await firstSong.$('.track-artist');
                
                if (titleElement && artistElement) {
                    console.log('✅ Songs have required .track-title and .track-artist structure');
                    results.passed++;
                } else {
                    console.log('❌ Songs missing .track-title or .track-artist classes');
                    results.failed++;
                    results.errors.push('Songs missing required class structure');
                }
            }
        } catch (error) {
            console.log('❌ Error checking song structure');
            results.failed++;
            results.errors.push('Error checking song structure');
        }

        // Test 5: Control buttons
        const controlButtons = ['playBtn', 'prevBtn', 'nextBtn'];
        let controlButtonsPassed = 0;
        
        for (const buttonId of controlButtons) {
            try {
                const button = await page.$(`#${buttonId}`);
                if (button) {
                    controlButtonsPassed++;
                } else {
                    results.errors.push(`Missing #${buttonId} element`);
                }
            } catch (error) {
                results.errors.push(`Error checking #${buttonId}`);
            }
        }
        
        if (controlButtonsPassed === 3) {
            console.log('✅ All control buttons exist with correct IDs');
            results.passed++;
        } else {
            console.log(`❌ Only found ${controlButtonsPassed}/3 control buttons`);
            results.failed++;
        }

        // Test 6: Display elements
        const displayElements = ['currentTitle', 'currentArtist'];
        let displayElementsPassed = 0;
        
        for (const elementId of displayElements) {
            try {
                const element = await page.$(`#${elementId}`);
                if (element) {
                    displayElementsPassed++;
                } else {
                    results.errors.push(`Missing #${elementId} element`);
                }
            } catch (error) {
                results.errors.push(`Error checking #${elementId}`);
            }
        }
        
        if (displayElementsPassed === 2) {
            console.log('✅ Display elements exist with correct IDs');
            results.passed++;
        } else {
            console.log(`❌ Only found ${displayElementsPassed}/2 display elements`);
            results.failed++;
        }

        // Test 7: Progress fill element
        try {
            const progressFill = await page.$('#progressFill');
            if (progressFill) {
                console.log('✅ Progress fill element exists');
                results.passed++;
            } else {
                console.log('❌ Missing #progressFill element');
                results.failed++;
                results.errors.push('Missing #progressFill element');
            }
        } catch (error) {
            console.log('❌ Error checking progress fill');
            results.failed++;
            results.errors.push('Error checking #progressFill');
        }

        // Test 8: Layout approach (Grid or Flexbox)
        try {
            const musicPlayer = await page.$('.music-player');
            if (musicPlayer) {
                const display = await page.evaluate(el => {
                    return window.getComputedStyle(el).display;
                }, musicPlayer);
                
                if (['grid', 'flex'].includes(display)) {
                    console.log(`✅ Uses modern layout (${display})`);
                    results.passed++;
                } else {
                    console.log(`❌ Layout display is '${display}' (should be grid or flex)`);
                    results.failed++;
                    results.errors.push(`Unexpected layout display: ${display}`);
                }
            } else {
                console.log('❌ Missing .music-player container');
                results.failed++;
                results.errors.push('Missing .music-player container');
            }
        } catch (error) {
            console.log('❌ Error checking layout');
            results.failed++;
            results.errors.push('Error checking layout');
        }

        // Test 9: Required section classes
        const requiredSections = ['sidebar', 'main-content', 'controls-section'];
        let sectionsPassed = 0;
        
        for (const sectionClass of requiredSections) {
            try {
                const section = await page.$(`.${sectionClass}`);
                if (section) {
                    sectionsPassed++;
                } else {
                    results.errors.push(`Missing .${sectionClass} element`);
                }
            } catch (error) {
                results.errors.push(`Error checking .${sectionClass}`);
            }
        }
        
        if (sectionsPassed === 3) {
            console.log('✅ All required sections exist');
            results.passed++;
        } else {
            console.log(`❌ Only found ${sectionsPassed}/3 required sections`);
            results.failed++;
        }

        // Summary
        console.log(`\n📊 Results: ${results.passed} passed, ${results.failed} failed`);
        
        if (results.errors.length > 0) {
            console.log('🔍 Specific errors:');
            results.errors.forEach(error => console.log(`   • ${error}`));
        }
        
        return results;
        
    } catch (error) {
        console.log(`❌ Failed to test ${caseName}: ${error.message}`);
        return { passed: 0, failed: 1, errors: [error.message] };
    }
}

async function runAllTests() {
    console.log('🚀 Starting test suite validation...\n');
    
    browser = await puppeteer.launch();
    page = await browser.newPage();
    
    const overallResults = {
        totalPassed: 0,
        totalFailed: 0,
        caseResults: []
    };
    
    for (const testCase of testCases) {
        console.log('='.repeat(60));
        console.log(`Expected: ${testCase.expectation}`);
        
        const results = await runTestSuite(testCase.file, testCase.name);
        
        overallResults.totalPassed += results.passed;
        overallResults.totalFailed += results.failed;
        overallResults.caseResults.push({
            name: testCase.name,
            results: results,
            expectation: testCase.expectation
        });
        
        await new Promise(resolve => setTimeout(resolve, 1000)); // Brief pause between tests
    }
    
    await browser.close();
    
    // Final summary
    console.log('\n' + '='.repeat(60));
    console.log('🏁 FINAL SUMMARY');
    console.log('='.repeat(60));
    
    overallResults.caseResults.forEach(caseResult => {
        const status = caseResult.results.failed === 0 ? '✅ PASS' : '❌ FAIL';
        console.log(`${status} ${caseResult.name}: ${caseResult.results.passed}/${caseResult.results.passed + caseResult.results.failed} tests passed`);
    });
    
    console.log(`\nOverall: ${overallResults.totalPassed} passed, ${overallResults.totalFailed} failed`);
    console.log('\n🎯 Test suite appears to be working correctly if results match expectations!');
}

// Run the tests
runAllTests().catch(console.error);