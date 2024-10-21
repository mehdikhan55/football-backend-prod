const mongoose = require('mongoose');
const Team = require('./team');require('./team');

const matchSchema = new mongoose.Schema({
    teamA: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Team', 
    },
    teamB: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Team',
    },
    score: {
        teamA: { type: Number},
        teamB: { type: Number},
    },
    scorers: [
        {
            player: { type: String},
            team: { type: mongoose.Schema.Types.ObjectId, ref: 'Team' },
            score: { type: Number},
        },
    ],
    date: { type: Date },
    createdAt: { type: Date, default: Date.now },
});

// League Schema
const leagueSchema = new mongoose.Schema({
    leagueName: { type: String, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    teams: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Team' }],
    matches: [matchSchema],
});

// Model
const League = mongoose.model('League', leagueSchema);

module.exports = League;