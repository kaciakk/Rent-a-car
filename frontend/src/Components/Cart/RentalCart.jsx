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
      <h2>Twoje auta</h2>
      <div className="rental-grid">
        {carRentals.map((rental) => (
          <div key={rental._id} className="rental-item"> {/* Dodaje klasę "rental-item" */}
          <img src={rental.carId.photoUrl} alt={`Zdjęcie samochodu ${rental.carId.brand} ${rental.carId.model}`} className="rental-image" />
            <p >ID użytkownika: {rental.userId}</p> {/* Dodaje klasę "rental-info" */}
            <p >ID samochodu: {rental.carId._id}</p>
            <p >Marka: {rental.carId.brand}</p>
            <p >Model: {rental.carId.model}</p>
            <p >Data rozpoczęcia: {rental.startDate}</p>
            <p >Data zakończenia: {rental.endDate}</p>
            
            {/* Dodaj inne pola z obiektu rental, jeśli są potrzebne */}
          </div>
        ))}
     </div>
    </div>
  );
};

export default RentalCart;
