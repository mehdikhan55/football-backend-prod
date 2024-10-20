const express = require("express");
const router = express.Router();

const LeagueController = require("../controllers/leagueController");

router.get("/", LeagueController.getLeagues);
router.post("/", LeagueController.addLeague);
router.put("/:id", LeagueController.updateLeague);
router.delete("/:id", LeagueController.deleteLeague);

module.exports = router;
