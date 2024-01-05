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
    // Dodatkowe informacje o wypożyczeniu...
});

module.exports = mongoose.model('CarRental', carRentalSchema);
