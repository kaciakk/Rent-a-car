import React, { useState, useEffect } from 'react';
import './BestDeals.css';
import AnimatedGif from '../AnimatedGif';
import axios from 'axios'; // Importuj axios
import carIcon1 from '../Assets/car1.png';
import carIcon2 from '../Assets/car2.png';
import carIcon3 from '../Assets/car3.png';
import carIcon4 from '../Assets/car4.png';
import arrow1 from '../Assets/right-arrow.png';
import check from '../Assets/check.png';
import { Link } from 'react-router-dom';

export default function BestDeals() {
  const [cars, setCars] = useState([]); // Stan przechowujący dane o samochodach

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await axios.get('http://localhost:3500/cars');
        setCars(response.data); // Ustawienie danych o samochodach w stanie
      } catch (error) {
        console.error('Błąd pobierania danych o samochodach:', error);
      }
    };

    fetchCars(); // Wywołanie funkcji pobierającej dane
  }, []);

  // Wybierz tylko 3 konkretne modele aut
  const filteredCars = cars.filter((car) => car.model === '911' || car.model === 'Giulia Quadrifoglio' || car.model === 'M2');


  return (
    <div>
      <div className='car-gif'>
        <AnimatedGif src="https://usagif.com/wp-content/uploads/gifs/car-driving-43.gif" alt="animated gif" />
      </div>
      <div className='text-overlay'>
        <h1>Find deals and book!</h1>
      </div>
      <div className='text-overlay-second'>
        <div className='text-overlay-second-into'>
      <img src={check} alt="Icon" className="icon-check" />
        <p>No deposit</p></div>
        <div className='text-overlay-second-into'>
        <img src={check} alt="Icon" className="icon-check" />
        <p>No mileage limit</p>
        </div>
        <div className='text-overlay-second-into'>
        <img src={check} alt="Icon" className="icon-check" />
        <p>Free cancellation of reservation</p>
        </div>
        
      </div>
      
      <div className='text-center'> <h2>
        Especially for YOU a rich fleet of new cars!</h2></div>
     
      <div className='car-bestdeal-container'>
        
        <div className='car-grid'>
        {/* Wyświetlenie danych o samochodach */}
        {filteredCars.map((car, index) => (
          <div className='car-item' key={index}>
             <div className="car-image" >
        <img src={car.photoUrl} alt={`Zdjęcie samochodu ${car.brand} ${car.model}`} />
      </div>
             <p>Brand: {car.brand}</p>
            <p>Model: {car.model}</p>

            <Link to={`/cars/`}>
      <button>Więcej informacji</button>
    </Link>
          </div>
        ))}
        </div>
      </div>
      <div className='text-center'>
      <h2>Rent a car in 5 minutes!</h2></div>
      <div className='car-rental-container'>
      <div className='car-rental-container-into'>
      <img src={carIcon1} alt="Icon" className="icon" />
      <h3>Choose a car</h3>
      <h4>Choose from our fleet.</h4>
      </div>
      <div className='car-rental-container-arrow'>
      <img src={arrow1} alt="Icon" className="icon" /></div>
      <div className='car-rental-container-into'>
      <img src={carIcon2} alt="Icon" className="icon" />
      <h3>Specify details</h3>
      <h4>Specify a rental date.</h4>
      </div>
      <div className='car-rental-container-arrow'>
      <img src={arrow1} alt="Icon" className="icon" /></div>
      <div className='car-rental-container-into'>
      <img src={carIcon3} alt="Icon" className="icon" />
      <h3>Reserve a vehicle</h3>
      <h4>Easily book your vehicle online.</h4>
      </div>
      <div className='car-rental-container-arrow'>
      <img src={arrow1} alt="Icon" className="icon" /></div>
      <div className='car-rental-container-into'>
      <img src={carIcon4} alt="Icon" className="icon" />
      <h3>All set</h3>
      <h4>Enjoy unlimited travel!</h4>
      </div>
      </div>
    </div>
  );
}
