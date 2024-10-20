const Admin = require("../models/admin");
const Customer = require("../models/customer");
const Email = require("../models/email");
const Ground = require("../models/ground");

module.exports = {
  //get all customers
  getCustomers: async (req, res) => {
    try {
      const customers = await Customer.find();
      res.status(200).json({ customers });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  //set status of a customer to blocked or active
  setCustomerStatus: async (req, res) => {
    try {
      const { id } = req.params;
      const customer = await Customer.findById(id);
      if (!customer) {
        return res.status(404).json({ message: "Customer not found" });
      }
      customer.status = customer.status === "active" ? "blocked" : "active";
      await customer.save();
      return res
        .status(200)
        .json({ message: "Customer status updated successfully" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  //get all emails
  getEmails: async (req, res) => {
    try {
      let emails = await Email.find();
      //also get email of all customers
      const customers = await Customer.find();

      const formattedEmails = emails.map((email) => ({
        email: email.email,
        createdAt: email.createdAt
      }));


      customers.forEach((customer) => {
        formattedEmails.push({
          email: customer.email,
          createdAt: customer.createdAt
        });
      });

      res.status(200).json(formattedEmails);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  //get all users
  getUsers: async (req, res) => {
    try {
      const customers = await Customer.find();
      res.status(200).json({ customers });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  // Block a user
  blockUser: async (req, res) => {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: "User ID is required" });
    }

    try {
      const customer = await Customer.findById(id);
      if (!customer) {
        return res.status(404).json({ message: "Customer not found" });
      }

      // Toggle the status
      customer.status = customer.status === "active" ? "blocked" : "active";
      await customer.save();

      return res.status(200).json({ message: `Customer ${customer.status} successfully` });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },


  //add to reserved times of a ground
  addReservedTime: async (req, res) => {
    try {
      const { id } = req.params;
      const { reserved_time } = req.body;
      //reserved time will be sent in an object with date and start time and end time
      const date = reserved_time.date;
      const start_time = reserved_time.start_time;
      const end_time = reserved_time.end_time;

      const ground = await Ground.findById(id);
      if (!ground) {
        return res.status(404).json({ message: "Ground not found" });
      }

      //push in an object form {date,[start_time,end_time]}
      ground.reserved_times.push({
        date,
        time: [start_time, end_time],
      });
      await ground.save();
      return res
        .status(200)
        .json({ message: "Reserved time added successfully" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
};

//example push to reserved times
// {
//   "reserved_time": {
//     "date": "2021-07-20",
//     "start_time": "10:00",
//     "end_time": "12:00"
//   }