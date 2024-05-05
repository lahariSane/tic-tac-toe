import './../stylesheets/game.css'
import { useState } from "react";
import Board from "./board";
import { useLocation } from 'react-router-dom';

export default function Game() {
  const location = useLocation();
  const symbol = location.state.symbol;
    const [squares, setSquares] = useState(Array(9).fill(null));
  
    function handlePlay(nextSquares) {
      setSquares(nextSquares);
    }
  
    return (
      <div className="game">
        <h2>Tic Tac Toe</h2>
        <div className='scores'>
          <h3>AI: 0</h3>
          <h3>You: 1</h3>
        </div>
        <div className="game-board">
          <Board squares={squares} symbol={symbol} onPlay={handlePlay} />
        </div>
        <div className='options'>
          <button className='play-again'>Play Again</button>
          <button className='reset'>Reset Game</button>
        </div>
      </div>
    );
  }