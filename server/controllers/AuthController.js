const jwt = require("jsonwebtoken");

const config = require("../config/Keys");

module.exports.getSessionToken = async (req, res) => {
    const token = req.body.jwttoken;
    if (!token) {
        return res.status(400).json({ response: null, error: "Token empty" });
    }
    try {
        console.log(config.jwtSecret);
        const decoded = await jwt.verify(token, config.jwtSecret);
        console.log(decoded);
        return res.status(200).json({ response: decoded, error: null });
    } catch (err) {
        return res.status(401).json({ response: null, error: "Token expired" });
    }
};
