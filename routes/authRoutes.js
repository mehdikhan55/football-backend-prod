const express = require("express");
const router = express.Router();

const AuthController = require("../controllers/authController");

router.post("/admin/register", AuthController.registerAdmin);
router.post("/admin/login", AuthController.loginAdmin);
router.post("/customer/register", AuthController.registerCustomer);
router.post("/customer/login", AuthController.loginCustomer);

module.exports = router;
