import React, { useState } from 'react'
import Calendar from 'react-calendar';

const SelectDateComponent = ({ handleSelectDate }) => {
    // Calendar config
    const today = new Date();
    const maxDate = new Date();
    maxDate.setMonth(maxDate.getMonth() + 1)

    const [selectedDate, setSelectedDate] = useState(null);

    return (
        <>
            <h2>Select Date</h2>
            <section className='calendar-container'>
                <Calendar minDate={today} maxDate={maxDate} onClickDay={setSelectedDate} />
                <button 
                    className='btn btn-info' 
                    onClick={() => handleSelectDate(selectedDate)}
                    disabled={!selectedDate}
                    >
                        Next
                    </button>
            </section>
        </>
    )
}

export default SelectDateComponent