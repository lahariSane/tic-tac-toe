import Square from "./square";
import calculateWinner from "./winner";
import isFull from "./isFull";
import alphabeta from "./alphabeta";

export default function Board({ squares, onPlay }) {
    function bestMove(currentSquares) {
      if (calculateWinner(currentSquares) || isFull(currentSquares)) {
        onPlay(currentSquares);
      } else {
        var bestVal = -Infinity;
        var bestMove;
        for (var i = 0; i < 9; i++) {
          if (currentSquares[i] == null) {
            currentSquares[i] = 'O';
            let score = alphabeta(currentSquares, 0, false);
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