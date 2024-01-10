import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';
import './RentalCart.css'; // Import pliku CSS

const RentalCart = () => {
  const { _id: userId } = useContext(AuthContext);
  const [carRentals, setCarRentals] = useState([]);

  useEffect(() => {
    const fetchUserCarRentals = async () => {
      try {
        const response = await axios.get(`http://localhost:3500/car-rentals/userCarRentals/${userId}`);
        setCarRentals(response.data.userCarRentals);
      } catch (error) {
        console.error('Błąd podczas pobierania wypożyczeń:', error);
      }
    };

    if (userId) {
      fetchUserCarRentals();
    }
  }, [userId]);

  return (
    <div className="rental-list-container"> {/* Dodaje klasę "rental-container" */}
      <h2>Your reservations</h2>
      <div className="rental-grid">
        {carRentals.map((rental) => (
          <div key={rental._id} className="rental-item"> {/* Dodaje klasę "rental-item" */}
          <img src={rental.carId.photoUrl} alt={`Zdjęcie samochodu ${rental.carId.brand} ${rental.carId.model}`} className="rental-image" />
          <p >UserID: {rental.userId}</p> {/* Adds "rental-info" class. */}
            <p >CarID: {rental.carId._id}</p>
            <p >Brand: {rental.carId.brand}</p>
            <p >Model: {rental.carId.model}</p>
            <p >Start Date: {rental.startDate}</p>
            <p >End Date: {rental.endDate}</p>
            
            {/* Dodaj inne pola z obiektu rental, jeśli są potrzebne */}
          </div>
        ))}
     </div>
    </div>
  );
};

export default RentalCart;
