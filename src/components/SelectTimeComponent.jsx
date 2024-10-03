import React, { useState, useEffect } from 'react'
import axios from 'axios';

const SelectTimeComponent = ({ openingTime, closingTime, interval, numberOfGuests, selectedDate, handleSelectTime }) => {
    const [selectedTime, setSelectedTime] = useState(null);
    const [availableSlots, setAvailableSlots] = useState([]);

    const generateTimeSlots = (openingTime, closingTime, interval) => {
        const slots = [];
        let currentTime = new Date(openingTime);
        const endTime = new Date(closingTime);

        while (currentTime < endTime) {
            const formattedTime = currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
            slots.push(formattedTime);
            currentTime = new Date(currentTime.getTime() + interval * 60000);
        }

        return slots;
    }

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
                // Assume the API returns an array of available time slots
                setAvailableSlots(response.data.map(slot => slot.time)); // Adjust according to your API response structure
            }
            console.log("API RESPONSE ", response.data);
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
        const timeSlots = generateTimeSlots(openingTime, closingTime, interval);

        return (
            <div className='time-slot-picker'>
                {timeSlots.map((slot, index) => (
                    availableSlots.includes(slot) && ( // Only show available slots
                        <button 
                            key={index} 
                            className={`time-slot-btn ${selectedTime === slot ? 'selected' : ''}`}
                            onClick={() => setSelectedTime(slot)}
                        >
                            {slot}
                        </button>
                    )
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