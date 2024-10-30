const backgroundColours = ["white", "grey", "yellow", "green"]

function Key( {char, onPress, hints} )
{
    function getBackgroundColour()
    {
        if (!hints)
            return "white"
        const hint = hints[char]
        return backgroundColours[hint] ?? "white"
    }

    return (<button onClick={() => onPress(char)} styles={{backgroundColours: [getBackgroundColour()]}}>{char}</button>)
}

/*
    Hints number guide
    0: Undiscovered - white
    1: Not in world - grey
    2: In word but wrong position - yellow
    3: In word and right position - green
*/

export function Keyboard( {onPress, onBackspace, onEnter, hints} )
{
    const row1 = "qwertyuiop".split("")
    const row2 = "asdfghjkl".split("")
    const row3 = "zxcvbnm".split("")
    return (
    <>
        <div>
            {row1.map(char => <Key onPress={onPress} char={char}/>)}
        </div>
        <div>
            {row2.map(char => <Key onPress={onPress} char={char}/>)}
        </div>
        <div>
            {row3.map(char => <Key onPress={onPress} char={char}/>)}
        </div>
        <div>
            <Key char="Backspace" onPress={onBackspace}/>
            <Key char="Enter" onPress={onEnter}/>
        </div>
    </>)
}