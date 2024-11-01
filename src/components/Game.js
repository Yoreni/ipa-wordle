import { useState } from 'react';
import { useKey } from '../hooks/useKey';
import { useStateRef } from '../hooks/useStateRef';
import '../App.css';
import { isWord } from '../dictionary';
import { Keyboard } from './Keyboard';
import { BoardRow } from './BoardRow';

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

function Board({ currentGuess, guesses, target, hints })
{
    let boardRows = []; 
    for (let index = 0; index < 6; ++index)
        boardRows.push(<BoardRow key={index} index={index} currentGuess={currentGuess} guesses={guesses} target={target} hints={hints}/>);
    
    return (<>
        {boardRows}
    </>);
}

function isLetter(char)
{
    return "abcdefghijklmnopqrstuvwxyz".includes(char)
}

function evalHints(target, guess, currentHints, setHints)
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

    setHints(nextHints);
    return nextHints;
}

export function Game( {setPage, target} )
{
    const [currentGuess, setCurrentGuess] = useState("");
    const [guesses, setGuesses] = useState([]);
    const [hints, setHints] = useState(hintsInit)

    const currentGuessRef = useStateRef(currentGuess);
    const guessesRef = useStateRef(guesses);
    const hintsRef = useStateRef(hints)

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
            hintsRef.current = evalHints(target, lastetGuess, hintsRef.current, setHints);

            //add guess
            setGuesses(previousGuesses => [...previousGuesses, lastetGuess]);
            setCurrentGuess("");

            let win;
            if (lastetGuess === target)
                endGame(win=true);
            else if (guessesRef.current.length === 5)
                endGame(win=false);
        }
    }

    function endGame(hasWon)
    {
        const pageName = hasWon ? "win" : "lose";
        setTimeout(() => setPage(pageName), 1000)
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
        <Board currentGuess={currentGuess} guesses={guesses} target={target} hints={hints}/>
        <Keyboard onPress={enterChar} onBackspace={backspace} onEnter={enterGuess} hintsRef={hintsRef}></Keyboard>
    </div>
    );
}