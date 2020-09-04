import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import Home from './pages/Home'
import Game from './pages/Game'
import HighScores from './pages/HighScores'
import GameOver from './pages/GameOver'

import Navbar from './components/Navbar'

import { GlobalStyle } from './styled/Global'
import { Container } from './styled/Container'
import { Main } from './styled/Main'

function App() {
	return (
		<Router>
			<GlobalStyle />
			<Main>
				<Container>
					<Navbar></Navbar>
					<Switch>
						<Route path="/" exact component={Home} />
						<Route path="/game" component={Game} />
						<Route path="/highScores" component={HighScores} />
						<Route path="/gameOver" component={GameOver} />
					</Switch>
				</Container>
			</Main>
		</Router>
	)
}

export default App
