// Dependencies
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");

// Files
const userSchema = require("../models/Users");
const UserValidators = require("../validators/UserValidators");

exports.login = async (req, res) => {
    const { error, value } = UserValidators.login(req.body);
    if (error) {
        return res.status(400).json({ response: null, error: error.details[0].message });
    }
    try {
        let result = await userSchema.findOne({
            email: value.email,
        });
        console.log(result);
        if (result === null) {
            res.status(400).json({ response: null, error: "User does not exists" });
            return;
        }
        let isMatch = await bcrypt.compareSync(value.password, result.password);
        if (!isMatch) {
            res.status(400).json({ response: null, error: "Password is incorrect" });
            return;
        }
        return res.status(200).json({ response: "Success", error: null });
    } catch (error) {
        return res.status(400).json({ response: null, error: error.message });
    }
};

exports.register = async (req, res) => {
    const { error, value } = UserValidators.register(req.body);
    if (error) {
        return res.status(400).json({ response: null, error: error.details[0].message });
    }
    let hashPassword = await bcrypt.hash(value.password, 10);
    try {
        await userSchema.insertMany([
            {
                _id: new mongoose.Types.ObjectId(),
                firstName: value.firstName,
                lastName: value.lastName,
                email: value.email,
                password: hashPassword,
                role: value.role,
                mobile: value.mobile,
                gender: value.gender,
            },
        ]);
        return res.status(200).json({ response: "Success", error: null });
    } catch (error) {
        return res.status(400).json({ response: null, error: error.message });
    }
};
