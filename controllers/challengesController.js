const Challenge = require("../models/challenges");

module.exports = {
  getChallenges: async (req, res) => {
    try {
      const challenges = await Challenge.find();
      return res.status(200).json({ challenges });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },
  addChallenge: async (req, res) => {
    try {
      const { title, description, points } = req.body;
      const newChallenge = new Challenge({
        title,
        description,
        points,
      });
      await newChallenge.save();
      return res.status(201).json({ message: "Challenge added successfully" });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: error.message });
    }
  },
  changeChallengeStatus: async (req, res) => {
    try {
      const { id } = req.params;
      const { status } = req.body;
      const challenge = await Challenge.findByIdAndUpdate(
        id,
        { status: status },
        { new: true }
      );
      if (!challenge) {
        return res.status(404).json({ message: "Challenge not found" });
      }
      return res.status(200).json({ challenge });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: error.message });
    }
  },
  deleteChallenge: async (req, res) => {
    try {
      const { id } = req.params;
      const challenge = await Challenge.findByIdAndDelete(id);
      if (!challenge) {
        return res.status(404).json({ message: "Challenge not found" });
      }
      return res
        .status(200)
        .json({ message: "Challenge deleted successfully" });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: error.message });
    }
  },
};
