import { useState } from "react";

// represents a single square on board. designed to be resuable and respond to click events
// Accepts Two Props:
// value the content to be displayed
// onSquareClick function to be called when the squar is clciked. passed from parent component (Board)
// Rendering: renders a button with
// className used for className
// onClick which sets up an event listener that calls the onSquareClick function when button is clicked.
// inside the button it displays {value}
function Square({ value, onSquareClick }) {
  return (
    // each buttons onClick prop is set to this arrow funciton
    <button className="square" onClick={onSquareClick}>
      {value}
    </button>
  );
}

export default function Board() {
  // uses hook from React to keep track of the squares state
  const [squares, setSquares] = useState(Array(9).fill(null));
  // each time a player moves, xIsNext (a boolean) will be flipped.
  const [xIsNext, setXIsNext] = useState(true);

  // handles the logic to update the state of the squares when one of them is clicked
  function handleClick(i) {
    if (squares[i] || calculateWinner(squares)) {
      // if its filled, then true and should no re fill so return
      // or if there is a winner
      return;
    }
    //create  copy of the sqaures Array w/ JS slice Array method.
    const nextSquares = squares.slice();

    if (xIsNext) {
      // handleClick updates the nextSquares array to add X to the first square
      nextSquares[i] = "X";
    } else {
      nextSquares[i] = "O";
    }

    // calling setSquares function lets React know the state of the component has changed
    // This will trigger a re-render of components that use the squares state (Board)
    // as well as its child componets (the Square components that make up the board).
    setSquares(nextSquares);
    // the negation to flip boolean is impresive lol.
    setXIsNext(!xIsNext);
  }

  const winner = calculateWinner(squares);
  let status;
  if (winner) {
    status = "Winner: " + winner;
  } else {
    // if true X. if flalse O
    status = "Next Player: " + (xIsNext ? "X" : "O");
  }

  return (
    <>
      <div className="status">{status}</div>
      <div className="board-row">
        {/* 
          () =>
          onSquareClick is an arrow function, shorter way to define functions.
          arrow function that captures the index of the square and will call
          handleClick with that index when the square is clicked
        */}
        <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
        <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
        <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
      </div>
      <div className="board-row">
        <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
        <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
        <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
      </div>
      <div className="board-row">
        <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
        <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
        <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
      </div>
    </>
  );
}

function calculateWinner(squares) {
  // declaring all possible outcomes
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
    // unpacking current line
    const [a, b, c] = lines[i];
    // check if sqaures[a] is not null
    // check if s[a] symbol is equal(same as) s[b] symbol. Do same for s[c]
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a]; // returns the value contained at index a
    }
  }
  return null;
}
