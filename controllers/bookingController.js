const Booking = require("../models/booking");
const Ground = require("../models/ground");
const MatchRequest = require("../models/matchRequest");
const TeamRequest = require("../models/teamRequest")

module.exports = {
  //get all bookings
  getBookings: async (req, res) => {
    try {
      const bookings = await Booking.find()
        .populate("customer", "-password")
        .populate("ground")
        .populate("team");
      return res.status(200).json({ bookings });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },
  //add a booking
  addBooking: async (req, res) => {
    console.log('Request entered to addBooking');
    try {
      const { customer, team, playersRequired, bookingDate, bookingTime, bookingDuration, bookingPrice, bookingStatus, paymentMethod, paymentStatus, paymentDate, ground, teamRequired } = req.body;
      console.log('req.body', req.body);

      // New validation: Check if bookingDuration is at least 1.5 hours
      if (bookingDuration < 1.5) {
        return res.status(400).json({ message: "Booking duration must be at least 1.5 hours" });
      }

      const targetGround = await Ground.findOne({ _id: ground });
      console.log('targetGround', targetGround);
      if (!targetGround) {
        return res.status(404).json({ message: "Ground not found" });
      }

      //check if the booking date is less than the current date
      const currentDate = new Date();
      const currentYear = currentDate.getFullYear();
      const currentMonth = currentDate.getMonth() + 1;  // months are 0-based in JavaScript Date
      const currentDay = currentDate.getDate();

      const bookingYear = parseInt(bookingDate.split("-")[0]);
      const bookingMonth = parseInt(bookingDate.split("-")[1]);
      const bookingDay = parseInt(bookingDate.split("-")[2]);

      // Compare year, month, and day
      if (bookingYear < currentYear ||
        (bookingYear === currentYear && bookingMonth < currentMonth) ||
        (bookingYear === currentYear && bookingMonth === currentMonth && bookingDay < currentDay)) {
        return res.status(400).json({ message: "Booking date is not valid logically" });
      }

      //check if the ground is in opening hours (take the opening hours from the ground model values : startTime and endTime)
      const startTime = parseInt(targetGround.startTime.split(":")[0]);
      const endTime = parseInt(targetGround.endTime.split(":")[0]);
      const bookingTimeHour = parseInt(bookingTime.split(":")[0]);
      if (bookingTimeHour < startTime || bookingTimeHour >= endTime) {
        return res.status(400).json({ message: "Ground is closed on this time" });
      }
      //check if the booking duration is available on the booking date and time
      const bookingEndTime = bookingTimeHour + bookingDuration;
      if (bookingEndTime > endTime) {
        return res.status(400).json({ message: "Booking duration is not available on this time" });
      }

      //check if the ground is available on the booking date and time
      const bookings = await Booking.find({ ground: targetGround._id, bookingDate, bookingTime });
      if (bookings.length > 0) {
        return res.status(400).json({ message: "Ground is already booked on this date and time" });
      }

      //check if the time is already reserved
      const bookingEndTime2 = bookingTimeHour + bookingDuration;
      const bookings2 = await Booking.find({ ground: targetGround._id, bookingDate });
      for (let i = 0; i < bookings2.length; i++) {
        const bookingTimeHour2 = parseInt(bookings2[i].bookingTime.split(":")[0]);
        const bookingEndTimeHour2 = bookingTimeHour2 + bookings2[i].bookingDuration;
        if (bookingTimeHour >= bookingTimeHour2 && bookingTimeHour < bookingEndTimeHour2) {
          return res.status(400).json({ message: "Ground is already booked on this time" });
        }
        if (bookingEndTime2 > bookingTimeHour2 && bookingEndTime2 <= bookingEndTimeHour2) {
          return res.status(400).json({ message: "Ground is already booked on this time" });
        }
      }



      const newBooking = new Booking({
        customer,
        team,
        bookingDate,
        bookingTime,
        bookingDuration,
        bookingPrice,
        bookingStatus,
        paymentMethod,
        paymentStatus,
        paymentDate,
        teamRequired,
        ground
      });

      await newBooking.save();

      // Create MatchRequest if players are required
      if (playersRequired > 0) {
        const newMatchRequest = new MatchRequest({
          matchMaker: customer,
          playersRequired,
          bookingId: newBooking._id
        });
        await newMatchRequest.save();
        console.log('newMatchRequest', newMatchRequest);
      }

      console.log("team id comming :",team)
      if (teamRequired) {
        const newTeamRequest = new TeamRequest({
          matchMaker: team,  // The team that created the booking
          bookingId: newBooking._id,  // Reference to the newly created booking
          interestedTeams: []  // Initialize with empty array of interested teams
        });
        await newTeamRequest.save();
        console.log('newTeamRequest', newTeamRequest);
      }


      return res.status(201).json({ message: "Booking added successfully" });
    } catch (error) {
      console.log('error in addBooking', error);
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


