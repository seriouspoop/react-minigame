import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import "./css/index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

const Index = () => {
  const [board, setBoard] = useState(Array(9).fill(""));
  const [winner, setWinner] = useState("");
  const [player, setPlayer] = useState("human");
  const [players, setPlayers] = useState({ ai: "O", human: "X" });

  useEffect(() => {
    if (calculateWinner(board)[0]) {
      setWinner(calculateWinner(board)[0]);
    }
  }, [board]);

  const calculateWinner = (squares) => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[b] === squares[c]
      ) {
        return [squares[a], a, b, c];
      }
    }
    if (!squares.includes("")) {
      return ["tie"];
    }
    return [false];
  };

  const restart = () => {
    setBoard(Array(9).fill(""));
    setWinner("");
    if (players.ai === 'O') {
      setPlayer('human')
    } else {
      setPlayer('ai')
    }
  };

  const switchPlayer = () => {
    if (players['human'] === "X") {
      setPlayers({ ai: "X", human: "O" });
      setPlayer("ai");
    } else if (players['human'] === "O") {
      setPlayers({ ai: "O", human: "X" });
      setPlayer("human");
    }
    setBoard(Array(9).fill(""));
    setWinner("");
  };

  return (
    <div className="container">
      <div>
        <div className="board">
          <App
            setBoard={setBoard}
            winner={winner}
            board={board}
            calculateWinner={calculateWinner}
            player={player}
            setPlayer={setPlayer}
            players={players}
          />
        </div>
        <div className="result">
          <h2>
            {winner !== "" && winner !== "tie" ? `WINNER IS ${winner}` : ""}
            {winner === "tie" ? `IT'S A TIE` : ""}
          </h2>
          <div className="fnc">
            {winner !== "" && (
              <button className="resetbutton" onClick={() => restart()}>
                RESTART
              </button>
            )}
            {winner !== "" && (
              <button className="switchbutton" onClick={() => switchPlayer()}>
                PLAY AS {players["ai"]}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

ReactDOM.render(
  <React.StrictMode>
    <Index />
  </React.StrictMode>,
  document.getElementById("root")
);

reportWebVitals();