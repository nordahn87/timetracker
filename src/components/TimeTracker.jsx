import React, { useState, useEffect } from "react";
import { arrayOfObjects } from "../data";

const TimeTracker = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [hasStarted, setHasStarted] = useState(false); // New state to track if play has been initiated
    const [areSoundsLoaded, setAreSoundsLoaded] = useState(false);
    const [audioElements, setAudioElements] = useState([]);
    const [loopCounter, setLoopCounter] = useState(() => {
        // Attempt to retrieve the loop counter value from local storage
        const storedLoopCounter = localStorage.getItem("loopCounter");

        // If the value exists in local storage, parse it to an integer and use it; otherwise, default to 0
        return storedLoopCounter ? parseInt(storedLoopCounter, 10) : 0;
    });

    const resetLoopCounter = () => {
        localStorage.removeItem("loopCounter");
        setLoopCounter(0);
    };

    useEffect(() => {
        const loadedAudioElements = arrayOfObjects.map((obj) => {
            if (obj.sound) {
                const audio = new Audio(obj.sound);
                audio.load();
                return audio;
            }
            return null;
        });

        Promise.all(
            loadedAudioElements.map((audio) => {
                if (audio) {
                    return new Promise((resolve) => {
                        audio.onloadedmetadata = () => resolve();
                    });
                }
                return Promise.resolve();
            }),
        )
            .then(() => {
                setAreSoundsLoaded(true);
                setAudioElements(loadedAudioElements);
            })
            .catch((error) => console.error("Error loading audio:", error));
    }, []);

    useEffect(() => {
        if (isPlaying && areSoundsLoaded && currentIndex < arrayOfObjects.length) {
            const currentSound = audioElements[currentIndex];
            if (currentSound) {
                currentSound.play().catch((error) => console.error("Error playing sound:", error));
            }
        }
    }, [currentIndex, isPlaying, areSoundsLoaded, audioElements]);

    useEffect(() => {
        let timer;
        if (isPlaying && areSoundsLoaded) {
            timer = setInterval(() => {
                setCurrentIndex((prevIndex) => {
                    const nextIndex = prevIndex + 1;

                    if (nextIndex >= arrayOfObjects.length) {
                        setLoopCounter((prevCounter) => {
                            // Increment the loop counter
                            const newCounter = prevCounter + 1;

                            // Save the new counter value to local storage
                            localStorage.setItem("loopCounter", newCounter.toString());

                            return newCounter; // Return the updated loop counter
                        });

                        return 0; // Reset the index to start from the beginning
                    }

                    return nextIndex; // Return the updated index
                });
            }, 1000);
        }

        // Cleanup function to clear the interval when component unmounts or dependencies change
        return () => clearInterval(timer);
    }, [isPlaying, areSoundsLoaded]); // Dependency array

    const handlePlayPause = () => {
        setHasStarted(true); // Set hasStarted to true once the button is clicked

        setIsPlaying(!isPlaying); // Toggle the playing state

        if (isPlaying) {
            // If currently playing, play the pause sound
            const pauseSound = new Audio(process.env.PUBLIC_URL + "/sounds/pause.mp3");
            pauseSound.play().catch((error) => console.error("Error playing pause sound:", error));
            console.log("I'm paused");
        } else if (hasStarted) {
            // If resuming from pause, play the resume sound
            const resumeSound = new Audio(process.env.PUBLIC_URL + "/sounds/resume.mp3");
            resumeSound.play().catch((error) => console.error("Error playing resume sound:", error));
        }
        // Note: No sound is played when initially starting the loop, as per the updated requirement
    };

    const currentDisplay = arrayOfObjects[currentIndex]?.display;

    return (
        <div>
            <div className="counter-container">
                {!isPlaying && !hasStarted ? <p>Press start</p> : <p>{currentDisplay}</p>}
            </div>

            {!hasStarted ? (
                <button className="button" onClick={handlePlayPause} disabled={!areSoundsLoaded}>
                    Start
                </button>
            ) : isPlaying ? (
                <button className="button" onClick={handlePlayPause}>
                    Pause
                </button>
            ) : (
                <button className="button" onClick={handlePlayPause} disabled={!areSoundsLoaded}>
                    Resume
                </button>
            )}

            <div className="loop-counter-container">
                <div>Loop Counter</div>
                {loopCounter}
                {loopCounter > 0 && (
                    <button className="reset-button" onClick={resetLoopCounter}>
                        Reset loop counter
                    </button>
                )}
            </div>
        </div>
    );
};

export default TimeTracker;
