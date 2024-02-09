import React, { createContext, useContext, useState } from "react";

const TimeTrackerContext = createContext();

export const TimeTrackerProvider = (props) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [hasStarted, setHasStarted] = useState(false);
    const [areSoundsLoaded, setAreSoundsLoaded] = useState(false);
    const [audioElements, setAudioElements] = useState([]);
    const [loopCounter, setLoopCounter] = useState(() => {
        const storedLoopCounter = localStorage.getItem("loopCounter");
        return storedLoopCounter ? parseInt(storedLoopCounter, 10) : 0;
    });
    return (
        <>
            <TimeTrackerContext.Provider
                value={{
                    currentIndex,
                    setCurrentIndex,
                    isPlaying,
                    setIsPlaying,
                    hasStarted,
                    setHasStarted,
                    areSoundsLoaded,
                    setAreSoundsLoaded,
                    audioElements,
                    setAudioElements,
                    loopCounter,
                    setLoopCounter,
                }}
            >
                {props.children}
            </TimeTrackerContext.Provider>
        </>
    );
};

export const useTimetracker = () => useContext(TimeTrackerContext);
