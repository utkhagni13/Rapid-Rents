// Dependencies
const mongoose = require("mongoose");

// Files
const SitesValidators = require("../validators/SiteValidators");
const SitesSchema = require("../models/Sites");

module.exports.getRentalSites = async (req, res) => {
    try {
        const sites = await SitesSchema.find();
        if (sites.length > 0) {
            return res.status(200).json({ data: sites, error: null });
        } else {
            return res.status(404).json({ data: null, error: "No sites found" });
        }
    } catch (error) {
        return res.status(500).json({ data: null, error: error.message });
    }
};

module.exports.addRentalSite = async (req, res) => {
    // validate the request
    const { error, value } = SitesValidators.addNewSite(req.body);
    if (error) {
        return res.status(400).json({ data: null, error: error.details[0].message });
    }
    try {
        // check if the site already exist
        const rentalSite = await SitesSchema.findOne({
            name: value.name,
            cityName: value.cityName,
            state: value.state,
        });
        if (rentalSite !== null) {
            return res.status(400).json({ data: null, error: "This Rental Site already exists" });
        }
        // add the rentalSite
        await SitesSchema.insertMany([
            {
                _id: new mongoose.Types.ObjectId(),
                name: value.name,
                type: value.type,
                location: value.location,
                rent: value.rent,
                bhk: value.bhk,
                rooms: value.rooms,
                bathrooms: value.bathrooms,
                kitchen: value.kitchen,
                measurements: value.measurements,
                description: value.description,
                garageFacility: value.garageFacility,
                imageArray: value.imageArray,
                ownerData: value.ownerData,
                city: value.city,
                state: value.state,
                status: true,
            },
        ]);
        return res.status(200).json({ data: "Success", error: null });
    } catch (error) {
        return res.status(500).json({ data: null, error: error.message });
    }
};
