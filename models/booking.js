const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bookingSchema = new Schema({
    customer: {
        type: Schema.Types.ObjectId,
        ref: 'Customer',
        required: false,
    },
    team: {
        type: Schema.Types.ObjectId,
        ref: 'Team',
        required: false,
    },
    bookingDate: {
        type: Date,
        required: true,
    },
    bookingTime: {
        type: String,
        required: true,
    },
    bookingDuration: {
        type: Number,
        required: true,
    },
    bookingPrice: {
        type: Number,
        required: true,
    },
    bookingStatus: {
        type: String,
        required: true,
    },
    paymentMethod: {
        type: String,
        required: true,
    },
    paymentStatus: {
        type: String,
        required: true,
    },
    paymentDate: {
        type: Date,
        required: false,
    },
    ground: {
        type: Schema.Types.ObjectId,
        ref: 'Ground',
        required: true,
    },
    stillRequiredPlayers: {
        type: Number,
        required: false,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('Booking', bookingSchema);

//example post request
// {
//     "customer": "5e9b8f6f1c9d440000d4b7b0",
//     "bookingDate": "2020-04-20",
//     "bookingTime": "10:00",
//     "bookingDuration": 2,
//     "bookingPrice": 100,
//     "bookingStatus": "Booked",
//     "paymentMethod": "Cash",
//     "paymentStatus": "Paid",
//     "paymentDate": "2020-04-20",
//     "ground": "Ground 1"
// }
