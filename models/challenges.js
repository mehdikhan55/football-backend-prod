const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const challengeSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    points: {
        type: Number,
        required: true,
    },
    status: {
        type: String,
        default: 'deactived',
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('Challenge', challengeSchema);

//example post request
// {
//     "title": "challenge",  
//     "description": "challenge description",
//     "points": 100,
//     "category": "category"
// }