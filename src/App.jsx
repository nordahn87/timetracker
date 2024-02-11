import { TimeTracker } from "./components/TimeTracker";
import { TimeTrackerProvider } from "./providers/TimeTracker.provider";
import { LoopCounterProvider } from "./providers/LoopCounter.provider";
import "../src/styles/style.css";

const App = () => {
    return (
        <>
            <TimeTrackerProvider>
                <LoopCounterProvider>
                    <TimeTracker />
                </LoopCounterProvider>
            </TimeTrackerProvider>
        </>
    );
};

export default App;
