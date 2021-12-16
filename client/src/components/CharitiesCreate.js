import React, { useState } from 'react'
import { useHistory } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import axios from 'axios';

const CharitiesCreate = () => {
	const { currentUser } = useAuth();
	const history = useHistory();
	const [name, setName] = useState('');
	const [loading, setLoading] = useState(false);

	// If signed out redirect to login
	if (!currentUser) {
		history.push('/login');
	}

	// When submit button is clicked
	async function submitReview() {
		setLoading(true)
		axios
			.post('http://localhost:3001/charities/insert', {
				charityName: name,
			}).then((response) => {
				console.log(response)
			})
		setLoading(false)
	}

	// Return Page Contents
	return (
		<div className="form-page">
			<h1 className="title"> Add a Charity </h1>
			<ul className="form-style-1">
				<li>
					<label>
						Charity Name <span className="required">*</span>
					</label>
					<input
						type="text"
						name="Name"
						className="field-long"
						onChange={(e) => {
							setName(e.target.value);
						}}
						required
					/>
				</li>
				<li>
					<button onClick={submitReview} type="submit" disabled={loading}>
						Submit
					</button>
				</li>
			</ul>
		</div>
	)
}

export default CharitiesCreate
