const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const Admin = require("../models/admin");
const Customer = require("../models/customer");
const Email = require("../models/email");

module.exports = {
  registerAdmin: async (req, res) => {
    try {
      const { username, password } = req.body;
      // Check if admin already exists
      const admin = await Admin.findOne({ username });
      if (admin) {
        return res.status(400).json({ message: "Admin already exists" });
      }

      // Create new admin
      const newAdmin = new Admin({
        username,
        password,
      });
      await newAdmin.save();
      return res.status(201).json({ message: "Admin created successfully" });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: error.message });
    }
  },

  loginAdmin: async (req, res) => {
    try {
      const { username, password } = req.body;
      const admin = await Admin.findOne({
        username,
      });
      if (!admin) {
        return res.status(404).json({ message: "Admin not found" });
      }
      const isMatch = await bcrypt.compare(password, admin.password);
      if (!isMatch) {
        return res.status(400).json({ message: "Invalid password" });
      }
      const token = jwt.sign(
        { id: admin._id, role: "admin" },
        process.env.JWT_SECRET
      );
      return res.status(200).json({ token });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: error.message });
    }
  },
  loginCustomer: async (req, res) => {
    try {
      const { email, password } = req.body;
      const customer = await Customer.findOne({ email });
      if (!customer) {
        return res.status(404).json({ message: "Account not found" });
      }
      if (customer.status === "blocked") {
        return res.status(400).json({ message: "Customer is blocked" });
      }
      const isMatch = await bcrypt.compare(password, customer.password);
      if (!isMatch) {
        return res.status(400).json({ message: "Invalid password" });
      }
      const token = jwt.sign({ id: customer._id }, process.env.JWT_SECRET);
      return res.status(200).json({ token });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: error.message });
    }
  },
  registerCustomer: async (req, res) => {
    try {
      const { username, password, email, address, phone, dob } = req.body;
      // Check if customer already exists
      const customer = await Customer.findOne({ email });
      if (customer) {
        return res.status(400).json({ message: "Customer already exists" });
      }
      
      const customer2 = await Customer.findOne({username});
      if(customer2){
        return res.status(400).json({ message: "Username already exists" });
      }

      const customer3 = await Customer.findOne({ phone });
      if(customer3){
        return res.status(400).json({ message: "Phone already registered" });
      }


      

      // Create new customer
      const newCustomer = new Customer({
        username,
        password,
        email,
        address,
        phone,
        dob,
      });
      await newCustomer.save();
      const newEmail = new Email({ email });
      await newEmail.save();
      return res.status(201).json({ message: "Customer created successfully" });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: error.message });
    }
  },

 
};
