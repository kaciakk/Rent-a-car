const Car = require('../models/car');
const User = require('../models/User');
const asyncHandler = require('express-async-handler');

const getAllCars = asyncHandler(async (req, res) => {
    const cars = await Car.find().lean();

    if (!cars?.length) {
        return res.status(400).json({ message: 'No cars found' });
    }

    const carsWithUser = await Promise.all(cars.map(async (car) => {
        const user = await User.findById(car.user).lean().exec();
        return { ...car, username: user.username };
    }));

    res.json(carsWithUser);
});

const createNewCar = asyncHandler(async (req, res) => {
    const { user, title, text } = req.body;

    if (!user || !title || !text) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    const duplicate = await Car.findOne({ title }).lean().exec();

    if (duplicate) {
        return res.status(409).json({ message: 'Duplicate car title' });
    }

    const car = await Car.create({ user, title, text });

    if (car) {
        return res.status(201).json({ message: 'New car created' });
    } else {
        return res.status(400).json({ message: 'Invalid car data received' });
    }

});

const updateCar = asyncHandler(async (req, res) => {
    const { id, user, title, text, completed } = req.body;

    if (!id || !user || !title || !text || typeof completed !== 'boolean') {
        return res.status(400).json({ message: 'All fields are required' });
    }

    const car = await Car.findById(id).exec();

    if (!car) {
        return res.status(400).json({ message: 'Car not found' });
    }

    const duplicate = await Car.findOne({ title }).lean().exec();

    if (duplicate && duplicate?._id.toString() !== id) {
        return res.status(409).json({ message: 'Duplicate car title' });
    }

    car.user = user;
    car.title = title;
    car.text = text;
    car.completed = completed;

    const updatedCar = await car.save();

    res.json(`'${updatedCar.title}' updated`);
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
