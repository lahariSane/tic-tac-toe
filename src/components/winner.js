export default function calculateWinner(squares) {
    for (let i = 0; i < 9; i += 3) {
      if (squares[i] != null && squares[i] === squares[i + 1] && squares[i] === squares[i + 2]) {
        return squares[i];
      }
    }
    for (let i = 0; i < 3; i += 1) {
      if (squares[i] != null && squares[i] === squares[i + 3] && squares[i] === squares[i + 6]) {
        return squares[i];
      }
    }
    if (squares[0] != null && squares[0] === squares[4] && squares[0] === squares[8]) {
      return squares[0];
    }
    if (squares[2] != null && squares[2] === squares[4] && squares[2] === squares[6]) {
      return squares[2];
    }
    return null;
  }