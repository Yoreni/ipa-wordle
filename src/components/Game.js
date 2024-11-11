import { useState } from 'react';
import { useKey } from '../hooks/useKey';
import { useStateRef } from '../hooks/useStateRef';
import '../App.css';
import { isWord } from '../dictionary';
import { Keyboard } from './Keyboard';
import { BoardRow } from './BoardRow';
import { arraysEqual } from '../utils';

const hintsInit = {
    a: 0,
    b: 0,
    ʧ: 0,
    d: 0,
    ɛ: 0,
    f: 0,
    g: 0,
    h: 0,
    ɪ: 0,
    ʤ: 0,
    k: 0,
    l: 0,
    m: 0,
    n: 0,
    ɔ: 0,
    p: 0,
    ŋ: 0,
    r: 0,
    s: 0,
    t: 0,
    ɵ: 0,
    v: 0,
    w: 0,
    ə: 0,
    j: 0,
    z: 0,
    θ: 0,
    ð: 0,
    ʃ: 0,
    ʒ: 0,
    ɑː: 0,
    ɛː: 0,
    oː: 0,
    ɪː: 0,
    ɵː: 0,
    əː: 0,
    ɑj: 0,
    ɛj: 0,
    ɪj: 0,
    oj: 0,
    aw: 0,
    ʉw: 0,
    əw: 0,
}

const key_to_ipa = {
    a: "a",
    b: "b",
    c: "ʧ",
    d: "d",
    e: "ɛ",
    f: "f",
    g: "g",
    h: "h",
    i: "ɪ",
    j: "ʤ",
    k: "k",
    l: "l",
    m: "m",
    n: "n",
    o: "ɔ",
    p: "p",
    q: "ŋ",
    r: "r",
    s: "s",
    t: "t",
    u: "ɵ",
    v: "v",
    w: "w",
    x: "ə",
    y: "j",
    z: "z",
    "1": "ɑː",
    "2": "ɛː",
    "3": "oː",
    "4": "ɪː",
    "5": "ɵː",
    "6": "əː",
    "7": "ɑj",
    "8": "ɛj",
    "9": "ɪj",
    "0": "oj",
    "-": "θ",
    "=": "ð",
    "[": "ʃ",
    "]": "ʒ",
    ";": "aw",
    "'": "ʉw",
    "#": "əw",
}

const y_keybinds = {
    "a": "ɑj",
    "ɛ": "ɛj",
    "ɪ": "ɪj",
    "ɔ": "oj"
}

const w_keybinds = {
    "a": "aw",
    "ɵ": "ʉw",
}

const long_keybinds = {
    "a": "ɑː",
    "ɛ": "ɛː",
    "ɔ": "oː",
    "ɪ": "ɪː",
    "ɵ": "ɵː",
    "ə": "əː",
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

function evalHints(target, guess, currentHints, setHints)
{
    let nextHints = structuredClone(currentHints)

    for (let index = 0; index < 5; ++index)
    {
        const guessChar = guess[index]
        if (!target.ipa.includes(guessChar))
            nextHints[guessChar] = 1
        else
        {
            const currentHintLevel = currentHints[guessChar]
            if (guessChar === target.ipa[index])
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
    const [currentGuess, setCurrentGuess] = useState([]);
    const [guesses, setGuesses] = useState([]);
    const [hints, setHints] = useState(hintsInit)

    const currentGuessRef = useStateRef(currentGuess);
    const guessesRef = useStateRef(guesses);
    const hintsRef = useStateRef(hints)

    function enterChar(char)
    {
        function enter(previousGuess)
        {
            const lastLetter = previousGuess.at(-1)
            const lettersBefore = previousGuess.slice(0, -1)

            if (char === "j" && y_keybinds[lastLetter])
                return [...lettersBefore, y_keybinds[lastLetter]]
            else if (char === "w" && w_keybinds[lastLetter])
                return [...lettersBefore, w_keybinds[lastLetter]]
            else if (char === lastLetter && long_keybinds[lastLetter])
                return [...lettersBefore, long_keybinds[lastLetter]]
            else
                return previousGuess.length < 5 ? [...previousGuess, char] : previousGuess
        }

        setCurrentGuess(enter)
    }

    function backspace()
    {
        setCurrentGuess(previousGuess => previousGuess.slice(0, -1))
    }

    function enterGuess()
    {
        const lastetGuess = currentGuessRef.current;
        const currentGuesses = guessesRef.current;


        const isValid = lastetGuess.length === 5 && isWord(lastetGuess) && currentGuesses.length < 6 
            && !currentGuesses.includes(lastetGuess);
        console.log(lastetGuess.length === 5, isWord(lastetGuess), currentGuesses.length < 6, !currentGuesses.includes(lastetGuess))
        if (isValid)
        {
            hintsRef.current = evalHints(target, lastetGuess, hintsRef.current, setHints);

            //add guess
            setGuesses(previousGuesses => [...previousGuesses, lastetGuess]);
            setCurrentGuess("");

            let win;
            if (arraysEqual(lastetGuess, target.ipa))
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
        if (key_to_ipa[event.key])
            enterChar(key_to_ipa[event.key])
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