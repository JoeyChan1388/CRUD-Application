import React, { useState, useEffect } from 'react';
import axios from 'axios';

const EventsRead = () => {
	const [eventsList, setEventsList] = useState([]);

	// Grab events list on page load
	useEffect(() => {
		axios.get("http://localhost:3001/Events/get").then((response) => {
			setEventsList(response.data);
		})
	}, [])

	return (
		<div className="home">
			<h3 className="home"> Events </h3>
			<h2 className="home"> These are all the events! </h2>

			{eventsList.map((val, key) => {
				return (
					<div className="event">
						<h3>ID {val.Event_ID}: {val.Event_Name}</h3>
						<h4>Organizer: {val.Event_Organizer_First_Name} {val.Event_Organizer_Last_Name}</h4>
						<h4>Address: {val.Event_Address}</h4>
						<h4>Date: {val.Event_Date}</h4>
					</div>
				)
			})}

			<a href="/Events/Create"> Create an Event </a>
		</div>
	);
};

export default EventsRead;
