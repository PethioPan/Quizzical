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
        const getData = async (url) => {
            const response = await fetch(url)
            const data = await response.json();
            return data.results;
        }

        getData(apiURL).then((result) => {
            setRawData(result)
        });

        return () => {
            setRawData([])
        }
    }, [])

    function toggleNewGame() {
        setNewGame(prevGame => !prevGame)
    }

    return (
        <div className="App">
            <img className="yellow-blob" src={yellowBlob} alt="a yellow blob" />
            {
                newGame ?
                    <IntroPage toggleGame={toggleNewGame} data={rawData} /> :
                    <QuestionPage data={rawData} />
            }
            <img className="blue-blob" src={blueBlob} alt="a blue blob" />
        </div>
  );
}
export default App;