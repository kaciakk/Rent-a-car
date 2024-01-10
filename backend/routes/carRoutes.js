const express = require('express');
const router = express.Router();
const carsController = require('../controllers/carsController');

router.get('/', carsController.getAllCars);
router.post('/', carsController.createNewCar);
router.patch('/:carId', carsController.updateCar);
router.delete('/:carId', carsController.deleteCar);

module.exports = router;
