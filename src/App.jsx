import { useEffect } from "react";
import "./css/App.css";

function App({ setBoard, winner, board, calculateWinner, player, setPlayer, players }) {

  const { ai, human } = players;

  useEffect(() => {
    if (player === 'ai' && calculateWinner(board)[0] === false) {
      const newBoard = [...board];
      newBoard[bestMove(newBoard)] = ai;
      setPlayer('human');
      setBoard(newBoard);
    }
  }, [board]);

  const scores = {
    [human]: -1,
    [ai]: 1,
    tie: 0,
  };

  const minimax = (calcboard, depth, alpha, beta, isMaximizing) => {
    let result = calculateWinner(calcboard)[0];
    if (result !== false) {
      return scores[result];
    } else if (isMaximizing) {
      let bestScore = -Infinity;
      for (let x in calcboard) {
        if (calcboard[x] === "") {
          calcboard[x] = ai;
          let score = minimax(calcboard, depth + 1, alpha, beta, false);
          calcboard[x] = "";
          bestScore = Math.max(score, bestScore);
          alpha = Math.max(alpha, score)
          if (beta <= alpha) break;
        }
      }
      return bestScore;
    } else {
      let bestScore = Infinity;
      for (let x in calcboard) {
        if (calcboard[x] === "") {
          calcboard[x] = human;
          let score = minimax(calcboard, depth + 1, alpha, beta, true);
          calcboard[x] = "";
          bestScore = Math.min(score, bestScore);
          beta = Math.min(beta, score)
          if (beta <= alpha) break;
        }
      }
      return bestScore;
    }
  };

  const bestMove = (newBoard) => {
    let bestScore = -Infinity;
    let bestMove;
    for (let x in newBoard) {
      if (newBoard[x] === "") {
        newBoard[x] = ai;
        let score = minimax(newBoard, 0, -Infinity, Infinity, false);
        newBoard[x] = "";
        if (score > bestScore) {
          bestScore = score;
          bestMove = x;
        }
      }
    }
    return bestMove;
  };

  const playerValue = (id) => {
    if (winner !== "") return;
    else if (board[id - 1] !== "") return;
    else if (player === "human") {
      const newBoard = [...board];
      newBoard[id - 1] = human;
      setPlayer("ai");
      setBoard(newBoard);
    }
  };

  return (
    <>
      <button className="button" onClick={() => playerValue(1)}>{board[0]}</button>
      <button className="button" onClick={() => playerValue(2)}>{board[1]}</button>
      <button className="button" onClick={() => playerValue(3)}>{board[2]}</button>
      <button className="button" onClick={() => playerValue(4)}>{board[3]}</button>
      <button className="button" onClick={() => playerValue(5)}>{board[4]}</button>
      <button className="button" onClick={() => playerValue(6)}>{board[5]}</button>
      <button className="button" onClick={() => playerValue(7)}>{board[6]}</button>
      <button className="button" onClick={() => playerValue(8)}>{board[7]}</button>
      <button className="button" onClick={() => playerValue(9)}>{board[8]}</button>
    </>
  );
}

export default App;