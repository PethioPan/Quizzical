import React, {useEffect, useState} from "react";
import IntroPage from "./components/IntroPage";
import QuestionPage from "./components/QuestionPage";
import yellowBlob from "./assets/yellowblob.svg";
import blueBlob from "./assets/bluleblob.svg";
import './sass/app.scss';

function App() {
    const [newGame, setNewGame] = useState(true)
    const [rawData, setRawData] = useState([])
    const apiURL = "https://opentdb.com/api.php?amount=5";

    useEffect(() => {
        const controller = new AbortController()
        fetch(apiURL,
            {
                signal: controller.signal,
            })
            .then(response => response.json())
            .then(data => setRawData(data.results))
            .catch(e => console.log('aborted fetch call'))
            .catch(e => console.error(e))
        return () => controller.abort();
    }, [])

    function toggleNewGame() {
        setNewGame(prevGame => !prevGame)
    }

    return (
        <div className="App">
            <img className="yellow-blob" src={yellowBlob} alt="a yellow blob"/>
            {
                newGame ?
                    <IntroPage toggleNewGame={toggleNewGame} data={rawData}/> :
                    <QuestionPage toggleNewGame={toggleNewGame} data={rawData}/>
            }
            <img className="blue-blob" src={blueBlob} alt="a blue blob"/>
        </div>
    );
}

export default App;
