import React, { useState, useEffect } from 'react'

import {
	StyledGame,
	StyledCharacter,
	StyledScore,
	StyledTimer,
} from '../styled/Game'

import { Strong } from '../styled/Random'

// Since Game is a page component it will receive a property of history from React Router that we can use to navigate
export default function Game({ history }) {
	const [score] = useState(0)
	const MAX_SECONDS = 5
	const [ms, setMs] = useState(999) // milliseconds
	const [seconds, setSeconds] = useState(MAX_SECONDS)

	useEffect(() => {
		const currentTime = new Date()
		const interval = setInterval(() => updateTime(currentTime), 1)

		const addLeadingZeros = (str, length) => {
			let zeros = ''

			for (let i = 0; i < length; i++) {
				zeros += '0'
			}

			return (zeros + str).slice(-length)
		}

		// usually you’ll want to declare functions needed by an effect inside of it.
		const updateTime = (startTime) => {
			const endTime = new Date()
			// console.log(endTime.getTime())
			// console.log(startTime.getTime())

			const msPassedStr = (endTime.getTime() - startTime.getTime()).toString()

			//add zeros if necessary to ensure the string has exactly 5 characters
			const formattedMsString = ('0000' + msPassedStr).slice(-5)
			//0000 - first 2 are the seconds, and the last 3 are the ms

			const updatedSeconds =
				MAX_SECONDS - parseInt(formattedMsString.substring(0, 2)) - 1

			const updatedMs =
				1000 -
				parseInt(formattedMsString.substring(formattedMsString.length - 3))

			setSeconds(addLeadingZeros(updatedSeconds, 2))
			setMs(addLeadingZeros(updatedMs, 3))
		}

		return () => {
			clearInterval(interval)
		}
	}, []) // it runs only once

	useEffect(() => {
		if (seconds <= -1) {
			// props.history.push is part of React Router
			history.push('/gameOver')
		}
	}, [seconds, ms, history]) // history is a dependency because our effect actually uses it)

	return (
		<StyledGame>
			<StyledScore>
				Score: <Strong>{score}</Strong>
			</StyledScore>
			<StyledCharacter>A</StyledCharacter>
			<StyledTimer>
				Time:{' '}
				<Strong>
					{seconds}:{ms}
				</Strong>
			</StyledTimer>
		</StyledGame>
	)
}
