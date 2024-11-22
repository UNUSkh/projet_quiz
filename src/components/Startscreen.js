import { createContext, useState } from "react";
import Quiz from "./Quiz";
export const context = createContext();
function StartScreen() {
    const [score, setscore] = useState(0);
    return (
        <context.Provider value={[score,setscore]}>
            <div className="start">

                <h2>Welcome to The Agility Quiz!</h2>
                <div className="score"><p>Réponses: {score}/10</p></div>

                <Quiz></Quiz>
            </div>
        </context.Provider>
    );
}

export default StartScreen;