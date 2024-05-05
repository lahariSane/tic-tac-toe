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
        <div className="game-board">
          <Board squares={squares} symbol={symbol} onPlay={handlePlay} />
        </div>
      </div>
    );
  }