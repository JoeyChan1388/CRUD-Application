import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext'

const Login = () => {
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const { login } = useAuth()
	const [error, setError] = useState("")
	const [loading, setLoading] = useState(false)
	const history = useHistory()

	// On Button Click
	async function submitReview() {
		try {
			setError("")
			setLoading(true)
			await login(email, password)
			history.push("/")
		} catch {
			setError("Failed to log in")
		}

		setLoading(false)
	};

	return (
		<div className="form-page">
			<h1 className="title"> User Login </h1>
			<ul className="form-style-1">
				<li>
					<label>
						Email
					</label>
					<input
						type="email"
						name="email"
						className="field-long"
						onChange={(e) => {
							setEmail(e.target.value);
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
					<p> {error} </p>
				</li>
				<li>
					<button onClick={submitReview} type="submit" disabled={loading}>
						Submit
					</button>
				</li>
				<p>
					Need an account?
					<a href="/signup">Sign Up</a>
				</p>
			</ul>
		</div>
	);
};

export default Login;
