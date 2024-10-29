import { useState, useEffect, useRef } from 'react';
import { useKey } from '../useKey';
import '../App.css';
import { isWord } from '../dictionary';

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

function useStateRef(stateVarible)
{
    const referance = useRef(stateVarible);
    useEffect(() => {
        referance.current = stateVarible;
    }, [stateVarible]);
    return referance;
}

export function Game( {setPage, target} )
{
    const [currentGuess, setCurrentGuess] = useState("");
    const [guesses, setGuesses] = useState([]);

    function isLetter(char)
    {
        return "abcdefghijklmnopqrstuvwxyz".includes(char)
    }

    const currentGuessRef = useStateRef(currentGuess);
    const guessesRef = useStateRef(guesses);


    useKey(function(event)
    {
        if (event.key === "Backspace")
            setCurrentGuess(previousGuess => previousGuess.substring(0, previousGuess.length - 1))
        if (isLetter(event.key))
            setCurrentGuess(previousGuess => previousGuess.length < 5 ? previousGuess + event.key : previousGuess)
        if (event.key === "Enter")
        {
            const lastetGuess = currentGuessRef.current;
            const currentGuesses = guessesRef.current;
            const isValid = lastetGuess.length === 5 && isWord(lastetGuess) && currentGuesses.length < 6 
                && !currentGuesses.includes(lastetGuess);
            if (isValid)
            {
                //add guess
                setGuesses(previousGuesses => [...previousGuesses, lastetGuess]);
                setCurrentGuess("");

                //check for win or lose
                if (lastetGuess === target)
                    alert("You win")
                if (guessesRef.current.length === 5)
                    alert("You lose")
            }
        }
    })

    return (
    <div>
        <Board currentGuess={currentGuess} guesses={guesses} target={target}/>
    </div>
    );
}