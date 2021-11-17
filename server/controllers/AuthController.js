const UserModel = require("../models/Users");
const jwt = require("../utils/jwt-functions");

exports.checkAuthorization = (req, res, next) => {
    try {
        // check if req.cookies.login is null or undefined
        if (req.cookies.login === undefined || req.cookies.login === null) {
            return res.status(400).json({ data: false, error: "User not logged in" });
        }

        let checkCookie = JSON.parse(req.cookies.login);
        // check JWT Token
        if (
            checkCookie.jwtToken === undefined ||
            checkCookie.jwtToken === null ||
            checkCookie.jwtToken === ""
        ) {
            return res.status(400).json({ data: null, error: "Unauthorized" });
        }

        // check if token is expired
        const checkToken = jwt.verifyToken(checkCookie.jwtToken);
        if (checkToken.data === null) {
            return res.status(400).json({ data: null, error: "Session Expired" });
        }

        // decoded the token
        const decodedToken = jwt.decodeToken(checkCookie.jwtToken);
        if (decodedToken.data === null) {
            return res.status(400).json({ data: null, error: "Not authorized" });
        }

        // set userid
        req.body.userId = decodedToken.data.payload.userid;
        next();
    } catch (e) {
        return res.status(400).json({ data: null, error: e.message });
    }
};
