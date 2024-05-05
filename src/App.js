import './App.css';
import { useState } from 'react';

function Square({ value, onSquareClick }) {
  return (
    <>
      <button className="square" onClick={onSquareClick}>
        {value}
      </button>
    </>
  );
}

function Board({ squares, onPlay }) {

  function bestMove(currentSquares) {
    if (calculateWinner(currentSquares) || isFull(currentSquares)) {
      onPlay(currentSquares);
    } else {
      var bestVal = -Infinity;
      var bestMove;
      for (var i = 0; i < 9; i++) {
        if (currentSquares[i] == null) {
          currentSquares[i] = 'O';
          let score = minimax(currentSquares, 0, false);
          currentSquares[i] = null;
          if (score > bestVal) {
            bestVal = score;
            bestMove = i;
          }
        }
      }
      currentSquares[bestMove] = 'O'
    }
    return currentSquares;
  }

  let scores = {
    'X': -1,
    'O': +1,
    'tie': 0
  }

  function minimax(currentSquares, depth, isMaximizingPlayer) {
    let result = calculateWinner(currentSquares);
    if (result != null) {
      return scores[result];
    }
    else if (isFull(currentSquares)) {
      return 0;
    }
    if (isMaximizingPlayer) {
      let bestVal = -Infinity;
      for (let i = 0; i < 9; i++) {
        if (currentSquares[i] == null) {
          currentSquares[i] = 'O';
          let score = minimax(currentSquares, depth + 1, false);
          currentSquares[i] = null;
          bestVal = Math.max(bestVal, score);
        }
        if(bestVal === 1) break;
      }
      return bestVal;
    }
    else {
      let bestVal = Infinity;
      for (let i = 0; i < 9; i++) {
        if (currentSquares[i] == null) {
          currentSquares[i] = 'X';
          let score = minimax(currentSquares, depth + 1, true);
          currentSquares[i] = null;
          bestVal = Math.min(bestVal, score);
        }
        if(bestVal === -1) break;
      }
      return bestVal;
    }
  }

  function isFull(currentSquares) {
    for (let i = 0; i < 9; i++) {
      if (currentSquares[i] == null) return false;
    }
    return true;
  }

  let status;
  const winner = calculateWinner(squares);
  if (winner) {
    status = 'Winner: ' + winner;
  }
  else if (isFull(squares)) {
    status = 'Tie!!';
  }

  function handleClick(i) {
    var nextSquares = squares.slice();
    if (calculateWinner(squares) || isFull(squares) || nextSquares[i] != null) {
      return;
    }
    nextSquares[i] = 'X';
    nextSquares = bestMove(nextSquares);
    onPlay(nextSquares);
  }


  return (
    <>
      <div className="status">{status}</div>
      <div className='board'>
        <div className="board-row">
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
      </div>
    </>
  );
}

export default function Game() {
  const [squares, setSquares] = useState(Array(9).fill(null));

  function handlePlay(nextSquares) {
    setSquares(nextSquares);
  }

  return (
    <div className="game">
      <div className="game-board">
        <Board squares={squares} onPlay={handlePlay} />
      </div>
    </div>
  );
}

function calculateWinner(squares) {
  for (let i = 0; i < 9; i += 3) {
    if (squares[i] != null && squares[i] === squares[i + 1] && squares[i] === squares[i + 2]) {
      return squares[i];
    }
  }
  for (let i = 0; i < 3; i += 1) {
    if (squares[i] != null && squares[i] === squares[i + 3] && squares[i] === squares[i + 6]) {
      return squares[i];
    }
  }
  if (squares[0] != null && squares[0] === squares[4] && squares[0] === squares[8]) {
    return squares[0];
  }
  if (squares[2] != null && squares[2] === squares[4] && squares[2] === squares[6]) {
    return squares[2];
  }
  return null;
}

