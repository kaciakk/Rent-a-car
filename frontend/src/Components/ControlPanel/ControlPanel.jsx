import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ControlPanel.css';
const ControlPanel = () => {
    const [carRentals, setCarRentals] = useState([]); // Definicja stanu carRentals
  
    useEffect(() => {
      const fetchCarRentals = async () => {
        try {
          const response = await axios.get('http://localhost:3500/car-rentals/allCarRentals');
          if (Array.isArray(response.data.carRentals)) {
            setCarRentals(response.data.carRentals); // Ustawienie pobranych danych w stanie komponentu
          }
        } catch (error) {
          console.error('Błąd podczas pobierania wypożyczeń:', error);
        }
      };
  
      fetchCarRentals();
    }, []);
  
    return (
      <div className="rental-list-container">
        <h2>Twoje auta</h2>
        <div className="rental-grid">
          {carRentals.map((rental) => (
            <div className="rental-item" key={rental._id}>
              <p>ID użytkownika: {rental.userId}</p>
              <p>ID samochodu: {rental.carId}</p>
              <p>Data rozpoczęcia: {rental.startDate}</p>
              <p>Data zakończenia: {rental.endDate}</p>
            </div>
          ))}
        </div>
      </div>
    );
  };
  
  export default ControlPanel;
  