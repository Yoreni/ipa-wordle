const keyClasses = ["undiscovered", "not-in-word", "almost-hint", "correct"]
const row1 = "qwertyuiop".split("")
const row2 = "asdfghjkl".split("")
const row3 = "zxcvbnm".split("")

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

    return (
    <>
        <div>
            {row1.map(char => <Key key={char} onPress={onPress} char={char} hints={hints}/>)}
        </div>
        <div>
            {row2.map(char => <Key key={char} onPress={onPress} char={char} hints={hints}/>)}
        </div>
        <div>
            {row3.map(char => <Key key={char} onPress={onPress} char={char} hints={hints}/>)}
        </div>
        <div>
            <Key char="Backspace" key="0" onPress={onBackspace}/>
            <Key char="Enter" key="1" onPress={onEnter}/>
        </div>
    </>)
}