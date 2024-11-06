const keyClasses = ["undiscovered", "not-in-word", "almost-hint", "correct"]
const row0 = ["ɑː", "ɛː", "oː", "ɪː", "ɵː", "əː", "ɑj", "ɛj", "ɪj", "oj", "θ", "ð"]
const row1 = "ŋwertjɵɪɔpʃʒ".split("")
const row2 = ['a', 's', 'd', 'f', 'g', 'h', 'ʤ', 'k', 'l', "aw", "ʉw", "əw"]
const row3 = "zəʧvbnm".split("")

//     "1": "ɑː",
//     "2": "ɛː",
//     "3": "oː",
//     "4": "ɪː",
//     "5": "ɵː",
//     "6": "əː",
//     "7": "əw",
//     // "8": "",
//     // "9": "",
//     // "0": "",
//     "-": "θ",
//     "=": "ð",
//     "[": "ʃ",
//     "]": "ʒ",
//     // ";": "",
//     // "'": "",
//     // "#": "",
// }

// const y_keybinds = {
//     "a": "ɑj",
//     "ɛ": "ɛj",
//     "ɪ": "ɪj",
//     "ɔ": "oj"
// }

// const w_keybinds = {
//     "a": "aw",
//     "ɵ": "ʉw",
// }


function Key( {char, onPress, hints} )
{
    function getClass()
    {
        if (hints === undefined)
            return keyClasses[0]
        const hint = hints[char]
        return keyClasses[hint] ?? keyClasses[0]
    }

    return (<button onClick={() => onPress(char)} className={getClass()}>{char}</button>)
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