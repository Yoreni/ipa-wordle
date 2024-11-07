import { useState } from 'react';
import './App.css';
import {Game} from './components/Game'
import { getRandomWord } from './dictionary';

function App() 
{
	const [page, setPage] = useState("game")
	const [targetWord, setTargetWord] = useState(getRandomWord());

	function newGame()
	{
		setTargetWord(getRandomWord())
		setPage("game")
	}

	function getComponents()
	{
		if (page === "game")
		{
			return <Game setPage={setPage} target={targetWord}/>
		}
		if (["win", "lose", "menu"].includes(page))
		{
			const targetWordFormat = `/${targetWord.ipa.join("")}/ (spelled: ${targetWord.spellings.join(", ")})`
			const winMessage = <p>You win, Congrats! It was {targetWordFormat}</p>
			const loseMessage = <p>You lost. The word was {targetWordFormat}.</p>

			return (<>
				{page === "win" && winMessage}
				{page === "lose" && loseMessage}
				<h1>Menu</h1>
				<button onClick={newGame}>Play</button>
			</>)
		}
	}

	return (
		<div className="App">
			{getComponents()}
    	</div>
  	);
}

export default App;
