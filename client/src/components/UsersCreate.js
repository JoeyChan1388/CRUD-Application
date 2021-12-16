import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useHistory } from 'react-router-dom'
import axios from 'axios';

const Login = () => {
	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
	const [email, setEmail] = useState('');
	const [address, setAddress] = useState('');
	const [phoneNumber, setPhoneNumber] = useState('');
	const [password, setPassword] = useState('');
	const { signup, currentUser } = useAuth();
	const [error, setError] = useState('')
	const [loading, setLoading] = useState('')
	const history = useHistory();

	// When a user is specified (submitted) add its corresponding data
	// to the DB for later use.
	useEffect(() => {
		try {
			axios.post('http://localhost:3001/users/insert', {
				userid: currentUser.uid,
				firstName: firstName,
				lastName: lastName,
				email: email,
				phoneNumber: phoneNumber,
				address: address,
			}).then((response) => {
				console.log(response);
			});
		} catch (e) {
			console.log(e);
		} finally {
			if (currentUser) {
				history.push('/login')
			}
		}
	}, [currentUser])

	// Signup button click
	async function submitReview() {
		try {
			setLoading(true);
			await signup(email, password);
		}
		catch (e) {
			console.log(e)
			setError("Failed to make an account!");
		}
		setLoading(false)
	};

	// Return Page Contents
	return (
		<div className="form-page">
			<h1 className="title"> Sign up Here! </h1>
			<ul className="form-style-1">
				<li>
					<label>
						Full Name
					</label>
					<input
						type="text"
						name="firstName"
						className="field-divided"
						placeholder="First"
						onChange={(e) => {
							setFirstName(e.target.value);
						}}
						required
					/>{' '}
					<input
						type="text"
						name="lastName"
						className="field-divided"
						placeholder="Last"
						onChange={(e) => {
							setLastName(e.target.value);
						}}
						required
					/>
				</li>
				<li>
					<label>
						Phone Number
					</label>
					<input
						type="text"
						name="shirtSize"
						className="field-long"
						placeholder="1235467890"
						onChange={(e) => {
							setPhoneNumber(e.target.value);
						}}
						required
					/>
				</li>
				<li>
					<label>
						Password
					</label>
					<input
						type="password"
						name="password"
						className="field-long"
						onChange={(e) => {
							setPassword(e.target.value);
						}}
						required
					/>
				</li>
				<li>
					<label>
						Address
					</label>
					<input
						type="text"
						name="clubName"
						className="field-long"
						onChange={(e) => {
							setAddress(e.target.value);
						}}
						required
					/>
				</li>
				<li>
					<label>
						Email
					</label>
					<input
						type="text"
						name="VehicleMake"
						className="field-long"
						placeholder="jdoe@dcmail.ca"
						onChange={(e) => {
							setEmail(e.target.value);
						}}
						required
					/>
				</li>
				<li>
					<button onClick={submitReview} disabled={loading} type="submit">
						Submit
					</button>
				</li>
				<li>
					<h3>{error}</h3>
				</li>
				<li>
					Have an account?
					<a href="/Login">Login</a>
				</li>
			</ul>
		</div>
	);
};

export default Login;
