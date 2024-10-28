import { useState } from 'react';
import '../App.css';

function BoardRow({ key, gameState })
{
    function getWord(gameState)
    {
        if (gameState.guesses.length < key)
            return gameState.guesses[key]
        if (gameState.guesses.length === key)
            return gameState.currentGuess.padEnd(5, ' ');
        return "     ";
    }

    const word = getWord(gameState)

    let boardColums = []
    word.split("").forEach(element => {
        boardColums.push(<td>{element ?? " "}</td>); 
    })

    return (<div>
    <table border="1">
        <tr>
            {boardColums}
        </tr>
    </table>
    </div>)
}

function Board({ gameState })
{
    let boardRows = []; 
    for (let index = 0; index < 6; ++index)
        boardRows.push(<BoardRow key={index} gameState={gameState} />);
    
    return (<>
        {boardRows}
    </>);
}

export function Game()
{
    const [currentGuess, setCurrentGuess] = useState("");
    const [guesses, setGuesses] = useState([]);
    const [targetWord, setTargetWord] = useState("CRANE")

    const gameState = {currentGuess, setCurrentGuess, guesses, setGuesses, targetWord, setTargetWord}; 
    return (<Board gameState={gameState}/>);
}