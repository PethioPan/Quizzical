import React, {useState} from "react";

export default function Question(props) {

    const [questionData, setQuestionData] = useState([
        {
            id: 1,
            selected: false,
            text: "Adios"
        },
        {
            id: 2,
            selected: false,
            text: "Hola"
        },
        {
            id: 3,
            selected: false,
            text: "Au Revoir"
        },
        {
            id: 4,
            selected: false,
            text: "Salir"
        }
    ])

    function selectItem(item) {
        const isEveryItemNotSelected = questionData.every(item => item.selected === false)

        if(isEveryItemNotSelected) {
            setQuestionData(prevQuestion => (
                prevQuestion.map(prevItem => ({
                    ...prevItem,
                    selected: item.id === prevItem.id ? !prevItem.selected : prevItem.selected
                }))
            ));
        } else {
            setQuestionData(prevQuesion => (
                prevQuesion.map(prevItem => ({
                    ...prevItem,
                    selected: prevItem.selected && item.id === prevItem.id ? !prevItem.selected : prevItem.selected
                }))
            ))
        }
    }

    return(
        <div className="question">
            <h3>How would one say goodbye in Spanish?</h3>
            <div className="answer-container">
                <div>
                    {
                        questionData.map((item => {
                            return <button
                                key={item.id}
                                className={`answer ${item.selected ? "selected" : ""}`}
                                onClick={() => selectItem(item)}
                            >{item.text}</button>
                        }))
                    }
                </div>
                <div className="horizontal-line" />
            </div>
        </div>
    )
}