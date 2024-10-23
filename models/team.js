const mongoose = require("mongoose");

const teamSchema = new mongoose.Schema({
  teamName: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  players: [
    {
      type: String,
    },
    {
      type: Number,
    },
  ],
});

const Team = mongoose.model("Team", teamSchema);

module.exports = Team;
