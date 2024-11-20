import React, { useContext, useState } from "react";
import { context } from "./Startscreen";

function Quiz() {
    const [score, setScore] = useContext(context);
    //we still need the questions
    const questions = [
        {
            question: "Quelle cérémonie Scrum permet d'inspecter et d'adapter le sprint ?",
            options: ["Sprint Review", "Daily Scrum", "Sprint Planning", "Rétrospective de sprint"],
            id: "1",
        },
        {
            question: "Quel artefact Scrum liste tout le travail nécessaire pour atteindre l'objectif du produit ?",
            options: ["Sprint Backlog", "Product Backlog", "Definition of Done", "Burn-down Chart"],
            id: "2",
        },
        {
            question: "Que signifie la vélocité dans Scrum ?",
            options: [
                "La rapidité des développeurs",
                "Le nombre de story points complétés dans un sprint",
                "Le temps nécessaire pour une tâche",
                "La durée du sprint",
            ],
            id: "3",
        },
        
    ];

    const [answers, setAnswers] = useState({});
    const [textareaAnswered, setTextareaAnswered] = useState(false); //  textarea state
    const [inputValue, setInputValue] = useState("");

    const handleInputChange = (e) => {
        const value = e.target.value;
        setInputValue(value);

        e.target.style.height = "auto";
        e.target.style.height = `${e.target.scrollHeight}px`;

        //only update score if the textareaAnswered state change
        if (value.trim() && !textareaAnswered) {
            setScore((prevScore) => prevScore + 1);
            setTextareaAnswered(true);
        } else if (!value.trim() && textareaAnswered) {
            setScore((prevScore) => prevScore - 1);
            setTextareaAnswered(false);
        }
    };

    const handleRadioChange = (questionId, option) => {
        setAnswers((prevAnswers) => {
            const updatedAnswers = { ...prevAnswers, [questionId]: option };
            if(textareaAnswered)
            setScore(Object.keys(updatedAnswers).length+1); 
        else setScore(Object.keys(updatedAnswers).length);
            return updatedAnswers;
        });
    };

    return (
        <div className="quiz-container">
            {questions.map((q) => (
                <div key={q.id} className="quiz-question">
                    <h3>
                        {q.id}- {q.question}
                    </h3>
                    <div className="quiz-options">
                        {q.options.map((option, index) => (
                            <div key={index} className="option">
                                <label>
                                    <input
                                    className="radio"
                                        type="radio" 
                                        name={`question-${q.id}`} 
                                        value={option}
                                        checked={answers[q.id] === option} // Check if the option is selected
                                        onChange={() => handleRadioChange(q.id, option)}
                                    />
                                    {option}
                                </label>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
            <div style={{ width: "100%", padding: "10px" }}>
                <h3>13- Quels sont, selon vous, les inconvénients potentiels d'une approche Kanban ?</h3>
                <textarea
                    value={inputValue}
                    onChange={handleInputChange}
                    style={{
                        width: "100%",
                        minHeight: "40px",
                        maxHeight: "80px",
                        overflowY: "auto",
                        padding: "10px",
                        marginTop:"10px",
                        boxSizing: "border-box",
                        resize: "none",
                    }}
                />
            </div>
        </div>
    );
}

export default Quiz;
