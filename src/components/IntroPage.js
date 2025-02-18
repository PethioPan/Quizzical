import React from "react";
import { HashLoader } from "react-spinners";
import '../sass/intropage.scss';
export default function IntroPage({toggleNewGame, data}) {
    return(
        <div className="intro-page">
            <h1>Quizzical</h1>
            <p>A generic trivia game</p>
            <button className={`start-quiz-button ${data?.length !== 0 ? "" : "disabled"}`} onClick={toggleNewGame} disabled={!data?.length}>
                {
                    data?.length ? "Start Quiz" : <HashLoader size={40} color="#bbc3ee" />
                }
            </button>
        </div>
    )
}