import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ReservationComponent = () => {
    const [loading, setLoading] = useState(true);
    const [callFailed, setCallFailed] = useState(false);
    const [callSucceeded, setCallSucceeded] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const { numberOfGuests, dateAndTime, customerEmail, customerName, customerPhone } = location.state || {};

    useEffect(() => {
        console.log(dateAndTime, numberOfGuests, customerEmail, customerName, customerPhone)
        postReservationRequest();
    }, [])

    async function postReservationRequest() {
        try {
            const utcDateAndTime = new Date(dateAndTime).toISOString();

            console.log("PostRequest utc date: ", utcDateAndTime)

            const response = await axios.post('https://localhost:7168/api/Reservations', {
                numberOfGuests: numberOfGuests,
                dateAndTime: utcDateAndTime,
                customerEmail: customerEmail,
                customerName: customerName,
                customerPhone: customerPhone,
                utcTime: true
            });
            console.log("response data: ", response.data);
            setLoading(false);
            setCallSucceeded(true);
        }
        catch (error) {
            console.error('error posting reservation:', error)
            setLoading(false);
            setCallFailed(true);
        }
    }

    if (loading) {
        return <div>Loading...</div>
    }

    return (
        <div>
            {!loading && callSucceeded && (
                <div>
                    <h2>Reservation Confirmed</h2>
                    <p>Your reservation for {numberOfGuests} guests on {dateAndTime.toString()} has been successfully made!</p>
                    <p>Name: {customerName}</p>
                    <p>Email: {customerEmail}</p>
                    <p>Phone: {customerPhone}</p>
                </div>
            )}
            {!loading && callFailed && !callSucceeded && (
                <div>
                    <h2>Reservation unsuccessful</h2>
                    <p>Something went wrong. Please try again.</p>
                    <button className='btn btn-outline-primary' onClick={() => navigate('/')}>Back to Start</button>
                </div>
            )}
        </div>
    )
}

export default ReservationComponent