import React from 'react'
import { Link } from 'react-router-dom'
import {
	StyledNavItems,
	StyledNavbar,
	StyledNavBrand,
	StyledLink,
} from '../styled/Navbar'

export default function Navbar() {
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
			</StyledNavItems>
		</StyledNavbar>
	)
}
