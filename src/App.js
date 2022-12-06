import React, {useState} from "react";
import IntroPage from "./components/IntroPage";
import Questions from "./components/Questions";
import yellowBlob from "./assets/yellowblob.svg";
import blueBlob from "./assets/bluleblob.svg";
import './App.css';
function App() {
    const [newGame, setNewGame] = useState(true)

    function toggleNewGame() {
        setNewGame(prevGame => !prevGame)
    }

    return (
        <div className="App">
            <img className="yellow-blob" src={yellowBlob} alt="a yellow blob" />
            { newGame ? <IntroPage toggleGame={toggleNewGame}/> : <Questions />}
            <img className="blue-blob" src={blueBlob} alt="a blue blob" />
        </div>
  );
}

export default App;
