import { useState, useEffect, useRef } from 'react';
import { useKey } from '../useKey';
import '../App.css';
import { getRandomWord, isWord } from '../dictionary';

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

    function getBackground(charIndex, word)
    {
        const char = word[charIndex]
        if (index >= guesses.length)
            return "white"
        if (!target.includes(char))
            return "grey"
        if (char === target[charIndex])
            return "green"
        return "yellow"
    }

    const word = getWord();

    let boardColums = []
    for (let charIndex in word)
    {
        const char = word[charIndex];
        boardColums.push(<td style={{backgroundColor: getBackground(charIndex, word)}}>{char ?? " "}</td>); 
    }

    return (<div>
    <table border="1" style={{width: "10%", height: "32px", tableLayout: "fixed", wordWrap: "break-word"}}>
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
    const [targetWord, setTargetWord] = useState(getRandomWord())

    function isLetter(char)
    {
        return "abcdefghijklmnopqrstuvwxyz".includes(char)
    }

    const currentGuessRef = useRef(currentGuess);
    useEffect(() => {
        currentGuessRef.current = currentGuess;
    }, [currentGuess]);

    useKey(function(event)
    {
        if (event.key === "Backspace")
            setCurrentGuess(previousGuess => previousGuess.substring(0, previousGuess.length - 1))
        if (isLetter(event.key))
            setCurrentGuess(previousGuess => previousGuess.length < 5 ? previousGuess + event.key : previousGuess)
        if (event.key === "Enter")
        {
            const lastetGuess = currentGuessRef.current;
            const isValid = lastetGuess.length === 5 && isWord(lastetGuess);
            if (isValid)
            {
                setGuesses(previousGuesses => [...previousGuesses, lastetGuess]);
                setCurrentGuess("");
            }
        }
    })

    return (<Board currentGuess={currentGuess} guesses={guesses} target={targetWord}/>);
}