export function BoardRow({ index, currentGuess, guesses, target})
{
    function getWord()
    {
        if (index < guesses.length)
            return guesses[index];
        if (guesses.length === index)
            return currentGuess;
        return [];
    }

    function getHintClass(charIndex, word)
    {
        const hintClasses = ["undiscovered", "not-in-word", "almost-hint", "correct", "entered"]

        const char = word[charIndex]
        console.log(char)
        if (index === guesses.length && char !== undefined)
            return hintClasses[4]
        if (index >= guesses.length)
            return hintClasses[0]
        if (!target.ipa.includes(char))
            return hintClasses[1]
        if (char === target.ipa[charIndex])
            return hintClasses[3]
        return hintClasses[2]
    }

    const word = getWord();

    let boardColums = []
    for (let charIndex = 0; charIndex < 5; ++charIndex)
    {
        const char = word[charIndex];
        const hintClass = getHintClass(charIndex, word)
        boardColums.push(<td className={`board-cell ${hintClass}`}>{char ?? " "}</td>); 
    }

    return (<div>
    <table border="1" className="board">
        <tr>
            {boardColums}
        </tr>
    </table>
    </div>)
}
