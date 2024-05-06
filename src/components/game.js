import './../stylesheets/game.css'
import { useState } from "react";
import Board from "./board";
import { useNavigate, useLocation } from 'react-router-dom';

export default function Game() {
  const navigate = useNavigate();
  const location = useLocation();
  const symbol = location.state.symbol;
    const [squares, setSquares] = useState(Array(9).fill(null));
    const [scores,setScores] = useState({AI:0, You:0});
    
    const handleGameOver = (winner) => {
      console.log(winner);
      if (winner === 'AI') {
        setScores((prevScores) => ({
          ...prevScores,
          AI: prevScores.AI + 1,
        }));
      } else if (winner === 'You') {
        setScores((prevScores) => ({
          ...prevScores,
          You: prevScores.You + 1,
        }));
      }
    };

    function replay(){
      setSquares(Array(9).fill(null));
    }
  
    function handlePlay(nextSquares, winner) {
      setSquares(nextSquares);
      handleGameOver(winner)
    }
  
    return (
      <div className="game">
        <h2>Tic Tac Toe</h2>
        <div className='scores'>
          <h3>AI: {scores.AI}</h3>
          <h3>You: {scores.You}</h3>
        </div>
        <div className="game-board">
          <Board squares={squares} symbol={symbol} onPlay={handlePlay} />
        </div>
        <div className='options'>
          <button className='play-again' onClick={() => replay()}>Play Again</button>
          <button className='reset' onClick={() => navigate('/')}>Reset Game</button>
        </div>
      </div>
    );
  }