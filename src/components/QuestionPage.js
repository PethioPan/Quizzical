import React, {useEffect, useState} from "react";
import Question from "./Question";
import '../sass/questionPage.scss';
import {nanoid} from "nanoid";

export default function QuestionPage({data}) {
    const [gameOver, setGameOver] = useState(false);
    const [items, setItems] = useState([]);

    useEffect(() => {
        data.forEach((d, index) => {
            if (index < 5) {
                setItems(prevState => {
                    return [...prevState, {
                        id: nanoid(),
                        question: d.question,
                        choices: [...d.incorrect_answers, d.correct_answer],
                        answer: d.correct_answer,
                    }]
                })
            }
        });
        return () => {
            setItems([])
        }
    }, [data])

    function selectItem(event) {
        // let questions = Array.from(event.target.parentElement.children).map(item => item.innerText)
        let currentList = items.filter(item => {
            return item.choices.includes(event.target.innerText)
        })
        let questionClasses = Array.from(event.target.parentElement.children).map(item => item.classList.value)
        let containsSelected = questionClasses.some(item => {
            return item.includes("selected")
        })
        if (!containsSelected) {
            if (!event.target.classList.contains("selected")) {
                event.target.classList.add("selected")
                if (currentList[0].answer === event.target.innerText) {
                    event.target.classList.add('correct')
                }
            }
        } else {
            event.target.classList.remove("selected")
            event.target.classList.remove('correct')
        }
    }

    return (
        <main className="question-container">
            {
                items.map((item, index) => {
                    return (
                        <Question
                            key={item.id}
                            questionData={item}
                            selectItem={selectItem}
                        />
                    )
                })
            }
            {/*<h3>You Scored {3}/{5} </h3>*/}
            <button className="question-button">{gameOver ? "Play Again" : "Check Answers"}</button>
        </main>
    )
}