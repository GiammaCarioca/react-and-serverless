import React, { useState, useEffect } from 'react'
import { ScoreLI } from '../styled/HighScores'

export default function HighScores() {
	//display those scores
	const [highScores, setHighScores] = useState([])

	//use the fetch API to call getHighScores function
	useEffect(() => {
		const loadHighScores = async () => {
			try {
				// relative path to our serverless function
				const res = await fetch('/.netlify/functions/getHighScores')
				const scores = await res.json()
				setHighScores(scores)
			} catch (err) {
				console.error(err)
			}
		}
		loadHighScores()
	}, [])

	return (
		<>
			<h1>High Scores</h1>
			<ol>
				{highScores.map((score) => (
					<ScoreLI key={score.id}>
						{score.fields.name} - {score.fields.score}
					</ScoreLI>
				))}
			</ol>
		</>
	)
}
