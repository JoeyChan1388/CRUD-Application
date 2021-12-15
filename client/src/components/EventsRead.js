import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

const EventsRead = () => {
	const [eventsList, setEventsList] = useState([]);
	const history = useHistory();

	// Grab events list on page load
	useEffect(() => {
		axios.get("http://localhost:3001/Events/get").then((response) => {
			setEventsList(response.data);
		})
	}, [])

	const handleSubmit = () => {
		history.push("/Events/Create")
	}

	return (
		<div className="home">
			<h3 className="home"> Events </h3>
			<h2 className="home"> These are all the events! </h2>

			<ul>
				{eventsList.map((val, key) => {
					return (
						<li className="event">
							<h3>ID {val.Event_ID}: {val.Event_Name}</h3>
							<h4>Organizer: {val.Event_Organizer_First_Name} {val.Event_Organizer_Last_Name}</h4>
							<h4>Address: {val.Event_Address}</h4>
							<h4>Date: {val.Event_Date}</h4>
							<a href={'/Events/' + val.Event_ID}> View Revenue Info </a>
						</li>
					)
				})}
			</ul>

			<button className="form-style-1" onClick={handleSubmit} type="submit">
				Create an Event
			</button>
		</div>
	);
};

export default EventsRead;
