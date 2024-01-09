const Car = require('../models/car');
const User = require('../models/user');
const CarRental = require('../models/rental');
const asyncHandler = require('express-async-handler');

const getAllCars = asyncHandler(async (req, res) => {
    try {
        const cars = await Car.find().lean();

        if (!cars?.length) {
            return res.status(400).json({ message: 'No cars found' });
        }

        const carsWithUser = await Promise.all(cars.map(async (car) => {
            const user = await User.findById(car.user).lean().exec();

            if (!user) {
                return { ...car, username: 'Unknown' };
            }

            return { ...car, username: user.username };
        }));

        res.json(carsWithUser);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
});

const createNewCar = asyncHandler(async (req, res) => {
    const { brand, model, year, color, pricePerDay, engineType, airConditioning, transmission, numberOfSeats, numberOfDoors, trunkCapacity, photoUrl } = req.body;

    if (!brand || !model || !year || !color || !pricePerDay || !engineType || !transmission || !numberOfSeats || !numberOfDoors || !trunkCapacity || !photoUrl) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    const car = await Car.create({
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
        available: true,
        reservedBy: null,
    });

    if (car) {
        return res.status(201).json({ message: 'New car created', car });
    } else {
        return res.status(400).json({ message: 'Invalid car data received' });
    }
});

const updateCar = asyncHandler(async (req, res) => {
    const { brand, model, year, color, pricePerDay, engineType, airConditioning, transmission, numberOfSeats, numberOfDoors, trunkCapacity, photoUrl, available, reservedBy } = req.body;
    const carId = req.params.carId;

    if (!carId) {
        return res.status(400).json({ message: 'Car ID is required' });
    }

    try {
        const carToUpdate = await Car.findById(carId).exec();

        if (!carToUpdate) {
            return res.status(404).json({ message: 'Car not found' });
        }

        // Aktualizacja pól samochodu
        carToUpdate.brand = brand || carToUpdate.brand;
        carToUpdate.model = model || carToUpdate.model;
        carToUpdate.year = year || carToUpdate.year;
        carToUpdate.color = color || carToUpdate.color;
        carToUpdate.pricePerDay = pricePerDay || carToUpdate.pricePerDay;
        carToUpdate.engineType = engineType || carToUpdate.engineType;
        carToUpdate.airConditioning = airConditioning || carToUpdate.airConditioning;
        carToUpdate.transmission = transmission || carToUpdate.transmission;
        carToUpdate.numberOfSeats = numberOfSeats || carToUpdate.numberOfSeats;
        carToUpdate.numberOfDoors = numberOfDoors || carToUpdate.numberOfDoors;
        carToUpdate.trunkCapacity = trunkCapacity || carToUpdate.trunkCapacity;
        carToUpdate.photoUrl = photoUrl || carToUpdate.photoUrl;

        // Sprawdzenie i aktualizacja stanu dostępności i zarezerwowanego użytkownika
        if (available !== undefined ) {
            carToUpdate.available = available;
            
        }

        const updatedCar = await carToUpdate.save();

        res.json(`Car '${updatedCar.brand}' updated`);
    } catch (error) {
        console.error('Error updating car:', error);
        res.status(400).json({ message: 'Error updating car', error: error.message });
    }
});

const deleteCar = asyncHandler(async (req, res) => {
    const carId = req.params.carId;

    if (!carId) {
        return res.status(400).json({ message: 'Car ID required' });
    }

    const car = await Car.findById(carId).exec();

    if (!car) {
        return res.status(400).json({ message: 'Car not found' });
    }

    const result = await car.deleteOne();

    const reply = `Car '${result.title}' with ID ${result._id} deleted`;

    res.json(reply);
});

module.exports = {
    getAllCars,
    createNewCar,
    updateCar,
    deleteCar
};
