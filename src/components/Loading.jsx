import React, { useState, useEffect } from "react";
import { arrayOfObjects } from "../data";
import { useTimetracker } from "../providers/TimeTracker.provider";
import ActionButton from "./ActionButton";
import LoopCounter from "./LoopCounter";

export const Loading = () => {
    return (
        <div className="loading-screen bg-col-dark-grey">
            <i className="rotating-icon col-primary fa-solid fa-2xl fa-spinner"></i>
        </div>
    );
};
