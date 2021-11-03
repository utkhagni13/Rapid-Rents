const mongoose = require("mongoose");

const sitesSchema = new mongoose.Schema(
    {
        id: mongoose.Schema.Types.ObjectId,
        name: {
            type: String,
            required: true,
        },
        description: {
            type: String,
        },
        bhk: {
            type: Number,
        },
        measurements: {
            type: [Number],
            required: true,
        },
        rooms: {
            type: Number,
            required: true,
            default: 1,
        },
        bathrooms: {
            type: Number,
            required: true,
            default: 0,
        },
        garageFacility: {
            type: Boolean,
            required: true,
        },
        kitchen: {
            type: Number,
            required: true,
            default: 0,
        },
        type: {
            type: String,
            required: true,
        },
        location: {
            type: String,
            required: true,
        },
        cityID: { 
            type: Schema.Types.ObjectId, 
            ref: "Cities" 
        },
        state: {
            type: String,
            required: true,
        },
        rent: {
            type: Number,
            required: true,
        },
        status: {
            type: Boolean,
            required: true,
        },
        ownerData: {
            type: Object,
            required: true,
        },
        imageArray: {
            type: [String],
            required: true,
        },
    },
    {
        timestamps: { createdAt: "createdAt", updatedAt: "updatedAt" },
    }
);

module.exports = mongoose.model("Sites", sitesSchema);
