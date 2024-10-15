const express = require("express");
const router = express.Router();

const generalController = require("../controllers/generalController");

router.get("/reviews", generalController.getReviews);
router.get("/challenges", generalController.getActiveChallenges);

module.exports = router;