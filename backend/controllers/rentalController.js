const Car = require('../models/car');
const User = require('../models/user');
const asyncHandler = require('express-async-handler');

// @desc Wypożyczenie samochodu
// @route POST /rentals
// @access Public
const rentCar = asyncHandler(async (req, res) => {
    const { userId, carId, startDate, endDate } = req.body;

    if (!userId || !carId || !startDate || !endDate) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    try {
        const car = await Car.findById(carId).exec();

        if (!car || !car.available) {
            return res.status(404).json({ message: 'Car not found or unavailable' });
        }

        const existingRental = await CarRental.findOne({
            carId,
            $or: [
                {
                    startDate: { $lte: startDate },
                    endDate: { $gte: startDate }
                },
                {
                    startDate: { $lte: endDate },
                    endDate: { $gte: endDate }
                },
                {
                    startDate: { $gte: startDate },
                    endDate: { $lte: endDate }
                }
            ]
        }).exec();

        if (existingRental) {
            return res.status(409).json({ message: 'Car already rented for this period' });
        }

        const carRental = await CarRental.create({
            userId,
            carId,
            startDate,
            endDate,
            // Dodatkowe informacje o wypożyczeniu...
        });

        car.available = false;
        car.reservedBy = userId;
        await car.save();

        res.status(201).json({ message: 'Car rented successfully', carRental });
    } catch (error) {
        res.status(500).json({ message: 'Error renting car', error: error.message });
    }
});

// Inne funkcje kontrolera do obsługi innych operacji na wypożyczeniach...

module.exports = {
    rentCar,
    // Inne funkcje kontrolera...
};
