import React, { useState, useEffect } from 'react'
import { useScore } from '../contexts/ScoreContext'
import { StyledTitle } from '../styled/Random'
import { StyledLink } from '../styled/Navbar'
import { StyledCharacter } from '../styled/Game'
import { useAuth0 } from '@auth0/auth0-react'

export default function GameOver({ history }) {
	const [score] = useScore()
	const [scoreMessage, setScoreMessage] = useState('')
	const { getAccessTokenSilently, isAuthenticated } = useAuth0()

	if (score === -1) {
		history.push('/')
	}

	useEffect(() => {
		const saveHighScore = async () => {
			try {
				const accessToken = await getAccessTokenSilently()
				const options = {
					method: 'POST',
					body: JSON.stringify({ name: 'anonymous', score }),
					headers: {
						Authorization: `Bearer ${accessToken}`,
					},
				}
				const res = await fetch('/.netlify/functions/saveHighScore', options)
				const data = await res.json()

				if (data.id) {
					setScoreMessage('Congrats! You got a high score!!')
				} else {
					setScoreMessage('Sorry, not a high score. Keep trying!')
				}
			} catch (err) {
				console.error(err)
			}
		}

		if (isAuthenticated) {
			saveHighScore()
		}
	}, [getAccessTokenSilently, isAuthenticated, score])

	return (
		<>
			<StyledTitle>Game Over</StyledTitle>
			<h2>{scoreMessage}</h2>
			{!isAuthenticated && (
				<h2>You should log in or sign up to compete for high scores!</h2>
			)}
			<StyledCharacter>{score}</StyledCharacter>
			<div>
				<StyledLink to="/">Go Home</StyledLink>
			</div>
			<div>
				<StyledLink to="/game">Play Again</StyledLink>
			</div>
		</>
	)
}
