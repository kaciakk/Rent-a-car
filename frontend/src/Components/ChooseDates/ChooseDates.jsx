import React, { useState } from 'react';
import Select from 'react-select';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './ChooseDates.css';

const citiesOptions = [
    { value: 'krakow', label: 'Kraków', airports: ['Lotnisko Kraków', 'Dworzec Główny Kraków'] },
    { value: 'warszawa', label: 'Warszawa', airports: ['Lotnisko Chopina', 'Lotnisko Modlin', 'Dworzec Centralny'] },
    { value: 'wroclaw', label: 'Wrocław', airports: ['Port Lotniczy Wrocław', 'Dworzec Główny Wrocław'] },
    // Dodaj inne miasta według potrzeb
];

const ChooseDates = () => {
    const [selectedCity, setSelectedCity] = useState(null);
    const [selectedAirport, setSelectedAirport] = useState(null);
    const [pickupDate, setPickupDate] = useState(new Date());
    const [returnDate, setReturnDate] = useState(new Date());

    const handleCityChange = (selectedOption) => {
        setSelectedCity(selectedOption);
        setSelectedAirport(null); // Resetowanie wyboru lotniska po zmianie miasta
    };

    const handleAirportChange = (selectedOption) => {
        setSelectedAirport(selectedOption);
    };

    return (
        <div className='choose-date'>
            <h1>Nationwide</h1>
            <h3>Car Rental</h3>
            <h3>Find offers and make reservations</h3>

            <div className='choose-date-menu'>
                <div className='choose-date-place-pickup-town'>
                    <Select
                        value={selectedCity}
                        onChange={handleCityChange}
                        options={citiesOptions}
                        placeholder="Wybierz miasto"
                    />
                </div>
                <div className='choose-date-place-pickup-place'>
                    <Select
                        value={selectedAirport}
                        onChange={handleAirportChange}
                        options={selectedCity ? selectedCity.airports.map(airport => ({ value: airport, label: airport })) : []}
                        placeholder="Wybierz miejsce"
                    />
                </div>
                <div className='choose-date-place-pickup-hour'>
                    <DatePicker
                        selected={pickupDate}
                        onChange={(date) => setPickupDate(date)}
                        showTimeSelect
                        timeFormat="HH:mm"
                        timeIntervals={15}
                        dateFormat="yyyy-MM-dd HH:mm"
                        placeholderText="Wybierz datę i godzinę odbioru"
                    />
                </div>
                <div className='choose-date-place-return-hour'>
                    <DatePicker
                        selected={returnDate}
                        onChange={(date) => setReturnDate(date)}
                        showTimeSelect
                        timeFormat="HH:mm"
                        timeIntervals={15}
                        dateFormat="yyyy-MM-dd HH:mm"
                        placeholderText="Wybierz datę i godzinę zwrotu"
                    />
                </div>
                <button className='nav-login choose-date-finde-car'>Szukaj</button>
            </div>
        </div>
    );
};

export default ChooseDates;
