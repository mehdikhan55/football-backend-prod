const express = require("express");
const router = express.Router();

const TeamController = require("../controllers/teamController");

router.get("/", TeamController.getTeams);
router.post("/", TeamController.addTeam);
router.put("/:id", TeamController.updateTeam);
router.delete("/:id", TeamController.deleteTeam);

module.exports = router;
