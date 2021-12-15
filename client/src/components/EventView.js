import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';


const EventView = () => {
    const { id } = useParams();
    const [eventData, setEventData] = useState([]);
    const [participantCount, setParticipantCount] = useState(0);
    const [donationCount, setDonationCount] = useState(0);
    const [sponsorshipCount, setSponsorshipCount] = useState(0);
    const [registrationAmount, setRegistrationAmount] = useState(0);
    const [donationAmount, setDonationAmount] = useState(0);
    const [sponsorshipAmount, setSponsorshipAmount] = useState(0);

    // Grab events list on page load
    useEffect(() => {
        axios.post("http://localhost:3001/EventInfo/get", { id: id }).then((response) => {
            setEventData(response.data.eventData[0]);
            setParticipantCount(response.data.participantCount[0].participants)
            setDonationCount(response.data.donationCount[0].donations)
            setSponsorshipCount(response.data.sponsorshipCount[0].sponsorships)
        })

        axios.post("http://localhost:3001/EventRevenue/get", { id: id }).then((response) => {
            console.log(response.data)

            var total = 0;
            for (var a in response.data.registrationsAmount) {
                total += response.data.registrationsAmount[a].Transaction_Amount;
            }
            setRegistrationAmount(total)

            total = 0;
            for (var b in response.data.donationsAmount) {
                total += response.data.donationsAmount[b].Transaction_Amount;
            }
            setDonationAmount(total)

            total = 0;
            for (var c in response.data.sponsorshipsAmount) {
                total += response.data.sponsorshipsAmount[c].Transaction_Amount;
            }
            setSponsorshipAmount(total)
        });
    }, [id])

    return (
        <div className="home">
            <ul className="form-style-1">
                <h2> Info For {eventData.Event_Name}! </h2>
                <h3> Participants: {participantCount} </h3>
                <h4> Revenue Generated: ${registrationAmount} </h4>
                <h3> Donations: {donationCount} </h3>
                <h4> Revenue Generated: ${donationAmount} </h4>
                <h3> Sponsorships: {sponsorshipCount}</h3>
                <h4> Revenue Generated: ${sponsorshipAmount}</h4>
            </ul>
        </div>
    )
}

export default EventView
