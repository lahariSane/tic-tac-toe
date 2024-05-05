import { useState } from "react";
import Board from "./board";

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