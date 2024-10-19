const express = require("express");
const router = express.Router();

const adminController = require("../controllers/adminController");

router.get("/customers", adminController.getCustomers);
router.put("/customer/:id", adminController.setCustomerStatus);
router.get("/emails", adminController.getEmails);
router.get("/users", adminController.getUsers);
router.put("/block-user/:id", adminController.blockUser);
router.put("/ground/reserved/:id", adminController.addReservedTime);

module.exports = router;