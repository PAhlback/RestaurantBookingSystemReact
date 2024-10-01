import React, { useEffect, useState } from 'react'
import Calendar from 'react-calendar';


import SelectDateComponent from './SelectDateComponent';

const BookingComponent = () => {
  // DATE
  const [selectedDate, setSelectedDate] = useState(null);
  const [isDateSelected, setIsDateSelected] = useState(false);
  // useEffect(() => {
  //     console.log("useEffect on selectedDate ", selectedDate)
  // }, [selectedDate])

  const handleSelectDate = (date) => {
    setSelectedDate(date);
    setIsDateSelected(true);
    console.log("BookingComponent: Date set to ", date)
  };

  return (
    <>
      <h1>Il Sogno</h1>
      <h2>Reserve Table</h2>
      <section className='booking-wrapper'>
        <nav>
          <button className='btn btn-outline-primary'><i className="bi bi-calendar3"></i></button>
          <button className='btn btn-outline-primary btn-sm' disabled={!selectedDate}><i class="bi bi-clock"></i></button>
          <button className='btn btn-outline-primary btn-sm' disabled={!selectedDate}><i class="bi bi-people"></i></button>
          <button className='btn btn-outline-primary btn-sm' disabled={!selectedDate}><i class="bi bi-person-vcard"></i></button>
        </nav>
        {!isDateSelected && (
        <SelectDateComponent handleSelectDate={handleSelectDate} />
        )}
      </section>
    </>
  )
}

export default BookingComponent