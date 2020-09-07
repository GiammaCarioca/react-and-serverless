import React, { useEffect } from 'react'
import { Accent } from '../styled/Random'
import { CTA } from '../styled/CTA'
import { StyledTitle } from '../styled/Random'
import { useAuth0 } from '@auth0/auth0-react'

export default function Home() {
	const { user, isAuthenticated, getAccessTokenSilently } = useAuth0()

	if (isAuthenticated) {
		console.log(user)
	}

	useEffect(() => {
		const getToken = async () => {
			const token = await getAccessTokenSilently()
			console.log(token)
		}
		getToken()
		console.log(user)
	}, [getAccessTokenSilently, user])

	return (
		<div>
			<StyledTitle>Ready to type?</StyledTitle>
			<CTA to="/game">
				Click or Type '<Accent>s</Accent>' to start playing
			</CTA>
		</div>
	)
}
