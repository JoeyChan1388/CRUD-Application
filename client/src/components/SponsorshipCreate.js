import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import axios from 'axios';

const SponsorshipCreate = () => {
	const [organization, setOrganization] = useState('')
	const [eventID, setEventID] = useState(1)
	const [sponsorshipPackage, setSponsorshipPackage] = useState(1)
	const [SponsorshipPrice, setSponsorshipPrice] = useState(0)
	const [error, setError] = useState("")
	const [loading, setLoading] = useState(false)
	const history = useHistory()
	const { currentUser } = useAuth();
	const [eventsList, setEventsList] = useState([]);
	const [packageList, setPackageList] = useState([]);

	if (!currentUser) {
		history.push('/login');
	}

	function GetPriceFromID(id) {
		let price = 0
		axios.post("http://localhost:3001/Sponsorshipprice/get", {
			id: id,
		}).then((response) => {
			price = response.data[0].Sponsorship_Package_Price;
			setSponsorshipPrice(price)
		})
		return price;
	}

	// Handle Async Change for sponsorshipPackege and price
	useEffect(() => {
		GetPriceFromID(sponsorshipPackage)
		document.getElementById('price').textContent = ('Price: $' + SponsorshipPrice)
	}, [sponsorshipPackage, SponsorshipPrice])

	// Grab events and packages list on page load
	useEffect(() => {
		axios.get("http://localhost:3001/Events/get").then((response) => {
			setEventsList(response.data);
		})

		axios.get("http://localhost:3001/Packages/get").then((response) => {
			setPackageList(response.data);
		})
	}, [])

	async function submitReview() {
		setLoading(true)
		axios
			.post('http://localhost:3001/Sponsorships/insert', {
				userid: currentUser.uid,
				eventid: eventID,
				organization: organization,
				packageid: sponsorshipPackage
			}).then((response) => {
				console.log(response)
			})

		setLoading(false)
	};

	return (
		<div className="form-page">
			<h1 className="title"> Sponsor an Event </h1>
			<ul className="form-style-1">
				<li>
					<label>
						Organization <span className="required">*</span>
					</label>
					<input
						type="text"
						name="DonationAmount"
						className="field-long"
						onChange={(e) => setOrganization(e.target.value)}
						required
					/>
				</li>
				<li>
					<label>
						Sponsorship Package <span className="required">*</span>
					</label>
					<select id="sponsorship_package"
						onChange={(e) => setSponsorshipPackage(e.target.value)}>
						{packageList.map((val, key) => {
							return (
								<option value={val.Sponsorship_Package_ID}>{val.Sponsorship_Package}</option>
							)
						})}
					</select>
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
					<p id="price"> Price: {SponsorshipPrice} </p>
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

export default SponsorshipCreate;
