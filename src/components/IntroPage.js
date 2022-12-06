import React from "react";
export default function IntroPage(props) {
    return(
        <div className="intro-page">
            <h1>Quizzical</h1>
            <p>A generic trivia game</p>
            <button className="start-quiz-button" onClick={props.toggleGame}>Start Quiz</button>
        </div>
    )
}