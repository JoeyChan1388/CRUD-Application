import React, { useState } from 'react';
import axios from 'axios';

const SelfRegistrationsCreate = () => {
	const [ firstName, setFirstName ] = useState('');
	const [ lastName, setLastName ] = useState('');

	// Submit POST Request to back end at this URL
	const submitReview = () => {
		console.log('Submitting:');
		console.log(firstName);
		console.log(lastName);

		axios
			.post('http://localhost:3001/api/insert', {
				firstName: firstName,
				lastName: lastName
			})
			.then((response) => {
				console.log(response);
			});
	};

	return (
		<div className="form">
			<h1> Self Registration Entry Form </h1>

			<label>Participant's First Name:</label>
			<input
				type="text"
				name="firstName"
				onChange={(e) => {
					setFirstName(e.target.value);
				}}
				required
			/>

			<label>Participant's Last Name: </label>
			<input
				type="text"
				name="lastName"
				onChange={(e) => {
					setLastName(e.target.value);
				}}
				required
			/>

			<button onClick={submitReview} type="submit">
				Submit
			</button>
		</div>
	);
};

export default SelfRegistrationsCreate;
