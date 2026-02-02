export default function Square({ value, onSquareClick, highlight }) {
  return (
    <button
      className="square"
      onClick={onSquareClick}
      style={
        highlight
          ? { backgroundColor: "lightgreen" }
          : { backgroundColor: "white" }
      }
    >
      {value}
    </button>
  );
}
