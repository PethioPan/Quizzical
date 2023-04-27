import React from "react";
import '../sass/question.scss';

export default function Question({selectItem, question, choices, answer, selected}) {
    function decodeHTMLEntity(str) {

        let txt = new DOMParser().parseFromString(str, "text/html");

        return txt.documentElement.textContent;

    }
    return (
        <div className="question">
            <h3>{decodeHTMLEntity(question)}</h3>
            <div className="answer-container">
                <div className="answer-section">
                    {
                        choices.map((choice, index) => (
                            <button
                                key={index}
                                className={`answer-button ${selected ? "selected" : ""}`}
                                onClick={selectItem}>
                                {decodeHTMLEntity(choice)}
                            </button>
                        ))
                    }
                </div>
                <div className="horizontal-line"/>
            </div>
        </div>
    )
}