const Car = require('../models/car');
const User = require('../models/user');
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
                return { ...car, username: 'Unknown' }; // Jeśli użytkownik nie został znaleziony, ustaw 'Unknown' jako nazwę użytkownika
            }

            return { ...car, username: user.username };
        }));

        res.json(carsWithUser);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
});


const createNewCar = asyncHandler(async (req, res) => {
    const { brand, model, year, color, pricePerDay, engineType, airConditioning, transmission, numberOfSeats, numberOfDoors, trunkCapacity,photoUrl } = req.body;

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
        photoUrl
    });

    if (car) {
        return res.status(201).json({ message: 'New car created', car });
    } else {
        return res.status(400).json({ message: 'Invalid car data received' });
    }
});

const updateCar = asyncHandler(async (req, res) => {
    const { _id, brand, model, year, color, pricePerDay, engineType, airConditioning, transmission, numberOfSeats, numberOfDoors, trunkCapacity, photoUrl } = req.body;

    if (!_id) {
        return res.status(400).json({ message: 'Car ID is required' });
    }

    try {
        const carToUpdate = await Car.findById(_id).exec();

        if (!carToUpdate) {
            return res.status(404).json({ message: 'Car not found' });
        }

        // Update fields if they were provided in the request
        if (brand) carToUpdate.brand = brand;
        if (model) carToUpdate.model = model;
        if (year) carToUpdate.year = year;
        if (color) carToUpdate.color = color;
        if (pricePerDay) carToUpdate.pricePerDay = pricePerDay;
        if (engineType) carToUpdate.engineType = engineType;
        if (airConditioning) carToUpdate.airConditioning = airConditioning;
        if (transmission) carToUpdate.transmission = transmission;
        if (numberOfSeats) carToUpdate.numberOfSeats = numberOfSeats;
        if (numberOfDoors) carToUpdate.numberOfDoors = numberOfDoors;
        if (trunkCapacity) carToUpdate.trunkCapacity = trunkCapacity;
        if (photoUrl) carToUpdate.photoUrl = photoUrl;

        const updatedCar = await carToUpdate.save();

        res.json(`Car '${updatedCar.brand}' updated`);
    } catch (error) {
        res.status(400).json({ message: 'Error updating car' });
    }
});


const deleteCar = asyncHandler(async (req, res) => {
    const { id } = req.body;

    if (!id) {
        return res.status(400).json({ message: 'Car ID required' });
    }

    const car = await Car.findById(id).exec();

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
