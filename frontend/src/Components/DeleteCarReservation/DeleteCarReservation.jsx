import React, { useState, useEffect } from 'react';
import axios from 'axios';

const DeleteCarReservation = () => {
  const [rentedCars, setRentedCars] = useState([]);

  useEffect(() => {
    const fetchRentedCars = async () => {
      try {
        const response = await axios.get('http://localhost:3500/car-rentals');
        const { rentals } = response.data;
        setRentedCars(rentals);
      } catch (error) {
        console.error('Error fetching rented cars:', error.message);
      }
    };

    fetchRentedCars();
  }, []);

  const handleCancelRental = async (rentalId) => {
    try {
      // Wywołaj funkcję usuwania rezerwacji na serwerze
      const response = await axios.delete(`http://localhost:3500/car-rentals/${rentalId}`);

      // Sprawdź, czy usunięto rezerwację pomyślnie
      if (response.data.message) {
        console.log(response.data.message);

        // Odśwież listę po usunięciu rezerwacji
        const updatedRentedCars = rentedCars.filter((rental) => rental._id !== rentalId);
        setRentedCars(updatedRentedCars);
      } else {
        console.error('Error deleting rental:', response.data.message);
      }
    } catch (error) {
      console.error('Error cancelling rental:', error.message);
    }
  };
  const handleReleaseCar = async (carId) => {
    try {
      // Wywołaj funkcję aktualizacji statusu available i reservedBy na serwerze
      const response = await axios.patch(`http://localhost:3500/cars/${carId}`, {
        available: true,
        reservedBy: null,
      });
  
      // Sprawdź, czy aktualizacja zakończyła się pomyślnie
      if (response.data.message) {
        console.log(response.data.message);
      } else {
        console.error('Error releasing car:', response.data.message);
      }
    } catch (error) {
      console.error('Error releasing car:', error.message);
    }
  };

  return (
    <div className="delete-car-reservation-container">
      <h2>List of Rented Cars</h2>
      <ul>
        {rentedCars.map((rental) => (
          <li key={rental?._id}>
            {rental && rental.carId && rental.userId && (
              <>
                {`Car ID: ${rental.carId}, User ID: ${rental.userId}, Start Date: ${rental.startDate}, End Date: ${rental.endDate}`}
                <button onClick={() => handleReleaseCar(rental.carId)}>Release Car</button>
                <button onClick={() => handleCancelRental(rental._id)}>Delete Reservation</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DeleteCarReservation;