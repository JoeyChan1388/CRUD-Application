import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';

const Login = () => {
	const [ email, setEmail ] = useState('');
	const [ password, setPassword ] = useState('');
	const { signup } = useAuth();
	const [error, setError] = useState('')
	const [loading, setLoading] = useState('')

	// Signup
	async function submitReview() {
		try{
			setLoading(true)
			await signup(email, password)
		} 
		catch {
			setError("Failed to make an account!")
		}
		setLoading(false)
	};

	return (
		<div className="form-page">
			<h1 className="title"> User Registration </h1>
			<ul className="form-style-1">
				<li>
					<label>
						Email <span className="required">*</span>
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
						Password <span className="required">*</span>
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
					<button onClick={submitReview} type="submit" disabled={loading} >
						Submit
					</button>
				</li>
				<p> 
					Have an account?
					<a href="/login"> Login </a>
				</p>
			</ul>
		</div>
	);
};

export default Login;
