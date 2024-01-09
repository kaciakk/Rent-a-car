import React, { useState } from 'react';
import axios from 'axios';
import './UsersMenu.css'; // Plik CSS zdefiniowany dla formularza
const UsersMenu = () => {
  const [brand, setBrand] = useState('');
  const [model, setModel] = useState('');
  const [year, setYear] = useState('');
  const [color, setColor] = useState('');
  const [pricePerDay, setPricePerDay] = useState('');
  const [engineType, setEngineType] = useState('');
  const [airConditioning, setAirConditioning] = useState(false);
  const [transmission, setTransmission] = useState('');
  const [numberOfSeats, setNumberOfSeats] = useState('');
  const [numberOfDoors, setNumberOfDoors] = useState('');
  const [trunkCapacity, setTrunkCapacity] = useState('');
  const [photoUrl, setPhotoUrl] = useState('');
  const [reservedBy, setReservedBy] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newCar = {
        brand,
        model,
        year,
        color,
        pricePerDay,
        engineType,
        airConditioning,
        transmission,
        numberOfSeats,
        numberOfDoors,
        trunkCapacity,
        photoUrl,
        reservedBy
      };
      const response = await axios.post('http://localhost:3500/cars/', newCar); // Zmień adres URL na odpowiedni endpoint

      console.log('Car added:', response.data);
      // Możesz dodać dalsze działania po dodaniu samochodu, np. wyzerowanie pól formularza lub wyświetlenie komunikatu o sukcesie
    } catch (error) {
      console.error('Error adding car:', error);
      // Obsłużanie błędów, np. wyświetlenie komunikatu dla użytkownika o niepowodzeniu dodania samochodu
    }
  };
  return (
    <form className="car-form" onSubmit={handleSubmit}>
      <div className='car-container-form' style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div className='car-container-form-first'>
        <label>
            Brand:
            <input type="text" value={brand} onChange={(e) => setBrand(e.target.value)} />
          </label>
        <label>
            Model:
            <input type="text" value={model} onChange={(e) => setModel(e.target.value)} />
          </label>
          <label>
            Year:
            <input type="text" value={year} onChange={(e) => setYear(e.target.value)} />
          </label>
          <label>
            Color:
            <input type="text" value={color} onChange={(e) => setColor(e.target.value)} />
          </label>
          <label>
            Trunk Capacity:
            <input type="number" value={trunkCapacity} onChange={(e) => setTrunkCapacity(e.target.value)} />
          </label>
          
          <label>
            Price Per Day:
            <input type="number" value={pricePerDay} onChange={(e) => setPricePerDay(e.target.value)} />
          </label>
          <label>
            Photo URL:
            <input type="text" value={photoUrl} onChange={(e) => setPhotoUrl(e.target.value)} />
          </label>
        </div>

        <div className='car-container-form-second'>
        <label>
         Air Conditioning:
         <select value={airConditioning ? 'Yes' : 'No'} onChange={(e) => setAirConditioning(e.target.value === 'Yes')}>
          <option value="Yes">Yes</option>
           <option value="No">No</option>
          </select>
        </label>

          <label>
            Number of Seats:
            <select value={numberOfSeats} onChange={(e) => setNumberOfSeats(e.target.value)}>
              <option value="2">2</option>
              <option value="5">5</option>
              <option value="7">7</option>
            </select>
          </label>
          <label>
            Transmission:
            <select value={transmission} onChange={(e) => setTransmission(e.target.value)}>
              <option value="Automatic">Automatic</option>
              <option value="Manual">Manual</option>
            </select>
          </label>
          <label>
            Number of Doors:
            <select value={numberOfDoors} onChange={(e) => setNumberOfDoors(e.target.value)}>
              <option value="3">3</option>
              <option value="5">5</option>
            </select>
          </label>
          <label>
            Engine Type:
            <select value={engineType} onChange={(e) => setEngineType(e.target.value)}>
              <option value="Gasoline">Gasoline</option>
              <option value="Diesel">Diesel</option>
              <option value="Electric">Electric</option>
            </select>
          </label>
        </div>
      </div>
 
    {/* Dodaj pozostałe wymagane pola na podobnej zasadzie */}
  
    <div className="car-container-form-details">
    {photoUrl && (

<div className='car-image'>
  <h4>Data entry preview:</h4>
  <img src={photoUrl} alt="Data entry preview" />
</div>
)}
          <p>Marka: {brand}</p>
          <p>Model: {model}</p>
          <p>Typ silnika: {engineType}</p>
          <p>Klimatyzacja: {airConditioning ? 'Tak' : 'Nie'}</p>
          <p>Transmisja: {transmission}</p>
          <p>Liczba miejsc: {numberOfSeats}</p>
          <p>Liczba drzwi: {numberOfDoors}</p>
          <p>Pojemność bagażnika: {trunkCapacity}</p>
          <button type="submit">Add new car</button>
    </div>
    
   
  </form>
  );
};

export default UsersMenu;
