import React, {useEffect, useState} from "react";
import Question from "./Question";
import '../sass/questionPage.scss';
import { nanoid } from "nanoid";
import {HashLoader} from "react-spinners";
export default function QuestionPage({ data }) {
    const [gameOver, setGameOver] = useState(false);
    const [items, setItems] = useState([]);

    useEffect(() => {
        data.map(d => {
            if(items.length < 5) {
                return items.push({
                    id: nanoid(),
                    question: d.question,
                    choices: [...d.incorrect_answers, d.correct_answer],
                    answer: d.correct_answer,
                    selected: false
                })
            }
        });
        
        setItems(items)
    }, [])

    function selectItem(item) {
        const isEveryItemNotSelected = data.every(item => item.selected === false)

        if(isEveryItemNotSelected) {
            setItems(prevQuestion => (
                prevQuestion.map(prevItem => ({
                    ...prevItem,
                    selected: item.id === prevItem.id ? !prevItem.selected : prevItem.selected
                }))
            ));
        } else {
            setItems(prevQuesion => (
                prevQuesion.map(prevItem => ({
                    ...prevItem,
                    selected: prevItem.selected && item.id === prevItem.id ? !prevItem.selected : prevItem.selected
                }))
            ))
        }
    }

    return(
        <main className="question-container">
            {
                items.length === 5 ? items.map(item => {
                    return (
                            <Question
                                key={item.id}
                                selectItem={selectItem}
                                selected={item.selected}
                                question={item.question}
                                choices={item.choices}
                                answer={item.answer}
                            />
                    )
                }) : <HashLoader size={50} color="#bbc3ee" />
            }
            {/*<h3>You Scored {3}/{5} </h3>*/}
            <button className="question-button">{ gameOver ? "Play Again" : "Check Answers"}</button>
        </main>
    )
}