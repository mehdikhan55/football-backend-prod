const Booking = require("../models/booking");

module.exports = {
  //get all bookings
  getBookings: async (req, res) => {
    try {
      const bookings = await Booking.find();
      return res.status(200).json({ bookings });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },
  //add a booking
  
};
