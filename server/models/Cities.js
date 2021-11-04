const mongoose = require("mongoose");

const citiesSchema = new mongoose.Schema(
    {
        id: mongoose.Schema.Types.ObjectId,
        state: {
            type: String,
            required: true,
        },
        cityName: {
            type: String,
            required: true,
        },
        status: {
            type: Boolean,
            required: true,
        },
    },
    {
        timestamps: { createdAt: "createdAt", updatedAt: "updatedAt" },
    }
);

module.exports = mongoose.model("Cities", citiesSchema);
