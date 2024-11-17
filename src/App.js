import { useState } from 'react';
import './App.css';
import {Game} from './components/Game'
import { getRandomWord } from './dictionary';

function App() 
{
	const [page, setPage] = useState("menu")
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
			return <div>
				<Game setPage={setPage} target={targetWord}/>
			</div>
		}
		if (["win", "lose", "menu"].includes(page))
		{
			const targetWordFormat = `/${targetWord.ipa.join("")}/ (spelled: ${targetWord.spellings.join(", ")})`
			const winMessage = <p>You win, Congrats! It was {targetWordFormat}</p>
			const loseMessage = <p>You lost. The word was {targetWordFormat}.</p>

			return (<>
				{page === "win" && winMessage}
				{page === "lose" && loseMessage}
				<h1>IPA Wordle</h1>
				<button className="button" onClick={newGame}>Play</button>
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
