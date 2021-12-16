import React, { useState, useEffect, useLayoutEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import axios from 'axios';

const SponsorshipCreate = () => {
	const [organization, setOrganization] = useState('');
	const [eventID, setEventID] = useState(1);
	const [sponsorshipPackageID, setSponsorshipPackageID] = useState(1);
	const [SponsorshipPackageData, setSponsorshipPackageData] = useState([]);
	const [loading, setLoading] = useState(false);
	const history = useHistory();
	const { currentUser } = useAuth();
	const [eventsList, setEventsList] = useState([]);
	const [packageList, setPackageList] = useState([]);
	const [sponsorshipInfo, setSponsorshipInfo] = useState('');

	if (!currentUser) {
		history.push('/login');
	}

	function GetPackageFromID(id) {
		axios.post("http://localhost:3001/SponsorshipPackage/get", {
			id: id,
		}).then((response) => {
			console.log(response.data[0])
			setSponsorshipPackageData(response.data[0]);
		})
	}

	// Handle Async Change for sponsorshipPackege and price
	useEffect(() => {
		GetPackageFromID(sponsorshipPackageID)
		document.getElementById('price').textContent = ('Price: $' + SponsorshipPackageData.Sponsorship_Package_Price)
		document.getElementById('info').textContent = (SponsorshipPackageData.Sponsorship_Package_Info)
	}, [sponsorshipPackageID, SponsorshipPackageData.Sponsorship_Package_Price])

	// Grab events and packages list on page load
	useEffect(() => {
		axios.get("http://localhost:3001/Events/get").then((response) => {
			setEventsList(response.data);
		})

		axios.get("http://localhost:3001/Packages/get").then((response) => {
			setPackageList(response.data);
		})

		setSponsorshipPackageID(1);
	}, [])

	async function submitReview() {
		setLoading(true)

		axios
			.post('http://localhost:3001/Sponsorships/insert', {
				userid: currentUser.uid,
				eventid: eventID,
				organization: organization,
				packageid: SponsorshipPackageData.Sponsorship_Package_ID,
				price: SponsorshipPackageData.Sponsorship_Package_Price,
				info: sponsorshipInfo
			}).then((response) => {
				console.log(response)
			})
		setLoading(false)
	};

	return (
		<div className="form-page">
			<h1 className="title"> Sponsor an Event </h1>
			<ul className="two-columns">
				<li>
					<ul className="form-style-1-empty">
						<li>
							<h1> Sponsorship Info</h1>
							<p id="info"> Select A Package </p>
						</li>
					</ul>
				</li>
				<li>
					<ul className="form-style-1">
						<li>
							<label>
								Organization
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
								Sponsorship Package
					</label>
							<select id="sponsorship_package"
								onChange={(e) => setSponsorshipPackageID(e.target.value)}>
								{packageList.map((val, key) => {
									return (
										<option value={val.Sponsorship_Package_ID}>{val.Sponsorship_Package}</option>
									)
								})}
							</select>
						</li>
						<li>
							<label>
								Event
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
							<label>
								Details
					</label>
							<textarea className="form-style-1" cols="38" rows="4" onChange={(e) => setSponsorshipInfo(e.target.value)} />
						</li>
						<li>
							<p id="price"> Price: 0 </p>
						</li>
						<li>
							<button onClick={submitReview} type="submit" disabled={loading}>
								Submit
					</button>
						</li>
					</ul>
				</li>
			</ul>
		</div>
	)
}

export default SponsorshipCreate;
