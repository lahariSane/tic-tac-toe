import calculateWinner from "./winner";
import isFull from "./isFull";

export default function alphabeta(currentSquares, depth, isMaximizingPlayer,symbol) {
  const otherSymbol = symbol === 'X'? 'O':'X';
    let result = calculateWinner(currentSquares);
    if (result != null) {
      if(result === symbol) return -1;
      if(result === otherSymbol) return 1;
    }
    else if (isFull(currentSquares)) {
      return 0;
    }
    if (isMaximizingPlayer) {
      let bestVal = -Infinity;
      for (let i = 0; i < 9; i++) {
        if (currentSquares[i] == null) {
          currentSquares[i] = otherSymbol;
          let score = alphabeta(currentSquares, depth + 1, false,symbol);
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
          currentSquares[i] = symbol;
          let score = alphabeta(currentSquares, depth + 1, true,symbol);
          currentSquares[i] = null;
          bestVal = Math.min(bestVal, score);
        }
        if(bestVal === -1) break;
      }
      return bestVal;
    }
  }