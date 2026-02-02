import Square from "./Square";

export default function Board({ xIsNext, squares, onPlay }) {
  function handleClick(i) {
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    const nextSquares = squares.slice();
    if (xIsNext) {
      nextSquares[i] = "X";
    } else {
      nextSquares[i] = "O";
    }
    onPlay(nextSquares);
  }

  const line = calculateWinner(squares);
  const winner = line ? squares[line[0]] : null;

  const status = winner
    ? `Winner: ${winner}`
    : `Next player: ${xIsNext ? "X" : "O"}`;

  function calculateWinner(squares) {
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
        squares[a] === squares[c]
      ) {
        return lines[i];
      }
    }
    return null;
  }

  return (
    <>
      <div className="status">{status}</div>
      {Array(3)
        .fill(null)
        .map((_, index) => (
          <div key={index} className="board-row">
            {Array(3)
              .fill(null)
              .map((_, j) => {
                const squareIndex = index * 3 + j;
                return (
                  <Square
                    highlight={line && line.includes(squareIndex)}
                    key={squareIndex}
                    value={squares[squareIndex]}
                    onSquareClick={() => handleClick(squareIndex)}
                  />
                );
              })}
          </div>
        ))}
    </>
  );
}
