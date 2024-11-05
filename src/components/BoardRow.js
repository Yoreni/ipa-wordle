export function BoardRow({ index, currentGuess, guesses, target, hints })
{
    function getWord()
    {
        if (index < guesses.length)
            return guesses[index];
        if (guesses.length === index)
            return currentGuess;
        return [];
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
    for (let charIndex = 0; charIndex < 5; ++charIndex)
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
