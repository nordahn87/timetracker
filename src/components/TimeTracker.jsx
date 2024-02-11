import React, { useState, useEffect } from "react";
import { arrayOfObjects } from "../data";
import { useTimetracker } from "../providers/TimeTracker.provider";
import ActionButton from "./ActionButton";
import LoopCounter from "./LoopCounter";
import { Loading } from "./Loading";

export const TimeTracker = () => {
    const [icon, setIcon] = useState();
    const {
        currentIndex,
        isPlaying,
        hasStarted,
        areSoundsLoaded,
        setAreSoundsLoaded,
        audioElements,
        setAudioElements,
        buttonState,
    } = useTimetracker();

    useEffect(() => {
        arrayOfObjects.map((obj) => {
            if (obj.type === "text") {
                console.log("text"); // "hund" will be logged for each object that has a truthy "text" property
            }
            return null;
        });
    }, []);

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
        if (buttonState === "Start") {
            setIcon("fas fa-circle-play");
        } else if (buttonState === "Pause") {
            setIcon("fas fa-stopwatch");
        } else if (buttonState === "Resume") {
            setIcon("fas fa-circle-pause");
        }
     
    }, [buttonState]);

    useEffect(() => {
        if (isPlaying && areSoundsLoaded && currentIndex < arrayOfObjects.length) {
            const currentSound = audioElements[currentIndex];
            if (currentSound) {
                currentSound.play().catch((error) => console.error("Error playing sound:", error));
            }
        }
    }, [currentIndex, isPlaying, areSoundsLoaded, audioElements]);

    const currentDisplay = arrayOfObjects[currentIndex]?.display;
    const currentType = arrayOfObjects[currentIndex]?.type;

    console.log(`Icon class to be applied: ${icon}`);

    return (
        <main className="main">
            <div className="symbol">
                <i className={`icon-status fa-2xl ${icon}`}></i>
            </div>

            {!areSoundsLoaded ? (
                <Loading />
            ) : (
                <>
                    <div className="test">
                        <span className="counter-container">
                            {!isPlaying && !hasStarted ? (
                                <span className="hest">Press start</span>
                            ) : (
                                <span className={`hund ${currentType === "text" ? "text-style" : "he"}`}>
                                    {currentDisplay}
                                </span>
                            )}
                        </span>
                    </div>
                    <ActionButton />
                    <LoopCounter />
                </>
            )}
        </main>
    );
};
