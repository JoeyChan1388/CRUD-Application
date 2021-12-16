import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

// For making a UID to go along with each manually created user
const makeid = (length) => {
	var result = '';
	var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
	var charactersLength = characters.length;
	for (var i = 0; i < length; i++) {
		result += characters.charAt(Math.floor(Math.random() *
			charactersLength));
	}
	return result;
}

const ParticipantsCreate = () => {
	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
	const [email, setEmail] = useState('');
	const [phoneNumber, setPhoneNumber] = useState('');
	const [address, setAddress] = useState('');
	const [eventID, setEventID] = useState(1);
	const [shirtSize, setShirtSize] = useState('M');
	const [clubName, setClubName] = useState('');
	const [vehicleMake, setVehicleMake] = useState('');
	const [vehicleModel, setVehicleModel] = useState('');
	const [vehicleYear, setVehicleYear] = useState('');
	const [eventsList, setEventsList] = useState([]);
	const [paymentType, setPaymentType] = useState('CASH')
	const [eventFee, setEventFee] = useState(0);

	const { currentUser } = useAuth();
	const history = useHistory();

	// Go back if not admin or helper
	if (currentUser) {
		axios.post('http://localhost:3001/user/get', {
			id: currentUser.uid,
		}).then((response) => {
			if (response.data[0]) {
				if (response.data[0].User_Role === "User") {
					history.goBack();
				}
			}
		})
	} else {
		history.goBack();
	}

	// Get registration fee from selected event
	const getEventFromID = (id) => {
		axios.post("http://localhost:3001/Event/get", {
			id: id,
		}).then((response) => {
			setEventFee((response.data[0].Event_Registration_Fee));
		})
	}

	// Update event data when a new option is selected
	useEffect(() => {
		getEventFromID(eventID)
		document.getElementById('fee').textContent = ("Registration Fee: " + eventFee);
	}, [eventID, eventFee])

	// Grab events list on page load
	useEffect(() => {
		axios.get("http://localhost:3001/Events/get").then((response) => {
			setEventsList(response.data)
		})
	}, [])

	// Submit POST Request to back end at this URL
	const submitReview = () => {
		axios
			.post('http://localhost:3001/manualregistrations/insert', {
				userid: makeid(30),
				firstName: firstName,
				lastName: lastName,
				phoneNumber: phoneNumber,
				address: address,
				email: email,
				shirtSize: shirtSize,
				clubName: clubName,
				vehicleMake: vehicleMake,
				vehicleModel: vehicleModel,
				vehicleYear: vehicleYear,
				eventid: eventID,
				price: eventFee,
				paymentType: paymentType,
			})
			.then((response) => {
				history.push('/');
			});
	};

	// Return Page Contents
	return (
		<div className="form-page">
			<h1 className="title"> Manually Register a Participant </h1>
			<ul className="form-style-1">
				<li>
					<label>
						Full Name
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
						Phone Number
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
						Address
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
						Email
					</label>
					<input
						type="text"
						name="Email"
						className="field-long"
						placeholder="jdoe@dcmail.ca"
						onChange={(e) => {
							setEmail(e.target.value);
						}}
						required
					/>
				</li>
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
					<select id="Event"
						onChange={(e) => {
							setEventID(e.target.value);
						}}>
						{eventsList.map((val, key) => {
							return (
								<option value={val.Event_ID}>{val.Event_Name}</option>
							)
						})}
					</select>
				</li>
				<li>
					<label>
						Payment Type
					</label>
					<select id="paymentType"
						onChange={(e) => {
							setPaymentType(e.target.value);
						}}>
						<option value={"CHECK"}>Check</option>
						<option value={"CASH"}>Cash</option>
					</select>
				</li>
				<li>
					<p id='fee'> Registration Fee: {eventFee} </p>
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

export default ParticipantsCreate;
