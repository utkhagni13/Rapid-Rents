const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
    {
        id: mongoose.Schema.Types.ObjectId,
        userID: {
            type: Schema.Types.ObjectId, ref: "Users",
        },
        siteID: {
            type: Schema.Types.ObjectId, ref: "RentalSites",
        },
        amount: {
            type: Number,
            required: true,
        },
        paymentdetails: {
            type: Object,
            required: true,
        },
        status: {
            type: String,
            required: true,
        },
        date: {
            type: Date,
            required: true,
        },
    },
    {
        timestamps: {createdAt: "createdAt", updatedAt: "updatedAt"},
    }
);

module.exports = mongoose.model("Bookings", bookingSchema);