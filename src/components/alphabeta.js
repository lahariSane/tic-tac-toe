import calculateWinner from "./winner";
import isFull from "./isFull";

export default function alphabeta(currentSquares, depth, isMaximizingPlayer,symbol,alpha,beta) {
  const otherSymbol = symbol === 'X'? 'O':'X';
    let result = calculateWinner(currentSquares);
    if (result != null) {
      if(result === symbol) return -1*(9-depth);
      if(result === otherSymbol) return 1*(9-depth);
    }
    else if (isFull(currentSquares)) {
      return 0;
    }
    if (isMaximizingPlayer) {
      let bestVal = -Infinity;
      for (let i = 0; i < 9; i++) {
        if (currentSquares[i] == null) {
          currentSquares[i] = otherSymbol;
          let score = alphabeta(currentSquares, depth + 1, false,symbol,alpha,beta);
          currentSquares[i] = null;
          alpha = Math.max(bestVal, score);
          bestVal = alpha;
        }
        if(alpha >= beta) break;
      }
      return bestVal;
    }
    else {
      let bestVal = Infinity;
      for (let i = 0; i < 9; i++) {
        if (currentSquares[i] == null) {
          currentSquares[i] = symbol;
          let score = alphabeta(currentSquares, depth + 1, true,symbol,alpha,beta);
          currentSquares[i] = null;
          beta = Math.min(bestVal, score);
          bestVal = beta;
        }
        if(alpha >= beta) break;
      }
      return bestVal;
    }
  }