import './../stylesheets/home.css';
import './../stylesheets/global.css';

export default function Home() {
    return (
        <>
            <div className="main">
                <h1>Tic Tac Toe</h1>
                <h3>Select your Symbol to play</h3>
                <div className="options">
                    <button className='square'>X</button>
                    <button className='square'>O</button>
                </div>
            </div>
        </>
    );
}