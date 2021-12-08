import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
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

	// Signup
	function submitReview() {
		try{
			setLoading(true);
			signup(email, password);
		} 
		catch {
			setError("Failed to make an account!");
		}
		finally {
			if (currentUser) {
				axios.post('http://localhost:3001/users/insert', {
					userid: currentUser.uid,
					firstName: firstName,
					lastName: lastName,
					email: email,
					phoneNumber: phoneNumber,
					address: address
				}).then((response) => {
					console.log(response);
				});
			}
		}
		setLoading(false)
	};

	return (
		<div className="form-page">
			<h1 className="title"> Sign up Here! </h1>
			<ul className="form-style-1">
				<li>
					<label>
						Full Name <span className="required">*</span>
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
						Phone Number <span className="required">*</span>
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
					<label>
						Address <span className="required">*</span>
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
						Email <span className="required">*</span>
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
