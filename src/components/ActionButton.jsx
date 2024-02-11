import React, { useEffect, useState } from "react";
import { useTimetracker } from "../providers/TimeTracker.provider";
import { arrayOfObjects } from "../data";

const ActionButton = () => {
    const [buttonStyle, setButtonStyle] = useState("bg-col-primary");

    const { buttonState, setButtonState, isPlaying, setIsPlaying, hasStarted, setHasStarted, areSoundsLoaded } =
        useTimetracker();

    const handleStart = () => {
        if (!hasStarted) {
            // Check if the timer has not started yet
            if (areSoundsLoaded) {
                console.log("Start");
                setHasStarted(true); // Mark as started
                setIsPlaying(true); // Begin playing
                setButtonState("Pause"); // Change button to show "Pause"
            } else {
                console.log("SOUNDS ARE NOT LOADED YET");
            }
        } else {
            handlePlayPause(); // If already started, handle play/pause
        }
    };

    // Use `handleStart` for initial click and subsequent actions handled by `handlePlayPause`
    const handleClick = () => {
        if (buttonState === "Start") {
            handleStart();
        } else {
            handlePlayPause();
        }
    };

    const handlePlayPause = () => {
        setIsPlaying(!isPlaying);

        if (isPlaying) {
            const pauseSound = new Audio(`${process.env.PUBLIC_URL}/sounds/pause.mp3`);
            pauseSound.play().catch((error) => console.error("Error playing pause sound:", error));
            setButtonState("Resume");
        } else {
            const resumeSound = new Audio(`${process.env.PUBLIC_URL}/sounds/resume.mp3`);
            resumeSound.play().catch((error) => console.error("Error playing resume sound:", error));
            setButtonState("Pause");
        }
    };

    return (
        <div className="button-container">
            <button className={`button ${buttonStyle}`} onClick={handleClick}>
                {buttonState}
            </button>
        </div>
    );
};

export default ActionButton;
