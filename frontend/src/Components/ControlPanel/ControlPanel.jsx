import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ControlPanel.css';

const ControlPanel = () => {
  const [carRentals, setCarRentals] = useState([]);

  useEffect(() => {
    const fetchCarRentals = async () => {
      try {
        const response = await axios.get('http://localhost:3500/car-rentals/allCarRentals');
        if (Array.isArray(response.data.carRentals)) {
          setCarRentals(response.data.carRentals);
        }
      } catch (error) {
        console.error('Błąd podczas pobierania wypożyczeń:', error);
      }
    };

    fetchCarRentals();
  }, []);

  const handleCancelReservation = async (id) => {
    try {
      const response = await axios.patch(`http://localhost:3500/car-rentals/cancelCarRental/${id}`, {
        available: true,
        reservedBy: null,
      });

      if (response.status === 200) {
        const updatedRentals = carRentals.filter((rental) => rental._id !== id);
        setCarRentals(updatedRentals);
        alert('Rezerwacja została anulowana.');
      } else {
        throw new Error('Błąd podczas anulowania rezerwacji.');
      }
    } catch (error) {
      console.error('Błąd podczas anulowania rezerwacji:', error);
      alert('Wystąpił błąd podczas anulowania rezerwacji.');
    }
  };

  return (
    <div className="rental-list-container">
      <h2>Twoje auta</h2>
      <div className="rental-grid">
      {carRentals.map((rental) => (
  <div className="rental-item" key={rental._id}>
    <p>ID użytkownika: {rental.userId._id}</p>
    <p>ID samochodu: {rental.carId}</p>
    <p>Data rozpoczęcia: {rental.startDate}</p>
    <p>Data zakończenia: {rental.endDate}</p>
    <button onClick={() => handleCancelReservation(rental._id)}>Anuluj rezerwację</button>
  </div>
        ))}
      </div>
    </div>
  );
};

export default ControlPanel;