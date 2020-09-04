import React from 'react'
import './App.css'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import Home from './pages/Home'
import Game from './pages/Game'
import HighScores from './pages/HighScores'
import GameOver from './pages/GameOver'

import Navbar from './components/Navbar'

function App() {
	return (
		<Router>
			<Navbar></Navbar>
			<Switch>
				<Route path="/" exact component={Home} />
				<Route path="/game" component={Game} />
				<Route path="/highScores" component={HighScores} />
				<Route path="/gameOver" component={GameOver} />
			</Switch>
		</Router>
	)
}

export default App
