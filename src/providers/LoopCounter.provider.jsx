import React, { createContext, useContext, useState } from "react";

const LoopCounterContext = createContext();

export const LoopCounterProvider = (props) => {
    const [loopCounter, setLoopCounter] = useState(() => {
        const storedLoopCounter = localStorage.getItem("loopCounter");
        return storedLoopCounter ? parseInt(storedLoopCounter, 10) : 0;
    });
    return (
        <>
            <LoopCounterContext.Provider
                value={{
                    loopCounter,
                    setLoopCounter,
                }}
            >
                {props.children}
            </LoopCounterContext.Provider>
        </>
    );
};

export const useLoopCounter = () => useContext(LoopCounterContext);
