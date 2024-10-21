const Booking = require("../models/booking");

module.exports = {
  //get all bookings
  getBookings: async (req, res) => {
    try {
      const bookings = await Booking.find()
      .populate("customer", "-password") 
      .populate("ground");
      return res.status(200).json({ bookings });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },
  //add a booking
  addBooking: async (req, res) => {
    try {
      const booking = new Booking(req.body);
      await booking.save();
      return res.status(201).json({ message: "Booking added successfully" } );
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },
  // update a booking
  updateBooking: async (req, res) => {
    try {
      const { id } = req.params;
      const { customer, bookingDate, bookingTime, bookingDuration, bookingPrice, bookingStatus, paymentMethod, paymentStatus, paymentDate, ground } = req.body;
      await Booking.findByIdAndUpdate(
        { _id: id },
        { customer, bookingDate, bookingTime, bookingDuration, bookingPrice, bookingStatus, paymentMethod, paymentStatus, paymentDate, ground }
      )
      return res.status(200).json({ message: "Booking updated successfully" });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },
  
  //cancel booking
  cancelBooking: async (req, res) => {
    try {
      const { id } = req.params;
      await Booking
        .findByIdAndUpdate(
          { _id: id },
          { bookingStatus: "cancelled" }
        )
      return res.status(200).json({ message: "Booking cancelled successfully" });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },
  //delete a booking
  deleteBooking: async (req, res) => {
    try {
      const { id } = req.params;
      await Booking.findByIdAndDelete({
        _id: id
      });
      return res.status(200).json({ message: "Booking deleted successfully" });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },

  // change booking status patch request
  changeStatus: async (req, res) => {
    try {
      const { id } = req.params;
      const { bookingStatus } = req.body;

      await Booking.findByIdAndUpdate(
        { _id: id },
        { bookingStatus }
      );
      return res.status(200).json({ message: "Booking status updated successfully" });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }
};
