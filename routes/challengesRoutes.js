const express = require("express");
const router = express.Router();

const challengesController = require("../controllers/challengesController");

router.get("/", challengesController.getChallenges);
router.get("/:id", challengesController.getChallenge);
router.post("/", challengesController.addChallenge);
// router.put("/:id", challengesController.changeChallengeStatus);
router.delete("/:id", challengesController.deleteChallenge);

module.exports = router;