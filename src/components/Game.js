import { useState, useEffect, useRef } from 'react';
import { useKey } from '../useKey';
import '../App.css';
import { isWord } from '../dictionary';
import { Keyboard } from './Keyboard';

function BoardRow({ index, currentGuess, guesses, target })
{
    function getWord()
    {
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

function isLetter(char)
{
    return "abcdefghijklmnopqrstuvwxyz".includes(char)
}

const hintsInit = {
    a: 0,
    b: 0,
    c: 0,
    d: 0,
    e: 0,
    f: 0,
    g: 0,
    h: 0,
    i: 0,
    j: 0,
    k: 0,
    l: 0,
    m: 0,
    n: 0,
    o: 0,
    p: 0,
    q: 0,
    r: 0,
    s: 0,
    t: 0,
    u: 0,
    v: 0,
    w: 0,
    x: 0,
    y: 0,
    z: 0
}

function evalHints(target, guess, currentHints)
{
    let nextHints = structuredClone(currentHints)

    for (let index = 0; index < target.length; ++index)
    {
        const guessChar = guess[index]
        if (!target.includes(guessChar))
            nextHints[guessChar] = 1
        else
        {
            const currentHintLevel = currentHints[guessChar]
            if (guessChar === target[index])
                nextHints[guessChar] = 3
            else
                nextHints[guessChar] = Math.max(2, currentHintLevel);
        }
    }

    return nextHints;
}

export function Game( {setPage, target} )
{
    const [currentGuess, setCurrentGuess] = useState("");
    const [guesses, setGuesses] = useState([]);
    const [hints, setHints] = useState(hintsInit)

    const currentGuessRef = useStateRef(currentGuess);
    const guessesRef = useStateRef(guesses);

    function enterChar(char)
    {
        setCurrentGuess(previousGuess => previousGuess.length < 5 ? previousGuess + char : previousGuess)
    }

    function backspace()
    {
        setCurrentGuess(previousGuess => previousGuess.substring(0, previousGuess.length - 1))
    }

    function enterGuess()
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

            evalHints(target, lastetGuess, hints);

            //check for win or lose
            if (lastetGuess === target)
                setPage("win")
            if (guessesRef.current.length === 5)
                setPage("lose")
        }
    }

    useKey(function(event)
    {
        if (event.key === "Backspace")
            backspace()
        if (isLetter(event.key))
            enterChar(event.key)
        if (event.key === "Enter")
            enterGuess()
    })

    return (
    <div>
        <Board currentGuess={currentGuess} guesses={guesses} target={target} />
        <Keyboard onPress={enterChar} onBackspace={backspace} onEnter={enterGuess} ></Keyboard>
    </div>
    );
}