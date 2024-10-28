import { useState } from 'react';
import { useKey } from '../useKey';
import '../App.css';

function BoardRow({ index, currentGuess, guesses, target })
{
    function getWord()
    {
        // console.log(index, guesses.length)
        if (index < guesses.length)
            return guesses[index].padEnd(5, ' ');
        if (guesses.length === index)
            return currentGuess.padEnd(5, ' ');
        return "     ";
    }

    const word = getWord();

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

function Board({ currentGuess, guesses, target })
{
    let boardRows = []; 
    for (let index = 0; index < 6; ++index)
        boardRows.push(<BoardRow key={index} index={index} currentGuess={currentGuess} guesses={guesses} target={target} />);
    
    return (<>
        {boardRows}
    </>);
}

export function Game()
{
    const [currentGuess, setCurrentGuess] = useState("");
    const [guesses, setGuesses] = useState([]);
    const [targetWord, setTargetWord] = useState("CRANE")

    function isLetter(char)
    {
        return "abcdefghijklmnopqrstuvwxyz".includes(char)
    }

    useKey(function(event)
    {
        if (event.key === "Backspace")
            setCurrentGuess(previousGuess => previousGuess.substring(0, previousGuess.length - 1))
        if (isLetter(event.key))
            setCurrentGuess(previousGuess => previousGuess.length < 5 ? previousGuess + event.key : previousGuess)
        if (event.key === "Enter")
        {
            let lastetGuess;
            setCurrentGuess(guess =>
            {
                lastetGuess = guess;
                return "";
            });
            setGuesses(previousGuesses => [...previousGuesses, lastetGuess]);
        }
    })

    return (<Board currentGuess={currentGuess} guesses={guesses} target={targetWord}/>);
}