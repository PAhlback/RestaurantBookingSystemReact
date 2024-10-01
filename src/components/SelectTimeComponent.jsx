import React, { useState } from 'react'

const SelectTimeComponent = ({ openingTime, closingTime, interval, handleSelectTime }) => {
    const [selectedTime, setSelectedTime] = useState(null);

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

    const TimeSlotPicker = ({ openingTime, closingTime, interval }) => {
        const timeSlots = generateTimeSlots(openingTime, closingTime, interval);

        return (
            <div className='time-slot-picker'>
                {timeSlots.map((slot, index) => (
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
            <TimeSlotPicker openingTime={openingTime} closingTime={closingTime} interval={interval}/>
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