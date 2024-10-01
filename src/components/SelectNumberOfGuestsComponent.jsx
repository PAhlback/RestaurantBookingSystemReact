import React, { useState } from 'react'

const SelectNumberOfGuestsComponent = ({ handleSelectNumberOfGuests }) => {
    const [numberOfGuests, setNumberOfGuests] = useState(0);

    const NumberOfGuestsPicker = () => {
        const possibleNumberOfGuests = [1, 2, 3, 4, 5, 6, 7, 8]

        return (
            <div className='time-slot-picker'>
                {possibleNumberOfGuests.map((guests, index) => (
                    <button
                        key={index}
                        className={`time-slot-btn ${numberOfGuests === guests ? 'selected' : ''}`}
                        onClick={() => setNumberOfGuests(guests)}
                    >
                        {guests}
                    </button>
                ))}
            </div>
        );
    };

    return (
        <>
            <NumberOfGuestsPicker />
            <button
                className='btn btn-info'
                onClick={() => handleSelectNumberOfGuests(numberOfGuests)}
                disabled={!numberOfGuests}
            >
                Next
            </button>
        </>
    );
}

export default SelectNumberOfGuestsComponent