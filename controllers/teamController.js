const Team = require("../models/team");

module.exports = {
    //get all teams
    getTeams: async (req, res) => {
        try {
            const teams = await Team.find();
            res.status(200).json({ teams });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
    //add a new team
    addTeam: async (req, res) => {
        try {
            const { teamName, players } = req.body;
            const team = new Team({ teamName, players });
            await team.save();
            res.status(201).json({ message: "Team added successfully" });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    //update a team
    updateTeam: async (req, res) => {
        try {
            const { id } = req.params;
            const { teamName, players } = req.body;
            const team = await Team.findByIdAndUpdate(id, { teamName, players });
            if (!team) {
                return res.status(404).json({ message: "Team not found" });
            }
            res.status(200).json({ message: "Team updated successfully" });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },


    //delete a team
    deleteTeam: async (req, res) => {
        try {
            const { id } = req.params;
            const team = await Team.findByIdAndDelete(id);
            if (!team) {
                return res.status(404).json({ message: "Team not found" });
            }
            res.status(200).json({ message: "Team deleted successfully" });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
}