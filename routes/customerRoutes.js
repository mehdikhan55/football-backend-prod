const express = require("express");
const router = express.Router();

const customerController = require("../controllers/customerController");

router.get("/grounds", customerController.getGrounds);
router.get("/self", customerController.getSelf);

module.exports = router;