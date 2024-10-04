import React, { useState, useEffect } from 'react'
import axios from 'axios';

const SelectTimeComponent = ({ openingTime, closingTime, interval, numberOfGuests, selectedDate, handleSelectTime }) => {
    const [selectedTime, setSelectedTime] = useState(null);
    const [availableSlots, setAvailableSlots] = useState([]);

    const fetchAvailableSlots = async (dateAndTime) => {
        try {
            const formattedDate = new Date(dateAndTime).toLocaleString('sv-SE', {
                timeZone: 'Europe/Stockholm',
                hour12: false
            });

            console.log("Formatted Date for API:", formattedDate);
            console.log("fetchAvailableTableSlots", dateAndTime);

            const response = await axios.get(`https://localhost:7168/api/Tables/check-for-available-tables/${formattedDate}/${numberOfGuests}`);
            if (response.data) {
                setAvailableSlots(response.data.availableTimeSlots);
            }
            console.log("API RESPONSE ", response.data.availableTimeSlots);
        } catch (error) {
            console.error("Error fetching available slots:", error);
        }
    };

    useEffect(() => {
        console.log("Selected Date:", selectedDate);
        if (selectedDate) {
            const dateAndTime = new Date(selectedDate).toISOString();
            fetchAvailableSlots(dateAndTime);
        }
    }, [selectedDate, numberOfGuests]);

    const TimeSlotPicker = () => {
        return (
            <div className='time-slot-picker'>
                {availableSlots.map((slot, index) => (
                    <button
                        key={index}
                        className={`time-slot-btn ${selectedTime === slot ? 'selected' : ''}`}
                        onClick={() => setSelectedTime(slot)}
                    >
                        {slot}
                    </button>
                ))}
            </div>
        );
    };

    return (
        <>
            <h3>Select a time</h3>
            <TimeSlotPicker />
            <button
                className='btn btn-info'
                onClick={() => handleSelectTime(selectedTime)}
                disabled={!selectedTime}
            >
                Next
            </button>
        </>
    );
};

export default SelectTimeComponent;