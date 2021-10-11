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
		console.log(vehicleModel);
		console.log(vehicleYear);

		axios
			.post('http://localhost:3001/registrations/insert', {
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
			<h1 className="title"> Manual Registration Entry </h1>
			<ul class="form-style-1">
				<li>
					<label>
						Full Name <span class="required">*</span>
					</label>
					<input
						type="text"
						name="firstName"
						class="field-divided"
						placeholder="First"
						onChange={(e) => {
							setFirstName(e.target.value);
						}}
						required
					/>{' '}
					<input
						type="text"
						name="lastName"
						class="field-divided"
						placeholder="Last"
						onChange={(e) => {
							setLastName(e.target.value);
						}}
						required
					/>
				</li>
				<li>
					<label>
						Shirt Size <span class="required">*</span>
					</label>
					<input
						type="text"
						name="shirtSize"
						class="field-long"
						onChange={(e) => {
							setShirtSize(e.target.value);
						}}
						required
					/>
				</li>
				<li>
					<label>
						Club <span class="required">*</span>
					</label>
					<input
						type="text"
						name="clubName"
						class="field-long"
						onChange={(e) => {
							setClubName(e.target.value);
						}}
						required
					/>
				</li>
				<li>
					<label>
						Car Make / Model <span class="required">*</span>
					</label>
					<input
						type="text"
						name="VehicleMake"
						class="field-divided"
						placeholder="Make"
						onChange={(e) => {
							setVehicleMake(e.target.value);
						}}
						required
					/>{' '}
					<input
						type="text"
						name="VehicleModel"
						class="field-divided"
						placeholder="Model"
						onChange={(e) => {
							setVehicleModel(e.target.value);
						}}
						required
					/>
				</li>
				<li>
					<label>
						Year <span class="required">*</span>
					</label>
					<input
						type="number"
						name="VehicleYear"
						class="field-divided"
						placeholder="Year"
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
