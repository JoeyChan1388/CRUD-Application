import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const SelfRegistrationsCreate = () => {
	const [eventsList, setEventsList] = useState([])
	const [shirtSize, setShirtSize] = useState('M');
	const [clubName, setClubName] = useState('');
	const [vehicleMake, setVehicleMake] = useState('');
	const [vehicleModel, setVehicleModel] = useState('');
	const [vehicleYear, setVehicleYear] = useState('');
	const [eventID, setEventID] = useState(1);
	const [eventFee, setEventFee] = useState(0);
	const { currentUser } = useAuth();
	const history = useHistory();

	const getEventFromID = (id) => {
		axios.post("http://localhost:3001/Event/get", {
			id: id,
		}).then((response) => {
			console.log(response)
			setEventFee(response.data[0].Event_Registration_Fee);
		})
	}

	// Grab events list on page load
	useEffect(() => {
		axios.get("http://localhost:3001/Events/get").then((response) => {
			setEventsList(response.data)
		})
	}, [])

	useEffect(() => {
		getEventFromID(eventID)
		document.getElementById('fee').textContent = ("Price: " + eventFee)
	}, [eventID])

	if (!currentUser) {
		history.push('/login');
	}

	// Submit POST Request to back end at this URL
	const submitReview = () => {
		axios
			.post('http://localhost:3001/registrations/insert', {
				userid: currentUser.uid,
				shirtSize: shirtSize,
				clubName: clubName,
				eventid: eventID,
				vehicleMake: vehicleMake,
				vehicleModel: vehicleModel,
				vehicleYear: vehicleYear,
				price: eventFee
			})
			.then((response) => {
				console.log(response);
				history.push('/');
			});
	};

	return (
		<div className="form-page">
			<h1 className="title"> Register For an Event! </h1>
			<ul className="form-style-1">
				<li>
					<label>
						Shirt Size
					</label>
					<input
						type="text"
						name="shirtSize"
						className="field-long"
						onChange={(e) => {
							setShirtSize(e.target.value);
						}}
						required
					/>
				</li>
				<li>
					<label>
						Club
					</label>
					<input
						type="text"
						name="clubName"
						className="field-long"
						onChange={(e) => {
							setClubName(e.target.value);
						}}
						required
					/>
				</li>
				<li>
					<label>
						Car Make / Model
					</label>
					<input
						type="text"
						name="VehicleMake"
						className="field-divided"
						placeholder="Make"
						onChange={(e) => {
							setVehicleMake(e.target.value);
						}}
						required
					/>{' '}
					<input
						type="text"
						name="VehicleModel"
						className="field-divided"
						placeholder="Model"
						onChange={(e) => {
							setVehicleModel(e.target.value);
						}}
						required
					/>
				</li>
				<li>
					<label>
						Year
					</label>
					<input
						type="number"
						name="VehicleYear"
						className="field-divided"
						placeholder="Year"
						onChange={(e) => {
							setVehicleYear(e.target.value);
						}}
						required
					/>
				</li>
				<li>
					<label>
						Event
					</label>
					<select
						id="Event"
						onChange={(e) => {
							setEventID(e.target.value);
							console.log(eventID)
						}}>
						{eventsList.map((val, key) => {
							return (
								<option value={val.Event_ID}>{val.Event_Name}</option>
							)
						})}
					</select>
				</li>
				<li>
					<p id='fee'> Fee: {eventFee} </p>
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

export default SelfRegistrationsCreate;
