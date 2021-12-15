import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import axios from 'axios'

const Header = () => {
	const { currentUser, logout } = useAuth();
	const [userName, setUserName] = useState();
	const history = useHistory();

	if (currentUser) {
		axios.post('http://localhost:3001/user/get', {
			id: currentUser.uid,
		}).then((response) => {
			if (response.data[0]) {
				if (response.data[0].User_Role === "Admin") {
					setUserName(response.data[0].User_First_Name + ' ' + response.data[0].User_Last_Name + ' (ADMIN)');
				} else {
					setUserName(response.data[0].User_First_Name + ' ' + response.data[0].User_Last_Name);
				}
			} else {
				logout();
				history.push("/login");
			}
		})
	}

	// Calls logout function from the authcontext to log the user out and forward them to login screen.
	async function handleLogout() {
		try {
			await logout();
			history.push("/login");
		} catch {
			// Error code goes here
		}
	}

	return (
		<header>
			<nav className="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
				<div className="container-fluid">
					{currentUser &&
						<div>
							<ul className="navbar-nav me-auto mb-2 mb-md-0">
								<li className="nav-item">
									<a className="nav-link-title" href="/">
										Hot Rides Auto Expo
									</a>
								</li>
								<li className="nav-item">
									<a className="nav-link" href="/Registrations/Self">
										Self-Registration
									</a>
								</li>
								<li className="nav-item">
									<a className="nav-link" href="/Registrations/Manual">
										Manual-Registration
									</a>
								</li>
								<li className="nav-item">
									<a className="nav-link" href="/Donations/Create">
										Donations
									</a>
								</li>
								<li className="nav-item">
									<a className="nav-link" href="/Sponsorships/Create">
										Sponsorships
									</a>
								</li>
								<li className="nav-item">
									<a className="nav-link" href="/Events">
										Events
									</a>

								</li>
								<li className="nav-item">
									<p className="nav-link"> {currentUser && userName}</p>
								</li>
								<li className="nav-item-right">
									<a className="nav-link" onClick={handleLogout} href="/login">
										Logout
									</a>
								</li>
							</ul>
						</div>}

					{!currentUser &&
						<div>
							<ul className="navbar-nav me-auto mb-2 mb-md-0">
								<li className="nav-item">
									<a className="nav-link-title" href="/">
										Hot Rides Auto Expo
									</a>
								</li>

								<li className="nav-item">
									<a className="nav-link" href="/Events">
										Events
									</a>

								</li>

								<li className="nav-item-right">
									<a className="nav-link" href="/login">
										Login
								</a>
								</li>
							</ul>
						</div>
					}
				</div>
			</nav>
		</header>
	);
};

export default Header;
