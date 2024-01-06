const mongoose = require('mongoose');

const carRentalSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Odwołanie do kolekcji użytkowników
        required: true
    },
    carId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Car', // Odwołanie do kolekcji samochodów
        required: true
    },
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date,
        required: true
    },
    additionalInfo: {
        type: String // Może to być obiekt z dodatkowymi informacjami
    }
    // Inne pola, jeśli potrzebne
});

const CarRental = mongoose.model('CarRental', carRentalSchema);

module.exports = CarRental;
