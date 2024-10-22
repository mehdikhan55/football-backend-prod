const express = require("express");
const router = express.Router();

const customerController = require("../controllers/customerController");
const leagueController = require("../controllers/leagueController");

router.get("/grounds", customerController.getGrounds);
router.get("/self", customerController.getSelf);
router.get("/leagues", leagueController.getLeagues);
router.get("/leagues/:id", leagueController.getLeague);

module.exports = router;