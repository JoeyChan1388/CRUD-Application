import React, { useState, useEffect } from 'react';
import axios from 'axios';

const EventsSummary = () => {
    const [eventsList, setEventsList] = useState([]);
    const [eventInfo, setEventInfo] = useState([]);

    const getEventInfo = (id) => {
        axios.post("http://localhost:3001/Events/Info/get", { id: id }).then((response) => {
            setEventInfo(response.data.eventInfo);
        })
    }

    // Grab events list on page load
    useEffect(() => {
        axios.get("http://localhost:3001/Events/get").then((response) => {
            setEventsList(response.data);
        })
    }, [])

    return (
        <div className="home">
            <h2 className="home"> Events Summary </h2>

            <table>
                <thead>
                    <tr className="summary">
                        <th> Event </th>
                        <th> Organizer First Name </th>
                        <th> Organizer Last Name </th>
                        <th> Event Address </th>
                        <th> Participants </th>
                        <th> Donations </th>
                        <th> Sponsors </th>
                    </tr>
                </thead>
                <tbody>
                    {eventsList.map((val, key) => {
                        return (
                            <tr className="summary">
                                <td className="summary"> {val.Event_Name} </td>
                                <td className="summary" > {val.Event_Organizer_First_Name} </td>
                                <td className="summary"> {val.Event_Organizer_Last_Name} </td>
                                <td className="summary"> {val.Event_Address} </td>
                                <td className="summary"> { } </td>
                                {getEventInfo(val.Event_ID)}
                            </tr>
                        )
                    })}
                </tbody>
            </table >
        </div >
    )
}

export default EventsSummary
