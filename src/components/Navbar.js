import React from 'react'
import { Link } from 'react-router-dom'
import {
	StyledNavItems,
	StyledNavbar,
	StyledNavBrand,
	StyledLink,
} from '../styled/Navbar'

import { useAuth0 } from '@auth0/auth0-react'

export default function Navbar() {
	const { isAuthenticated, loginWithRedirect, logout } = useAuth0()

	return (
		<StyledNavbar>
			<StyledNavBrand>
				<Link to="/">Learning React and Serverless</Link>
			</StyledNavBrand>
			<StyledNavItems>
				<li>
					<StyledLink to="/">Home</StyledLink>
				</li>
				<li>
					<StyledLink to="/highscores">High Scores</StyledLink>
				</li>
				{!isAuthenticated ? (
					<li>
						<button onClick={() => loginWithRedirect()}>Login</button>
					</li>
				) : (
					<li>
						<button
							onClick={() => logout({ returnTo: window.location.origin })}
						>
							Logout
						</button>
					</li>
				)}
			</StyledNavItems>
		</StyledNavbar>
	)
}
