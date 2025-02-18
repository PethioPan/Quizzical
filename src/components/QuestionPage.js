import React, {useEffect, useState} from "react";
import Question from "./Question";
import {nanoid} from "nanoid";
import JSConfetti from 'js-confetti'
import '../sass/questionPage.scss';

export default function QuestionPage({toggleNewGame, data}) {
    const [gameOver, setGameOver] = useState(false);
    const [items, setItems] = useState([]);
    const [correctCount, setCorrectCount] = useState(0);
    const jsConfetti = new JSConfetti()

    useEffect(() => {
        data.forEach((d, index) => {
            if (index < 5) {
                setItems(prevState => {
                    return [...prevState, {
                        id: nanoid(),
                        question: decodeHTMLEntity(d.question),
                        choices: d.incorrect_answers.map(answer => decodeHTMLEntity(answer)).concat(decodeHTMLEntity(d.correct_answer)),
                        answer: decodeHTMLEntity(d.correct_answer),
                    }]
                })
            }
        });
        return () => {
            setItems([])
        }
    }, [data])

    function decodeHTMLEntity(str) {
        let txt = new DOMParser().parseFromString(str, "text/html");
        return txt.documentElement.textContent;
    }

    function selectItem(event) {
        const selectedText = decodeHTMLEntity(event.target.innerText);
        const currentList = items.filter(item => {
            return item.choices.some(choice => decodeHTMLEntity(choice).toLowerCase() === selectedText.toLocaleLowerCase())
        });
        if (currentList.length === 0) {
            console.error("Could not find matching question");
            return;
        }

        const questionClasses = Array.from(event.target.parentElement.children).map(item => item.classList.value);

//        let questionClasses = Array.from(event.target.parentElement.children).map(item => item.classList.value)
//        const containsSelected = questionClasses.some(item => {
//            return item.includes("selected")
//        })
        const containsSelected = questionClasses.some(item => item.includes("selected"));

        if (containsSelected) {
            event.target.classList.remove("selected")
            if (event.target.classList.contains("correct")) {
                event.target.classList.remove("correct")
                setCorrectCount(prevState => {
                    if (prevState >= correctCount) {
                        return prevState - 1;
                    } else {
                        return correctCount
                    }
                })
            }

        } else {
            event.target.classList.add("selected")
            if (decodeHTMLEntity(currentList[0].answer) === selectedText) {
                event.target.classList.add("correct")
                setCorrectCount(prevState => prevState + 1)
            }
        }
    }

    function checkAnswers() {
        setGameOver(true)
        if (correctCount >= 3) {
            jsConfetti.addConfetti().then(() => console.log("Good Game"))
        }
    }

    function playAgain() {
        window.location.reload()
        toggleNewGame()
    }

    return (
        <main className="question-container">
            {
                items.map((item) => {
                    return (
                        <Question
                            key={item.id}
                            questionData={item}
                            selectItem={selectItem}
                        />
                    )
                })
            }
            {gameOver ? <h3>You Scored {correctCount}/{5} </h3> : <></>}
            {gameOver ? <button className="question-button" onClick={playAgain}>Play Again?</button> :
                <button className="question-button" onClick={checkAnswers}>Check Answers</button>}
        </main>
    )
}