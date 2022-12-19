import React, {useEffect, useState} from "react";
import Question from "./Question";
import '../sass/questionPage.scss'
export default function QuestionPage({ data }) {
    const [gameOver, setGameOver] = useState(false);
    // const [items, setItems] = useState([
    //     {
    //         question: "",
    //         choices: [],
    //         answer: ""
    //     }
    // ])
    // function toggleGameOver() {
    //     setGameOver(true)
    // }

    return(
        <main className="question-container">
            <Question />
            {/*<h3>You Scored {3}/{5} </h3>*/}
            <button className="question-button">{ gameOver ? "Play Again" : "Check Answers"}</button>
        </main>
    )
}