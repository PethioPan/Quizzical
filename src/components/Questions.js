import React, {useState} from "react";
import Question from "./Question";
export default function Questions() {
    const [gameOver, setGameOver] = useState(false)

    function toggleGameOver() {
        setGameOver(prevGame => !prevGame)
    }

    return(
        <main className="question-container">
            <Question />
            <Question />
            <Question />
            <Question />
            <Question />
            {/*<h3>You Scored {3}/{5} </h3>*/}
            <button className="question-container-button" onClick={
                () => {

                }
            }
            >{ gameOver ? "Play Again" : "Check Answers"}</button>
        </main>
    )
}