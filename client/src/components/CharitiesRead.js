import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

const CharitiesRead = () => {
	const [CharitiesList, setCharitiesList] = useState([]);
	const history = useHistory();

	// Grab charities list on page load
	useEffect(() => {
		axios.get("http://localhost:3001/Charities/get").then((response) => {
			setCharitiesList(response.data);
		})
	}, [])

	// Redirect to charity addition screen
	const handleSubmit = () => {
		history.push("/Charities/Create")
	}

	// Return Page Contents
	return (
		<div className="home">
			<h3 className="home"> Charities </h3>
			<h2 className="home"> These are all the supported charities! </h2>

			<ul>
				{CharitiesList.map((val, key) => {
					return (
						<li className="event">
							<h3>ID: {val.Charity_ID} <br /> Name: {val.Charity_Name} </h3>
						</li>
					)
				})}
			</ul>

			<button className="form-style-1" onClick={handleSubmit} type="submit">
				Create a Charity
			</button>
		</div>
	);
};

export default CharitiesRead;
