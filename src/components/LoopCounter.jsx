import React, { useEffect } from "react";
import { arrayOfObjects } from "../data";
import { useTimetracker } from "../providers/TimeTracker.provider";
import { useLoopCounter } from "../providers/LoopCounter.provider";

const LoopCounter = () => {
    const { setCurrentIndex, isPlaying, areSoundsLoaded } = useTimetracker();
    const { loopCounter, setLoopCounter } = useLoopCounter();

    const resetLoopCounter = () => {
        localStorage.removeItem("loopCounter");
        setLoopCounter(0);
    };

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

    return (
        <div className="loop-counter-container">
            <div className="loop-counter">
                Sets completed:
                <span className="loop-count">{loopCounter}</span>
            </div>

            {loopCounter > 0 && (
                <button className="btn-reset" onClick={resetLoopCounter}>
                    Reset sets
                </button>
            )}
        </div>
    );
};

export default LoopCounter;
