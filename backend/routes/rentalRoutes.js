const express = require('express');
const router = express.Router();
const rentalController = require('../controllers/rentalController');

// Trasa do wypożyczenia samochodu
router.post('/', rentalController.rentCar);

// Inne trasy dotyczące operacji na wypożyczeniach...

module.exports = router;
