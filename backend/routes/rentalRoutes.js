const express = require('express');
const router = express.Router();
const CarRental = require('../models/rental');

// Endpoint do dodawania nowego wypożyczenia samochodu
router.post('/addCarRental', async (req, res) => {
    const { userId, carId, startDate, endDate, additionalInfo } = req.body;

    // Sprawdzenie, czy wszystkie wymagane pola są obecne w żądaniu
    if (!userId || !carId || !startDate || !endDate) {
        return res.status(400).json({ message: 'Wszystkie wymagane pola są potrzebne: userId, carId, startDate, endDate' });
    }

    try {
        const newCarRental = new CarRental({
            userId,
            carId,
            startDate,
            endDate,
            additionalInfo
        });

        const savedCarRental = await newCarRental.save();
        
        res.status(201).json({ message: 'Wypożyczenie dodane pomyślnie', carRental: savedCarRental });
    } catch (error) {
        res.status(500).json({ message: 'Wystąpił błąd przy dodawaniu wypożyczenia', error: error.message });
    }
});

// Endpoint do pobierania wszystkich wypożyczeń samochodów
router.get('/allCarRentals', async (req, res) => {
    try {
        const allCarRentals = await CarRental.find({ userId: { $exists: true } }).populate('userId').populate('carId');

        res.status(200).json({ carRentals: allCarRentals });
    } catch (error) {
        res.status(500).json({ message: 'Wystąpił błąd przy pobieraniu wypożyczeń', error: error.message });
    }
});

// Endpoint do pobierania danych o wypożyczonym samochodzie na podstawie ID użytkownika
router.get('/userCarRentals/:userId', async (req, res) => {
    try {
      const userId = req.params.userId;
      const userCarRentals = await CarRental.find({ userId }).populate('carId');
  
      if (!userCarRentals || userCarRentals.length === 0) {
        return res.status(404).json({ message: 'Nie znaleziono wypożyczeń samochodów dla danego użytkownika' });
      }
  
      res.status(200).json({ userCarRentals });
    } catch (error) {
      res.status(500).json({ message: 'Wystąpił błąd przy pobieraniu danych o wypożyczonych samochodach użytkownika', error: error.message });
    }
  });
  
// Endpoint do anulowania rezerwacji samochodu
router.patch('/cancelCarRental/:rentalId', async (req, res) => {
    try {
      const rentalId = req.params.rentalId;
  
      const canceledRental = await CarRental.findById(rentalId);
      if (!canceledRental) {
        return res.status(404).json({ message: 'Nie znaleziono wypożyczenia samochodu o podanym identyfikatorze' });
      }
  
      const carId = canceledRental.carId;
      const updatedCar = await Car.findOneAndUpdate({ _id: carId }, { $set: { available: true, reservedBy: null } }, { new: true });

  
      if (!updatedCar) {
        return res.status(404).json({ message: 'Nie znaleziono samochodu o podanym identyfikatorze' });
      }
  
      await canceledRental.remove();
      res.status(200).json({ message: 'Rezerwacja została anulowana pomyślnie', canceledRental });
    } catch (error) {
      res.status(500).json({ message: 'Wystąpił błąd podczas anulowania rezerwacji samochodu', error: error.message });
    }
  });
  


module.exports = router;
