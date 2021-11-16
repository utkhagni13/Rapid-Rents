// Dependencies
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");

// Files
const jwt = require("../utils/jwt-functions");
const userSchema = require("../models/Users");
const UserValidators = require("../validators/UserValidators");

exports.login = async (req, res) => {
    // validate the request
    const { error, value } = UserValidators.login(req.body);
    if (error) {
        return res.status(400).json({ data: null, error: error.details[0].message });
    }
    try {
        // clear current cookie if exists
        res.clearCookie("login");

        // check if user exists
        let result = await userSchema.findOne({
            email: value.email,
        });
        if (result === null) {
            res.status(400).json({ data: null, error: "User does not exists" });
            return;
        }

        // check if password is correct
        let isMatch = await bcrypt.compareSync(value.password, result.password);
        if (!isMatch) {
            res.status(400).json({ data: null, error: "Incorrect Password" });
            return;
        }

        // generate a new token
        const getToken = jwt.createToken(result._id, result.email, result.role);

        // store the token in the database
        if (getToken.data) {
            await userSchema.updateOne({ _id: result._id }, { $set: { token: getToken.data } });
        } else {
            return res.status(400).json({ data: null, error: getToken.error });
        }
        res.cookie("login", JSON.stringify({ jwtToken: getToken.data }), {
            maxAge: 9000000,
            httpOnly: true,
        });
        return res.status(200).json({ data: { result, token: getToken.data }, error: null });
    } catch (error) {
        return res.status(400).json({ data: null, error: error.message });
    }
};

exports.register = async (req, res) => {
    // validate the request
    const { error, value } = UserValidators.register(req.body);
    if (error) {
        return res.status(400).json({ data: null, error: error.details[0].message });
    }
    try {
        // check if user already exists
        let result = await userSchema.findOne({
            email: value.email,
        });
        if (result !== null) {
            res.status(400).json({ data: null, error: "User already exists" });
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
        return res.status(200).json({ data: "Success", error: null });
    } catch (error) {
        return res.status(400).json({ data: null, error: error.message });
    }
};

exports.getUserData = async (req, res) => {
    try {
        let result = await userSchema.findOne({
            _id: req.body.userId,
        });
        if (result === null) {
            res.status(400).json({ data: null, error: "User does not exists" });
            return;
        }
        return res.status(200).json({ data: result, error: null });
    } catch (error) {
        return res.status(400).json({ data: null, error: error.message });
    }
};
