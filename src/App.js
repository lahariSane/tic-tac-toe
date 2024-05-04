// import logo from './logo.svg';
import './App.css';
import { useState } from 'react';

function Square({ value, onSquareClick }) {
  return (
    <button className="square" onClick={onSquareClick}>
      {value}
    </button>
  );
}

function Board({ squares, onPlay }) {

  function bestMove(currentSquares) {
    if (calculateWinner(currentSquares) || isFull(currentSquares)) {
      return;
    }
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
    if (isMaximizingPlayer) {
      let bestVal = -Infinity;
      for (let i = 0; i < 9; i++) {
        if (currentSquares[i] == null) {
          currentSquares[i] = 'O';
          let score = minimax(currentSquares, depth + 1, true);
          currentSquares[i] = null;
          bestVal = Math.max(bestVal, score);
        }
      }
      return bestVal;
    }
    else {
      let bestVal = Infinity;
      for (let i = 0; i < 9; i++) {
        if (currentSquares[i] == null) {
          currentSquares[i] = 'O';
          let score = minimax(currentSquares, depth + 1, false);
          currentSquares[i] = null;
          bestVal = Math.min(bestVal, score);
        }
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
    if (calculateWinner(squares) || isFull(squares) || squares[i]) {
      return;
    }
    var nextSquares = squares.slice();
    nextSquares[i] = 'X';
    nextSquares = bestMove(nextSquares);
    onPlay(nextSquares);
  }


  return (
    <>
      <div className="status">{status}</div>
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
    </>
  );
}

export default function Game() {
  const [squares, setSquares] = useState([Array(9).fill(null)]);
  
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
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

// var currentPlayer;
