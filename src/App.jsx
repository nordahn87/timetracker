import React, { useState, useEffect } from "react";
import { arrayOfObjects } from "./data";

const App = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [areSoundsLoaded, setAreSoundsLoaded] = useState(false);
    const [audioElements, setAudioElements] = useState([]);
    const [loopCounter, setLoopCounter] = useState(0); // Loop counter state

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
                        setLoopCounter((prevCounter) => prevCounter + 1); // Increment the loop counter
                        return 0; // Reset the index to start from the beginning
                    }

                    if (nextIndex < 16) {
                        console.log("blue");
                    } else if (nextIndex >= 16) {
                        console.log("green");
                    }

                    return nextIndex;
                });
            }, 1000);
        }

        return () => clearInterval(timer);
    }, [isPlaying, areSoundsLoaded]);

    const handlePlayPause = () => {
        const resumeSound = new Audio(process.env.PUBLIC_URL + "/sounds/resume.mp3");
        const pauseSound = new Audio(process.env.PUBLIC_URL + "/sounds/pause.mp3");

        setIsPlaying((prevState) => !prevState);
        if (isPlaying) {
            pauseSound.play().catch((error) => console.error("Error playing pause sound:", error));
            console.log("Im paused");
        } else {
            resumeSound.play().catch((error) => console.error("Error playing pause sound:", error));
        }
    };

    const currentDisplay = arrayOfObjects[currentIndex]?.display;

    return (
        <div>
            <p>{currentDisplay}</p>
            <div style={{ margin: "10px", padding: "10px", border: "1px solid black" }}>
                Loop Counter: {loopCounter}
            </div>
            {isPlaying ? (
                <button onClick={handlePlayPause}>Pause</button>
            ) : (
                <button onClick={handlePlayPause} disabled={!areSoundsLoaded}>
                    Play
                </button>
            )}
        </div>
    );
};

export default App;
