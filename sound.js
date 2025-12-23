// sound.js - Dedicated Sound Manager (Upgraded)

// ---------------------------------------------------------
// UPGRADE: Using a Wikimedia Commons URL (Open Source & Reliable)
// This file is a "Cash Register / Ka-Ching" sound
// ---------------------------------------------------------
const SOUND_URL = "https://pixabay.com/sound-effects/cash-register-kaching-376867/";
// ---------------------------------------------------------

// Create the audio object once (Singleton pattern)
const audioObject = new Audio(SOUND_URL);
audioObject.volume = 0.6;

export function playSuccessSound() {
    console.log("🎵 Sound Manager: Attempting to play...");

    // 1. Check if the audio is ready
    if (audioObject.readyState === 0) {
        console.warn("🎵 Sound Manager: Audio file is still loading...");
    }

    // 2. Reset time to 0 so it can play rapidly
    audioObject.currentTime = 0;

    // 3. Play with specific promise handling
    const playPromise = audioObject.play();

    if (playPromise !== undefined) {
        playPromise
            .then(() => {
                console.log("🎵 Sound Manager: Success! Audio is playing.");
            })
            .catch(error => {
                console.error("🎵 Sound Manager: Playback failed.", error);
                // Common Fix: Browsers block audio if the user hasn't clicked anything yet.
                // Since this is called on a button click, it should work.
            });
    }
}