const CarRental = require('../models/CarRental');
const User = require('../models/User');
const Car = require('../models/Car');
const asyncHandler = require('express-async-handler');

// Get all rentals
const getAllRental = asyncHandler(async (req, res) => {
    const rentals = await CarRental.find();

    if (!rentals || rentals.length === 0) {
        return res.status(404).json({ message: "No rental found" });
    }

    res.status(200).json({ rentals });
});

const createNewRental = asyncHandler(async (req, res) => {
    const { userId, carId, startDate, endDate } = req.body;
   
    // Sprawdzenie, czy wszystkie wymagane pola są obecne w żądaniu
    if (!userId || !carId || !startDate || !endDate) {
        return res.status(400).json({ message: 'All fields required: userId, carId, startDate, endDate' });
    }

    // Sprawdź czy użytkownik (User) o danym userId istnieje
    const userExists = await User.findById(userId).exec();
    if (!userExists) {
        return res.status(400).json({ message: 'User not found' });
    }

    // Sprawdź czy samochód (Car) o danym carId istnieje
    const carExists = await Car.findById(carId).exec();
    if (!carExists) {
        return res.status(400).json({ message: 'Car not found' });
    }

    const rentalObject = { userId, carId, startDate, endDate };
    const rental = await CarRental.create(rentalObject);

    if (rental) {
        res.status(201).json({ message: 'Done' });
    } else {
        res.status(400).json({ message: 'Error' });
    }
});


// Update Rental
const updateRental = asyncHandler(async (req, res) => {
    // Implementacja aktualizacji wypożyczenia
});

// Delete Rental 
const deleteRental = asyncHandler(async (req, res) => {
    const rentalId = req.params.rentalId;

    if (!rentalId) {
        return res.status(400).json({ message: "Rental ID Required" });
    }

    const rental = await CarRental.findById(rentalId).exec();

    if (!rental) {
        return res.status(400).json({ message: "Rental not found" });
    }

    const result = await CarRental.deleteOne({ _id: rentalId });

    const reply = `Rental ${result._id} successfully deleted`;

    res.json(reply);
});

const getUserCarRentalById = asyncHandler(async (req, res) => {
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


module.exports = {
    getAllRental,
    createNewRental,
    updateRental,
    deleteRental,
    getUserCarRentalById
};
