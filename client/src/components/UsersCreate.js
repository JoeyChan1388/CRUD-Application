import React, { useState } from 'react';
import axios from 'axios';

const Login = () => {
	const [ email, setEmail ] = useState('');
	const [ password, setPassword ] = useState('');

	// Submit POST Request to back end at this URL
	const submitReview = () => {
		console.log('Submitting:');
		console.log(email);
		console.log(password);

		axios
			.post('http://localhost:3001/user/create/submit', {
				email: email,
				password: password
			})
			.then((response) => {
				console.log(response);
			});
	};

	return (
		<div>
			<h1 className="title"> User Registration </h1>
			<ul class="form-style-1">
				<li>
					<label>
						Email <span classname="required">*</span>
					</label>
					<input
						type="email"
						name="email"
						class="field-long"
						onChange={(e) => {
							setEmail(e.target.value);
						}}
						required
					/>
				</li>
				<li>
					<label>
						Password <span classname="required">*</span>
					</label>
					<input
						type="password"
						name="password"
						class="field-long"
						onChange={(e) => {
							setPassword(e.target.value);
						}}
						required
					/>
				</li>
				<li>
					<button onClick={submitReview} type="submit">
						Submit
					</button>
				</li>
			</ul>
		</div>
	);
};

export default Login;
