import "./App.css";
import Board from "./components/Board";
import { useState } from "react";

export default function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const [isAscending, setIsAscending] = useState(true);
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];

  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
  }

  const moves = history.map((squares, move) => {
    let description;
    if (move > 0) {
      description = "Go to move #" + move;
    } else {
      description = "Go to game start";
    }
    return move === currentMove ? (
      <li key={move}>
        <b>You are at move #{move}</b>
      </li>
    ) : (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>
          <b>{description}</b>
        </button>
      </li>
    );
  });

  const order = isAscending ? "Sort Descending" : "Sort Ascending";

  function sortList() {
    setIsAscending(!isAscending);
  }

  if (!isAscending) {
    moves.reverse();
  }

  return (
    <div className="game">
      <div className="game-board">
        <Board xIsNext={xIsNext} onPlay={handlePlay} squares={currentSquares} />
      </div>
      <div className="game-info">
        <button onClick={() => sortList()}>{order}</button>
        <ol>{moves}</ol>
      </div>
    </div>
  );
}
