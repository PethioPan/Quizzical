import React, {useMemo} from "react";
import '../sass/question.scss';

export default function Question({selectItem, questionData}) {

    function decodeHTMLEntity(str) {
        let txt = new DOMParser().parseFromString(str, "text/html");
        return txt.documentElement.textContent;
    }



    const randomizedChoices = useMemo(() => {
        function generateRandomChoices(choicesArray) {
            let randomChoices = []
            while (randomChoices.length < choicesArray.length) {
                let randomNumbers = Math.floor(Math.random() * choicesArray.length)
                if (randomChoices.indexOf(choicesArray[randomNumbers]) === -1) randomChoices.push(choicesArray[randomNumbers]);
            }
            return randomChoices
        }
        return generateRandomChoices(questionData.choices);
    }, [questionData.choices]);

    return (
        <div className="question">
            <h3>{decodeHTMLEntity(questionData.question)}</h3>
            <div className="answer-container">
                <div className="answer-section">
                    {
                        randomizedChoices.map((choice, index) => (
                            <button
                                key={index}
                                className={`answer-button`}
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