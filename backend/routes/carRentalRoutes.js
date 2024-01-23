const express = require('express');
const router = express.Router()
const carRentalController = require('../controllers/carRentalController');

router.get('/', carRentalController.getAllRental)
router.get('/:userId', carRentalController.getUserCarRental)
router.post('/', carRentalController.createNewRental)
router.patch('/:rentalId', carRentalController.updateRental)
router.delete('/:rentalId',  carRentalController.deleteRental)


module.exports = router