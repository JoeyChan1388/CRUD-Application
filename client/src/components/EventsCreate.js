import React, {useState} from 'react'
import {useHistory} from 'react-router-dom';
import {useAuth} from '../contexts/AuthContext';
import axios from 'axios';

const EventsCreate = () => {
    const { currentUser } = useAuth();
    const history = useHistory()
    const [address, setAddress] = useState('')
    const [date, setDate] = useState('')
    const [name, setName] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState('')
    const [organizerFirstName, setOrganizerFirstName] = useState('Joey')
    const [organizerLastName, setOrganizerLastName] = useState('Chan')

    if (!currentUser) {
		history.push('/login');
	}

    async function submitReview() {
        setLoading(true)
		axios
			.post('http://localhost:3001/events/insert', {
                eventAddress: address,
                eventDate: date,
                eventName: name,
                organizerFirstName: organizerFirstName,
                organizerLastName: organizerLastName
			}).then((response) => {
				console.log(response)
			})
		  setLoading(false)
    }

    return (
<div className="form-page">
			<h1 className="title"> Start an Event </h1>
			<ul className="form-style-1">
				<li>
					<label>
						Address <span className="required">*</span>
					</label>
					<input
						type="text"
						name="Address"
						className="field-long"
						onChange={(e) => {
							setAddress(e.target.value);
						}}
						required
					/>
				</li>
                <li>
					<label>
						Date <span className="required">*</span>
					</label>
					<input
						type="date"
						name="Date"
						className="field-long"
						onChange={(e) => {
							setDate(e.target.value);
						}}
						required
					/>
				</li>
                <li>
					<label>
						Event Name <span className="required">*</span>
					</label>
					<input
						type="text"
						name="Name"
						className="field-long"
						onChange={(e) => {
							setName(e.target.value);
						}}
						required
					/>
				</li>
				<li>
					<p> {error} </p>		
				</li>
				<li>
					<button onClick={submitReview} type="submit" disabled={loading}>
						Submit
					</button>
				</li>
			</ul>
		</div>
    )
}

export default EventsCreate
