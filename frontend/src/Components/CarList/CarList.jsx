import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './CarList.css'; // Import pliku ze stylami CSS

const CarList = () => {
  const [cars, setCars] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3500/cars'); // Wywołanie endpointu
        setCars(response.data); // Ustawienie pobranych danych w stanie komponentu
      } catch (error) {
        console.error('Błąd pobierania danych:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="car-list-container">
      <h1>Lista samochodów</h1>
      <div className="car-grid">
        {cars.map((car, index) => (
          <div className="car-item" key={index}>
            <div className="car-image">
              <img src={car.photoUrl} alt={`Zdjęcie samochodu ${car.brand} ${car.model}`} />
            </div>
            <div className="car-details">
              <p>Marka: {car.brand}</p>
              <p>Model: {car.model}</p>
              <p>Typ silnika: {car.engineType}</p>
              <p>Klimatyzacja: {car.airConditioning ? 'Tak' : 'Nie'}</p>
              <p>Transmisja: {car.transmission}</p>
              <p>Liczba miejsc: {car.numberOfSeats}</p>
              <p>Liczba drzwi: {car.numberOfDoors}</p>
              <p>Pojemność bagażnika: {car.trunkCapacity}</p>
            </div>
            <button>Zarezerwuj</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CarList;