import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import axios from 'axios';

const ReservationComponent = () => {
    const [loading, setLoading] = useState(true);
    const location = useLocation();
    const { numberOfGuests, dateAndTime, customerEmail, customerName, customerPhone } = location.state || {};

    useEffect(() => {
        console.log(dateAndTime, numberOfGuests, customerEmail, customerName, customerPhone)
        postReservationRequest();
    }, [])

    async function postReservationRequest() {
        try {
            const response = await axios.post('https://localhost:7168/api/Reservations', {
                numberOfGuests: numberOfGuests,
                dateAndTime: dateAndTime,
                customerEmail: customerEmail,
                customerName: customerName,
                customerPhone: customerPhone
            });
            console.log(response.data);
            setLoading(false);
        }
        catch (error) {
            console.error('error posting reservation:', error)
            setLoading(false);
        }
    }

    if (loading) {
        return <div>Loading...</div>
    }

    return (
        <div>
            <h1>Reservation Confirmed</h1>
            <p>Your reservation for {numberOfGuests} guests on {dateAndTime.toString()} has been successfully made!</p>
            <p>Name: {customerName}</p>
            <p>Email: {customerEmail}</p>
            <p>Phone: {customerPhone}</p>
        </div>
    )
}

export default ReservationComponent