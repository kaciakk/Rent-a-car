import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import './CarList.css';
import { AuthContext } from '../../context/AuthContext';

const CarList = () => {
  const [cars, setCars] = useState([]);
  const [selectedCar, setSelectedCar] = useState(null);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
 
  

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3500/cars');
        console.log('Pobrane samochody:', response.data);
        setCars(response.data);
      } catch (error) {
        console.error('Błąd pobierania danych:', error);
      }
    };

    fetchData();
  }, []);

  const handleReserveClick = (car) => {
    setSelectedCar(car);
  };

  // Pobranie danych użytkownika z kontekstu autoryzacji
  const { _id: userId } = useContext(AuthContext);

  const handleReservationSubmit = async () => {
    try {
      if (selectedCar && startDate && endDate && userId) { // Użyj userId z kontekstu autoryzacji
        const response = await axios.post('http://localhost:3500/car-rentals/addCarRental', {
          userId: userId, // Użyj userId z kontekstu autoryzacji
          carId: selectedCar._id,
          startDate,
          endDate,
          // Dodaj inne potrzebne dane rezerwacji
        });

        if (response.status === 201) {
          alert('Samochód zarezerwowano pomyślnie!');
          setSelectedCar(null);
          setStartDate('');
          setEndDate('');
        } else {
          throw new Error('Błąd podczas rezerwacji');
        }
      } else {
        alert('Wybierz samochód i wprowadź daty rozpoczęcia i zakończenia rezerwacji.');
      }
    } catch (error) {
      console.error('Błąd podczas rezerwacji:', error);
      alert('Wystąpił błąd podczas rezerwacji samochodu.');
    }
  };

  return (
    <div className="car-list-container">
     
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
              <button onClick={() => handleReserveClick(car)}>Zarezerwuj</button>
            </div>
          </div>
        ))}
      </div>
      {selectedCar && (
        <div className="reservation-form">
          <h2>Rezerwacja samochodu {selectedCar.brand} {selectedCar.model}</h2>
          <label>Data rozpoczęcia:</label>
          <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
          <label>Data zakończenia:</label>
          <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
          <button onClick={handleReservationSubmit}>Zatwierdź rezerwację</button>
        </div>
      )}
    </div>
  );
};

export default CarList;
