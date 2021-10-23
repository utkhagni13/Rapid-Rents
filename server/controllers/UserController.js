// Dependencies
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

// Files
const jwtkey = require("../config/Keys");
const jwtconfig = require("../config/JWTConfig.json");
const userSchema = require("../models/Users");
const UserValidators = require("../validators/UserValidators");

exports.login = async (req, res) => {
    // validate the request
    const { error, value } = UserValidators.login(req.body);
    if (error) {
        return res.status(400).json({ response: null, error: error.details[0].message });
    }
    try {
        // check if user exists
        let result = await userSchema.findOne({
            email: value.email,
        });
        if (result === null) {
            res.status(400).json({ response: null, error: "User does not exists" });
            return;
        }

        // check if password is correct
        let isMatch = await bcrypt.compareSync(value.password, result.password);
        if (!isMatch) {
            res.status(400).json({ response: null, error: "Incorrect Password" });
            return;
        }
        const token = jwt.sign(
            { userid: result._id, email: result.email, role: result.role },
            jwtkey.jwtSecret,
            jwtconfig
        );
        return res.status(200).json({ response: { result, token }, error: null });
    } catch (error) {
        return res.status(400).json({ response: null, error: error.message });
    }
};

exports.register = async (req, res) => {
    // validate the request
    const { error, value } = UserValidators.register(req.body);
    if (error) {
        return res.status(400).json({ response: null, error: error.details[0].message });
    }
    try {
        // check if user already exists
        let result = await userSchema.findOne({
            email: value.email,
        });
        if (result !== null) {
            res.status(400).json({ response: null, error: "User already exists" });
            return;
        }

        // encrypt the password
        let hashPassword = await bcrypt.hash(value.password, 10);

        // create the user
        await userSchema.insertMany([
            {
                _id: new mongoose.Types.ObjectId(),
                firstName: value.firstName,
                lastName: value.lastName,
                email: value.email,
                password: hashPassword,
                role: value.role,
                gender: value.gender,
            },
        ]);
        return res.status(200).json({ response: "Success", error: null });
    } catch (error) {
        return res.status(400).json({ response: null, error: error.message });
    }
};
