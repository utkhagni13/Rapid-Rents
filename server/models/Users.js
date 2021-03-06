const mongoose = require("mongoose");

const usersSchema = new mongoose.Schema(
    {
        id: mongoose.Schema.Types.ObjectId,
        firstName: {
            type: String,
            required: true,
        },
        lastName: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true,
        },
        address: {
            line1: { type: String },
            line2: { type: String },
        },
        role: {
            type: String,
            default: "User",
        },
        mobile: {
            type: Number,
        },
        age: {
            type: Number,
        },
        gender: {
            type: String,
        },
        token: {
            type: String,
        },
    },
    {
        timestamps: { createdAt: "createdAt", updatedAt: "updatedAt" },
    }
);

module.exports = mongoose.model("Users", usersSchema);
