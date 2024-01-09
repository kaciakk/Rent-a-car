import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import './CarList.css';
import { AuthContext } from '../../context/AuthContext';
import { Modal } from '../Modal/Modal';

const CarList = () => {
  const [cars, setCars] = useState([]);
  const [selectedCar, setSelectedCar] = useState(null);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
 const [isImageModalOpen, setImageModalOpen] = useState(false);
  

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3500/cars');
        console.log('Pobrane samochody:', response.data);
  
        // Filtruj samochody dostępne do rezerwacji
        const availableCars = response.data.filter((car) => car.available);
        setCars(availableCars);
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
      if (selectedCar && startDate && endDate && userId) {
        const response = await axios.post('http://localhost:3500/car-rentals/addCarRental', {
          userId: userId,
          carId: selectedCar._id,
          startDate,
          endDate,
          // Dodaj inne potrzebne dane rezerwacji
        });
  
        if (response.status === 201) {
          // Aktualizacja statusu samochodu po udanej rezerwacji
          await axios.patch(`http://localhost:3500/cars/${selectedCar._id}`, {
            available: false,
            reservedBy: userId,
          });
  
          alert('Samochód zarezerwowano pomyślnie!');
          setSelectedCar(null);
          setStartDate('');
          setEndDate('');
          setIsModalOpen(false);
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
  const handleImageClick = (car) => {
    setSelectedCar(car);
    setImageModalOpen(true); // Funkcja otwierająca modal po kliknięciu na zdjęcie
  };

  return (
    <div className="car-list-container">
     
     <div className="car-grid">
  {cars.map((car, index) => (
    <div className="car-item" key={index}>
      <div className="car-image" onClick={() => handleImageClick(car)}>
        <img src={car.photoUrl} alt={`Zdjęcie samochodu ${car.brand} ${car.model}`} />
      </div>
      <Modal open={isImageModalOpen} onClose={() => setImageModalOpen(false)}>
        <div>
          {selectedCar && (
            <div>
              {selectedCar.photoUrl && (
               <img src={selectedCar.photoUrl} alt={`Zdjęcie samochodu ${selectedCar.brand} ${selectedCar.model}`} />
                )}
              <p>Marka: {selectedCar.brand}</p>
              <p>Model: {selectedCar.model}</p>
              <p>Typ silnika: {selectedCar.engineType}</p>
              <p>Klimatyzacja: {selectedCar.airConditioning ? 'Tak' : 'Nie'}</p>
              <p>Transmisja: {selectedCar.transmission}</p>
              <p>Liczba miejsc: {selectedCar.numberOfSeats}</p>
              <p>Liczba drzwi: {selectedCar.numberOfDoors}</p>
              <p>Pojemność bagażnika: {selectedCar.trunkCapacity}</p>
              
            </div>
          )}
        </div>
      </Modal>

            <div className="car-details">
            <p>Marka: {car.brand}</p>
              <p>Model: {car.model}</p>
              <p>Typ silnika: {car.engineType}</p>
              <p>Klimatyzacja: {car.airConditioning ? 'Tak' : 'Nie'}</p>
              <p>Transmisja: {car.transmission}</p>
              <p>Liczba miejsc: {car.numberOfSeats}</p>
              <p>Liczba drzwi: {car.numberOfDoors}</p>
              <p>Pojemność bagażnika: {car.trunkCapacity}</p>
              <button onClick={() => {
               handleReserveClick(car);
                setIsModalOpen(true);
                }}>Zarezerwuj</button>
              <Modal open={isModalOpen} onClose={() => setIsModalOpen(false)}>
              {selectedCar && (<div>
                
                <h2>Rezerwacja samochodu {selectedCar.brand} {selectedCar.model}</h2>
                <label>Data rozpoczęcia:</label>
                <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
                <label>Data zakończenia:</label>
                <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
                <button onClick={handleReservationSubmit}>Zatwierdź rezerwację</button>
                </div>
                )}
              </Modal>
            </div>
          </div>
        ))}
      </div>
      
    </div>
  );
};

export default CarList;
