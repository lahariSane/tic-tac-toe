import './../stylesheets/home.css';
import './../stylesheets/global.css';
import { useNavigate } from 'react-router-dom';

export default function Home() {
    const navigate = useNavigate();
    return (
        <>
            <div className="main">
                <h1>Tic Tac Toe</h1>
                <h3>Select your Symbol to play</h3>
                <div className="options">
                        <button className='square' onClick={() => navigate('/tictactoe', {state:{symbol: 'X'}})}>X</button>
                        <button className='square'onClick={() => navigate('/tictactoe', {state:{symbol: 'O'}})}>O</button>
                </div>
            </div>
        </>
    );
}