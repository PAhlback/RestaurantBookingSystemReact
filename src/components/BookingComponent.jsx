import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import SelectDateComponent from './SelectDateComponent';
import SelectTimeComponent from './SelectTimeComponent';
import SelectNumberOfGuestsComponent from './SelectNumberOfGuestsComponent';
import EnterContactInformationComponent from './EnterContactInformationComponent';

const BookingComponent = () => {
  const navigate = useNavigate();
  const [allFieldsEntered, setAllFieldsEntered] = useState(false);

  // DATE
  const [selectedDate, setSelectedDate] = useState(null);
  const [isDateSelected, setIsDateSelected] = useState(false);

  // TIME
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);
  const [isTimeSelected, setIsTimeSelected] = useState(false);
  const openingTime = new Date('2024-10-01T16:00:00');
  const closingTime = new Date('2024-10-01T23:00:00');
  const timeSlotInterval = 15;

  // NUMBER OF GUESTS
  const [numberOfGuests, setNumberOfGuests] = useState(0);
  const [isGuestsSelected, setIsGuestsSelected] = useState(false);

  // CONTACT INFO
  const [customerName, setCustomerName] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [customerPhoneNumber, setCustomerPhoneNumber] = useState('');

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

  const handleContactInfo = ({ name, email, phoneNumber }) => {
    setCustomerName(name);
    setCustomerEmail(email);

    const formattedPhoneNumber = phoneNumber.trim() === '' ? null : phoneNumber;
    setCustomerPhoneNumber(formattedPhoneNumber);

    console.log(`BookingComponent: Contact set to ${name}, ${email}, ${phoneNumber}`);
    setAllFieldsEntered(true);
  };

  useEffect(() => {
    if (allFieldsEntered) {
      const combinedDateTime = new Date(selectedDate);
      const [hours, minutes] = selectedTimeSlot.split(':')

      combinedDateTime.setHours(parseInt(hours, 10));
      combinedDateTime.setMinutes(parseInt(minutes, 10));

      const swedishTime = new Intl.DateTimeFormat('sv-SE', {
        timeZone: 'Europe/Stockholm',
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      }).formatToParts(combinedDateTime);
    
      console.log("BookingComponent combinedDateTime (Swedish time): ", swedishTime);

      console.log("BookingComponent combinedDateTime: ", combinedDateTime);
      console.log(numberOfGuests, customerEmail, customerName, customerPhoneNumber);

      navigate('/reservation', {
        state: {
          numberOfGuests: numberOfGuests,
          dateAndTime: combinedDateTime,
          customerEmail: customerEmail,
          customerName: customerName,
          customerPhone: customerPhoneNumber
        }
      });
    }
  }, [allFieldsEntered])

  return (
    <>
      <h1>Il Sogno</h1>
      <h2>Reserve Table</h2>
      <section className='booking-wrapper'>
        <nav>
          <button className='btn btn-outline-primary btn-sm'><i className="bi bi-calendar3"></i></button>
          <button className='btn btn-outline-primary btn-sm' disabled={!isDateSelected}><i className="bi bi-people"></i></button>
          <button className='btn btn-outline-primary btn-sm' disabled={!isTimeSelected}><i className="bi bi-clock"></i></button>
          <button className='btn btn-outline-primary btn-sm' disabled={!isGuestsSelected}><i className="bi bi-person-vcard"></i></button>
        </nav>
        {!isDateSelected && (
          <SelectDateComponent handleSelectDate={handleSelectDate} />
        )}
        {isDateSelected && !isGuestsSelected && (
          <SelectNumberOfGuestsComponent handleSelectNumberOfGuests={handleSelectNumberOfGuests} />
        )}
        {isGuestsSelected && !isTimeSelected && (
          <SelectTimeComponent 
            openingTime={openingTime} 
            closingTime={closingTime} 
            interval={timeSlotInterval} 
            numberOfGuests={numberOfGuests} 
            selectedDate={selectedDate}
            handleSelectTime={handleSelectTime} />
        )}
        {isTimeSelected && !customerName && !customerEmail && (
          <EnterContactInformationComponent handleContactInfo={handleContactInfo} />
        )}
      </section>
    </>
  )
}


export default BookingComponent