export default function isFull(currentSquares) {
    for (let i = 0; i < 9; i++) {
      if (currentSquares[i] == null) return false;
    }
    return true;
  }