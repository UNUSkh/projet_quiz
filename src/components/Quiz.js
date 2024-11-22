import React, { useContext, useState } from "react";
import { context } from "./Startscreen";

function Quiz() {
    const [score, setScore] = useContext(context);
    //we still need the questions
    const questions = [
        // Questions sur Scrum
        {
            question: "Quelle cérémonie Scrum permet de définir les tâches du sprint à venir ?",
            options: ["Sprint Review", "Sprint Planning", "Daily Scrum", "Rétrospective de sprint"],
            id: "1",
        },
        {
            question: "Quel est le rôle principal du Product Owner dans une équipe Scrum ?",
            options: [
                "Éliminer les obstacles rencontrés par l'équipe",
                "Prioriser et gérer le Product Backlog",
                "Évaluer les performances de l'équipe",
                "Tester les livrables du sprint",
            ],
            id: "2",
        },
        {
            question: "Quel est le principal objectif de la Rétrospective de sprint ?",
            options: [
                "Planifier les tâches pour le sprint suivant",
                "Livrer l'incrément du produit",
                "Discuter des améliorations à apporter à l'équipe",
                "Créer un graphique burn-down",
            ],
            id: "3",
        },
    
        // Questions sur les Méthodes prédictives
        {
            question: "Quelle méthode suit un modèle strictement séquentiel de phases ?",
            options: ["Scrum", "Kanban", "Cycle en V", "Lean"],
            id: "4",
        },
        {
            question: "Dans une méthode prédictive, quelle est la principale difficulté lorsque les besoins changent fréquemment ?",
            options: [
                "Le manque de documentation",
                "Le coût élevé des changements",
                "L'absence de livraisons fréquentes",
                "La faible collaboration avec le client",
            ],
            id: "5",
        },
        {
            question: "Quel avantage offre une méthode prédictive dans des projets bien définis ?",
            options: [
                "Une grande flexibilité face aux changements",
                "Une planification détaillée et stable",
                "Des livraisons rapides et incrémentales",
                "Une collaboration constante avec le client",
            ],
            id: "6",
        },
    
        {
            question: "Quel principe clé de Kanban vise à limiter la quantité de travail en cours ?",
            options: ["Daily Limits", "Cycle Time", "WIP Limits", "Lead Time"],
            id: "7",
        },
        {
            question: "Quel outil visuel est le plus utilisé dans Kanban pour suivre les tâches ?",
            options: ["Scrum Board", "Kanban Board", "Burn-down Chart", "Flow Diagram"],
            id: "8",
        },
        {
            question: "Dans Kanban, qu'est-ce que le *Lead Time* mesure ?",
            options: [
                "Le temps nécessaire pour une tâche spécifique",
                "Le temps entre le début et la fin d'une tâche",
                "Le temps passé en réunion",
                "La durée restante pour compléter le projet",
            ],
            id: "9",
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
                                        checked={answers[q.id] === option} 
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
                <h3>10- Quels sont, selon vous, les inconvénients potentiels d'une approche Kanban ?</h3>
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
