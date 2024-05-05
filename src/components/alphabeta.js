import calculateWinner from "./winner";
import isFull from "./isFull";

let scores = {
    'X': -1,
    'O': +1,
    'tie': 0
  }

export default function alphabeta(currentSquares, depth, isMaximizingPlayer) {
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
          let score = alphabeta(currentSquares, depth + 1, false);
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
          let score = alphabeta(currentSquares, depth + 1, true);
          currentSquares[i] = null;
          bestVal = Math.min(bestVal, score);
        }
        if(bestVal === -1) break;
      }
      return bestVal;
    }
  }