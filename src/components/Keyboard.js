const keyClasses = ["undiscovered", "not-in-word", "almost-hint", "correct"]
const row0 = ["ɑː", "ɛː", "oː", "ɪː", "ɵː", "əː", "ɑj", "ɛj", "ɪj", "oj", "θ", "ð"]
const row1 = "ŋwɛrtjɵɪɔpʃʒ".split("")
const row2 = ['a', 's', 'd', 'f', 'g', 'h', 'ʤ', 'k', 'l', "aw", "ʉw", "əw"]
const row3 = "zəʧvbnm".split("")

const keyHints = {
    "ɑː": "a a",
    "ɛː": "e e",
    "ɪː": "i i",
    "oː": "o o",
    "ɵː": "u u",
    "əː": "x x",
    "ɑj": "a y",
    "ɛj": "e y",
    "ɪj": "i y",
    "oj": "o y",
    "θ": "-",
    "ð": "=",
    "ʃ": "[",
    "ʒ": "]",
    "aw": "a w",
    "ʉw": "u w",
    "əw": "#",
    "ŋ": "q",
    "ɛ": "e",
    "j": "y",
    "ɵ": "u",
    "ɪ": "i",
    "ɔ": "o",
    "ʤ": "j",
    "ə": "x",
    "ʧ": "c",
}

function Key( {char, onPress, hints} )
{
    function getClass()
    {
        if (hints === undefined)
            return keyClasses[0]
        const hint = hints[char]
        return keyClasses[hint] ?? keyClasses[0]
    }

    return (
        <button onClick={() => onPress(char)} className={`${getClass()} key`}>
            <span className="centre">{char}</span>
            <span className="key-hint">{keyHints[char] ?? ""}</span>
        </button>
    )
}

/*
    Hints number guide
    0: Undiscovered - white
    1: Not in world - grey
    2: In word but wrong position - yellow
    3: In word and right position - green
*/

export function Keyboard( {onPress, onBackspace, onEnter, hintsRef} )
{
    const hints = hintsRef.current

    function makeRow(chars)
    {
        return (
        <div>
            {chars.map(char => <Key key={char} onPress={onPress} char={char} hints={hints}/>)}
        </div>)
    }

    return (
    <>
        {makeRow(row0)}
        {makeRow(row1)}
        {makeRow(row2)}
        {makeRow(row3)}
        <div>
            <Key char="Backspace" key="0" onPress={onBackspace}/>
            <Key char="Enter" key="1" onPress={onEnter}/>
        </div>
    </>)
}