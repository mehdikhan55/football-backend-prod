const League = require("../models/league");

module.exports = {
    // Get all leagues
    getLeagues: async (req, res) => {
        try {
            const leagues = await League.find()
                .populate("teams")
                .populate("matches.teamA")
                .populate("matches.teamB");
            res.status(200).json({ leagues });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    // Get a league
    getLeague: async (req, res) => {
        try {
            const { id } = req.params;
            const league = await League.findById(id)
                .populate("teams")
                .populate("matches.teamA")
                .populate("matches.teamB")
                .populate("matches.winner")
                .populate("matches.scorers.team");

            if (!league) {
                return res.status(404).json({ message: "League not found" });
            }
            res.status(200).json({ league });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
    // Add a new league
    addLeague: async (req, res) => {
        console.log('Request Body:', req.body); 
        try {
            const { leagueName, startDate, endDate, teams, matches } = req.body;
            const newLeague = new League({ leagueName, startDate, endDate, teams, matches });
            await newLeague.save();
            res.status(201).json({ message: "League added successfully" });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    // Update a league
    updateLeague: async (req, res) => {
        try {
            const { id } = req.params;
            const { leagueName, startDate, endDate, teams, matches } = req.body;
            const league = await League.findByIdAndUpdate(id, { leagueName, startDate, endDate, teams, matches }, { new: true });
            if (!league) {
                return res.status(404).json({ message: "League not found" });
            }
            res.status(200).json({ message: "League updated successfully" });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    // Delete a league
    deleteLeague: async (req, res) => {
        try {
            const { id } = req.params;
            const league = await League.findByIdAndDelete(id);
            if (!league) {
                return res.status(404).json({ message: "League not found" });
            }
            res.status(200).json({ message: "League deleted successfully" });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
}
