import Game from './components/game';
import Home from './components/home';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/tictactoe",
    element: <Game />
  }
])

export default function TicTacToe() {
  return (
    <RouterProvider router={router} />
  );
};