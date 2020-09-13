import React from 'react'
import { Link } from 'react-router-dom'
import {
	StyledNavItems,
	StyledNavbar,
	StyledNavBrand,
	StyledLink,
	StyledButtonLink
} from '../styled/Navbar'

import { Accent } from '../styled/Random'
import { StyledButton } from '../styled/Buttons'

import { useAuth0 } from '@auth0/auth0-react'

export default function Navbar({ toggleTheme }) {
	const { isAuthenticated, loginWithRedirect, logout } = useAuth0()

	return (
		<StyledNavbar>
			<StyledNavBrand>
				<Link to="/">Learn <Accent>React & Serverless</Accent></Link>
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
						<StyledButtonLink onClick={() => loginWithRedirect()}>
							Login
						</StyledButtonLink>
					</li>
				) : (
					<li>
						<StyledButtonLink
							onClick={() => logout({ returnTo: window.location.origin })}
						>
							Logout
						</StyledButtonLink>
					</li>
				)}
				<StyledButton onClick={toggleTheme}>Toggle Theme</StyledButton>
			</StyledNavItems>
		</StyledNavbar>
	)
}
