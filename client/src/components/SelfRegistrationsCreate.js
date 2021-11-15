import React, { useState } from 'react';
import axios from 'axios';

const SelfRegistrationsCreate = () => {
	const [ firstName, setFirstName ] = useState('');
	const [ lastName, setLastName ] = useState('');
	const [ shirtSize, setShirtSize ] = useState('M');
	const [ clubName, setClubName ] = useState('');
	const [ vehicleMake, setVehicleMake ] = useState('');
	const [ vehicleModel, setVehicleModel ] = useState('');
	const [ vehicleYear, setVehicleYear ] = useState('');

	// Submit POST Request to back end at this URL
	const submitReview = () => {
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
		<div className="form-page">
			<h1 className="title"> Self Registration Entry </h1>
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
					<button onClick={submitReview} type="submit">
						Submit
					</button>
				</li>
			</ul>
		</div>
	);
};

export default SelfRegistrationsCreate;
