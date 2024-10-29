import { useState } from 'react';
import './App.css';
import {Game} from './components/Game'
import { getRandomWord } from './dictionary';

function App() 
{
	const [page, setPage] = useState("game")
	const [targetWord, setTargetWord] = useState(getRandomWord());

	function getComponents()
	{
		if (page === "game")
		{
			return <Game setPage={setPage} target={targetWord}/>
		}
	}

	return (
		<div className="App">
			{getComponents()}
    	</div>
  	);
}

export default App;
