import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import axios from 'axios';

const Donate = () => {
	const [amount, setAmount] = useState('')
	const [eventID, setEventID] = useState(1)
	const [error, setError] = useState("")
	const [loading, setLoading] = useState(false)
	const history = useHistory()
	const { currentUser } = useAuth();
	const [eventsList, setEventsList] = useState([]);

	// Grab events list on page load
	useEffect(() => {
		axios.get("http://localhost:3001/Events/get").then((response) => {
			setEventsList(response.data);
		})
	}, [])

	if (!currentUser) {
		history.push('/login');
	}

	// On Button Click
	async function submitReview() {
		setLoading(true)
		axios
			.post('http://localhost:3001/Donations/insert', {
				userid: currentUser.uid,
				eventid: eventID,
				amount: amount
			}).then((response) => {
				console.log(response)
			})

		setLoading(false)
	};

	return (
		<div className="form-page">
			<h1 className="title"> Make a Donation </h1>
			<ul className="form-style-1">
				<li>
					<label>
						Amount <span className="required">*</span>
					</label>
					<input
						type="text"
						name="DonationAmount"
						className="field-long"
						onChange={(e) => {
							setAmount(e.target.value);
						}}
						required
					/>
				</li>
				<li>
					<label>
						Event <span className="required">*</span>
					</label>
					<select id="Event"
						onChange={(e) => setEventID(e.target.value)}>
						{eventsList.map((val, key) => {
							return (
								<option value={val.Event_ID}>{val.Event_Name}</option>
							)
						})}
					</select>
				</li>
				<li>
					<p> {error} </p>
				</li>
				<li>
					<button onClick={submitReview} type="submit" disabled={loading}>
						Submit
					</button>
				</li>
			</ul>
		</div>
	);
};

export default Donate;
