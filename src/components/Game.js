import '../App.css';

function BoardRow()
{
    let word = "CRANE"
    return (<div>
    <table border="1">
        <tr>
            <td>{word[0]}</td>
            <td>{word[1]}</td>
            <td>{word[2]}</td>
            <td>{word[3]}</td>
            <td>{word[4]}</td>
        </tr>
    </table>
    </div>)
}

function Board()
{
    return (<>
        <BoardRow />
        <BoardRow />
        <BoardRow />
        <BoardRow />
        <BoardRow />
        <BoardRow />
    </>);
}

export function Game()
{
    return (<Board/>);
}