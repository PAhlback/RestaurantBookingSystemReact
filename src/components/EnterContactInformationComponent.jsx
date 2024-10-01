import React, { useState } from 'react'

const EnterContactInformationComponent = ({ handleContactInfo }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    handleContactInfo({ name, email, phoneNumber });
  }

  return (
    <section className='contact-information-wrapper'>
      <h2>Contact Information</h2>
      <form onSubmit={handleSubmit}>
        <div className='form-group'>
          <label htmlFor='name'>Name</label>
          <input 
            type='text'
            id='name'
            className='form-control'
            placeholder='Enter your name'
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            id="email"
            className="form-control"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="phoneNumber">Phone Number</label>
          <input
            type="tel"
            id="phoneNumber"
            className="form-control"
            placeholder="Enter your phone number"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
        </div>

        <button type="submit" className="btn btn-outline-primary mt-3">
          Make Reservation
        </button>
      </form>
    </section>
  )
}

export default EnterContactInformationComponent