import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import axios from 'axios';

const DonationsReciept = () => {
    const { id } = useParams();
    const [userData, setUserData] = useState([]);
    const [eventData, setEventData] = useState([]);
    const [transactionData, setTransactionData] = useState([]);

    // Grab donation using specified id
    useEffect(() => {
        axios.post("http://localhost:3001/donation/get", { id: id }).then((response) => {
            console.log(response);
            setUserData(response.data.userData[0]);
            setEventData(response.data.eventData[0]);
            setTransactionData(response.data.transactionData[0]);
        })
    }, [id])

    // Show print screen
    const HandleClickPrint = () => {
        window.print();
        return false;
    }

    // Return Page Contents
    return (
        <div className="home">
            <ul className="form-style-1">
                <h2> Thanks For Your Donation! </h2>
                <h3 className="home"> Donation ID: {id} </h3>
                <h3 className="home"> Donation Amount: ${transactionData.transaction_amount} </h3>
                <h3 className="home"> Donation Time: {transactionData.transaction_date} </h3>
                <br />
                <h3 className="home"> Donor Name: {userData.User_First_Name + ' ' + userData.User_Last_Name} </h3>
                <h3 className="home"> Donor Phone #: {userData.User_Phone_Number} </h3>
                <h3 className="home"> Donor Address: {userData.User_Address} </h3>
                <br />
                <h3 className="home"> Event: {eventData.Event_Name} </h3>
                <h3 className="home"> Organized By: {eventData.Event_Organizer_First_Name} {eventData.Event_Organizer_Last_Name}   </h3>
                <h3 className="home"> On: {eventData.Event_Date} </h3>
                <h3 className="home"> At: {eventData.Event_Address} </h3>
                <br />
                <button onClick={HandleClickPrint}> Print </button>
            </ul>

        </div>
    )
}

export default DonationsReciept
