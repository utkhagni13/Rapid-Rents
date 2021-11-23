const mongoose = require("mongoose");

const bookingSchema = require("../models/Bookings");
const BookingValidator = require("../validators/BookingValidators");

exports.addBooking = async (req, res) => {
    // validate the request
    const { error, value } = BookingValidator.addBooking(req.body);
    if (error) {
        return res.status(400).json({ data: null, error: error.details[0].message });
    }
    try {
        // insert new booking
        let result = await bookingSchema.insertMany([
            {
                _id: new mongoose.Types.ObjectId(),
                userID: req.body.userId,
                siteID: value.siteID,
                amount: value.amount,
                paymentdetails: value.paymentDetails,
                status: "Success",
                date: value.bookingDate,
            },
        ]);
        if (result.length > 0) {
            return res.status(200).json({ data: "Success", error: null });
        } else {
            return res.status(400).json({ data: null, error: "Booking Failed" });
        }
    } catch (error) {
        return res.status(400).json({ data: null, error: error.message });
    }
};
