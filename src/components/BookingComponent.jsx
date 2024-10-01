import React, { useEffect, useState } from 'react'
import Calendar from 'react-calendar';


import SelectDateComponent from './SelectDateComponent';
import SelectTimeComponent from './SelectTimeComponent';
import SelectNumberOfGuestsComponent from './SelectNumberOfGuestsComponent';

const BookingComponent = () => {
  // DATE
  const [selectedDate, setSelectedDate] = useState(null);
  const [isDateSelected, setIsDateSelected] = useState(false);
  // useEffect(() => {
  //     console.log("useEffect on selectedDate ", selectedDate)
  // }, [selectedDate])

  // TIME
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);
  const [isTimeSelected, setIsTimeSelected] = useState(false);
  const openingTime = new Date('2024-10-01T16:00:00');
  const closingTime = new Date('2024-10-01T23:00:00');
  const timeSlotInterval = 15;

  // NUMBER OF GUESTS
  const [numberOfGuests, setNumberOfGuests] = useState(0);
  const [isGuestsSelected, setIsGuestsSelected] = useState(false);

  const handleSelectDate = (date) => {
    setSelectedDate(date);
    setIsDateSelected(true);
    console.log("BookingComponent: Date set to ", date);
  };

  const handleSelectTime = (time) => {
    setSelectedTimeSlot(time);
    setIsTimeSelected(true);
    console.log("BookingComponent: Time set to ", time);
  };

  const handleSelectNumberOfGuests = (guests) => {
    setNumberOfGuests(guests);
    setIsGuestsSelected(true);
    console.log("BookingComponent: Number of guests set to ", guests);
  }

  return (
    <>
      <h1>Il Sogno</h1>
      <h2>Reserve Table</h2>
      <section className='booking-wrapper'>
        <nav>
          <button className='btn btn-outline-primary btn-sm'><i className="bi bi-calendar3"></i></button>
          <button className='btn btn-outline-primary btn-sm' disabled={!isDateSelected}><i className="bi bi-clock"></i></button>
          <button className='btn btn-outline-primary btn-sm' disabled={!isTimeSelected}><i className="bi bi-people"></i></button>
          <button className='btn btn-outline-primary btn-sm' disabled={!isGuestsSelected}><i className="bi bi-person-vcard"></i></button>
        </nav>
        {!isDateSelected && (
          <SelectDateComponent handleSelectDate={handleSelectDate} />
        )}
        {isDateSelected && !isTimeSelected && (
          <SelectTimeComponent openingTime={openingTime} closingTime={closingTime} interval={timeSlotInterval} handleSelectTime={handleSelectTime}/>
        )}
        {isTimeSelected && !isGuestsSelected && (
          <SelectNumberOfGuestsComponent handleSelectNumberOfGuests={handleSelectNumberOfGuests}/>
        )}
      </section>
    </>
  )
}

export default BookingComponent