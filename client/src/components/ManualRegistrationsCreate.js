import React, { useState } from 'react';
import axios from 'axios';

const ParticipantsCreate = () => {
	const [ firstName, setFirstName ] = useState('');
	const [ lastName, setLastName ] = useState('');
	const [ shirtSize, setShirtSize ] = useState('M');
	const [ clubName, setClubName ] = useState('');
	const [ vehicleMake, setVehicleMake ] = useState('');
	const [ vehicleModel, setVehicleModel ] = useState('');
	const [ vehicleYear, setVehicleYear ] = useState('');

	// Submit POST Request to back end at this URL
	const submitReview = () => {
		console.log('Submitting:');
		console.log(firstName);
		console.log(lastName);

		axios
			.post('http://localhost:3001/api/insert', {
				firstName: firstName,
				lastName: lastName,
				shirtSize: shirtSize,
				clubName: clubName,
				vehicleMake: vehicleMake,
				vehicleModel: vehicleModel,
				vehicleYear: vehicleYear
			})
			.then((response) => {
				console.log(response);
			});
	};

	return (
		<div>
			<h1 className="title"> Manual Registration Entry Form </h1>

			<h1 className="title"> Participant Info </h1>
			<ul className="form-style-1">
				<li>
					<label>First Name:</label>
					<input
						type="text"
						name="firstName"
						onChange={(e) => {
							setFirstName(e.target.value);
						}}
						required
					/>
				</li>
				<li>
					<label>Last Name: </label>
					<input
						type="text"
						name="lastName"
						onChange={(e) => {
							setLastName(e.target.value);
						}}
						required
					/>
				</li>

				<li>
					<label>Participant's Shirt Size: </label>
					<input
						type="text"
						name="shirtSize"
						onChange={(e) => {
							setShirtSize(e.target.value);
						}}
						required
					/>
				</li>

				<li>
					<label>Club: </label>
					<input
						type="text"
						name="clubName"
						onChange={(e) => {
							setClubName(e.target.value);
						}}
						required
					/>
				</li>
			</ul>

			<h2 className="title"> Vehicle Info </h2>
			<ul className="form-style-1">
				<li>
					<label>Make: </label>
					<input
						type="text"
						name="vehicleMake"
						onChange={(e) => {
							setVehicleMake(e.target.value);
						}}
						required
					/>
				</li>

				<li>
					<label>Model: </label>
					<input
						type="text"
						name="vehicleModel"
						onChange={(e) => {
							setVehicleModel(e.target.value);
						}}
						required
					/>
				</li>

				<li>
					<label>Year: </label>
					<input
						type="number"
						name="vehicleYear"
						onChange={(e) => {
							setVehicleYear(e.target.value);
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
