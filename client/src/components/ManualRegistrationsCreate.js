import React, { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const makeid = (length) => {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * 
 charactersLength));
   }
   return result;
}


const ParticipantsCreate = () => {
	const [ firstName, setFirstName ] = useState('');
	const [ lastName, setLastName ] = useState('');
	const [email, setEmail] = useState('');
	const [ phoneNumber, setPhoneNumber] = useState('');
	const [address, setAddress] = useState('');
	const [eventid, setEventID] = useState(0);
	const [ shirtSize, setShirtSize ] = useState('M');
	const [ clubName, setClubName ] = useState('');
	const [ vehicleMake, setVehicleMake ] = useState('');
	const [ vehicleModel, setVehicleModel ] = useState('');
	const [ vehicleYear, setVehicleYear ] = useState('');

	const { currentUser } = useAuth();
	const history = useHistory();

	if (!currentUser) {
		history.push('/login');
	}

	// Submit POST Request to back end at this URL
	const submitReview = () => {
		axios
			.post('http://localhost:3001/registrations/insert', {
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
				eventid: eventid
			})
			.then((response) => {
				console.log(response);
			});
	};

	return (
		<div className="form-page">
			<h1 className="title"> Manually Register a Participant </h1>
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
					<label>
						Shirt Size <span className="required">*</span>
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
						Club <span className="required">*</span>
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
						Car Make / Model <span className="required">*</span>
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
						Year <span className="required">*</span>
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
						Event ID <span className="required">*</span>
					</label>
					<input
						type="number"
						name="EventID"
						className="field-divided"
						placeholder="ID"
						onChange={(e) => {
							setEventID(e.target.value);
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

export default ParticipantsCreate;
