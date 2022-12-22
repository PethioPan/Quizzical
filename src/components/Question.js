import React from "react";
import '../sass/question.scss';

export default function Question({selectItem, question, choices, answer, selected}) {

    return (
        <div className="question">
            <h3>{question}</h3>
            <div className="answer-container">
                <div>
                    {
                        choices.map((choice, index) => (
                            <button
                                key={index}
                                className={`answer-button ${selected ? "selected" : ""}`}
                                onClick={selectItem}>
                                {choice}
                            </button>
                        ))
                    }
                </div>
                <div className="horizontal-line"/>
            </div>
        </div>
    )
}