import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import axios from 'axios';

const Donate = () => {
	const [amount, setAmount] = useState(0);
	const [eventID, setEventID] = useState(1);
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);
	const history = useHistory();
	const { currentUser } = useAuth();
	const [eventsList, setEventsList] = useState([]);
	const [charitiesList, setCharitiesList] = useState([]);
	const [charityID, setCharityID] = useState([]);

	// Grab events list on page load
	useEffect(() => {
		axios.get("http://localhost:3001/Events/get").then((response) => {
			setEventsList(response.data);
		})

		axios.get("http://localhost:3001/Charities/get").then((response) => {
			setCharitiesList(response.data);
		})
	}, [])

	if (!currentUser) {
		history.push('/login');
	}

	const handleAmountButton = (amount) => {
		document.getElementById('amount').value = amount;
	}

	// On Button Click
	async function submitReview() {
		setLoading(true)
		axios
			.post('http://localhost:3001/Donations/insert', {
				userid: currentUser.uid,
				eventid: eventID,
				amount: amount,
				charityid: charityID
			}).then((response) => {
				history.push('/Donations/Reciept/' + response.data.insertId);
			})

		setLoading(false)
	};

	return (
		<div className="form-page">
			<h1 className="title"> Make a Donation </h1>
			<ul className="form-style-1">
				<h1 className="title"> Give Securely </h1>
				<li>
					<button onClick={() => handleAmountButton(10)} className="donate-button"> $10 </button>
					<button onClick={() => handleAmountButton(50)} className="donate-button"> $50 </button>
					<button onClick={() => handleAmountButton(100)} className="donate-button"> $100 </button>
				</li>
				<li>
					<button onClick={() => handleAmountButton(250)} className="donate-button"> $250 </button>
					<button onClick={() => handleAmountButton(500)} className="donate-button"> $500 </button>
					<button onClick={() => handleAmountButton(1000)} className="donate-button"> $1000 </button>
				</li>
				<li>
					<label>
						Personalize Your Amount
					</label>
					<input
						id="amount"
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
						Event / Charity
					</label>
					<select id="Event"
						onChange={(e) => setEventID(e.target.value)}>
						{eventsList.map((val, key) => {
							return (
								<option value={val.Event_ID}>{val.Event_Name}</option>
							)
						})}
					</select>
					<select id="Charity"
						onChange={(e) => setCharityID(e.target.value)}>
						{charitiesList.map((val, key) => {
							return (
								<option value={val.Charity_ID}>{val.Charity_Name}</option>
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
