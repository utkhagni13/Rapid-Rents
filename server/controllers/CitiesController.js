// Dependencies
const mongoose = require("mongoose");

// Files
const CitiesValidators = require("../validators/CitiesValidators");
const CitiesSchema = require("../models/Cities");

module.exports.getCities = async (req, res) => {
    try {
        const cities = await CitiesSchema.find();
        if (cities.length > 0) {
            return res.status(200).json({ response: cities, error: null });
        } else {
            return res.status(404).json({ response: null, error: "No cities found" });
        }
    } catch (error) {
        return res.status(500).json({ response: null, error: error.message });
    }
};

module.exports.addCity = async (req, res) => {
    // validate the request
    const { error, value } = CitiesValidators.addCity(req.body);
    if (error) {
        return res.status(400).json({ response: null, error: error.details[0].message });
    }
    try {
        // check if the city already exist
        const city = await CitiesSchema.findOne({
            cityName: value.cityName,
            state: value.state,
        });
        if (city !== null) {
            return res.status(400).json({ response: null, error: "City already exists" });
        }
        // add the city
        await CitiesSchema.insertMany([
            {
                _id: new mongoose.Types.ObjectId(),
                state: value.state,
                cityName: value.cityName,
                status: true,
            },
        ]);
        return res.status(200).json({ response: "Success", error: null });
    } catch (error) {
        return res.status(500).json({ response: null, error: error.message });
    }
};
