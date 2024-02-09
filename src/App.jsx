import TimeTracker from "./components/TimeTracker";
import { TimeTrackerProvider } from "./providers/TimeTracker.provider";
import "../src/styles/style.css";

const App = () => {
    return (
        <>
            <TimeTrackerProvider>
                <TimeTracker />
            </TimeTrackerProvider>
        </>
    );
};

export default App;
