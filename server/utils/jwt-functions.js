const jwt = require("jsonwebtoken");
const jwtkey = require("../config/Keys");
const jwtconfig = require("../config/JWTConfig.json");

module.exports.createToken = (params) => {
    try {
        const token = jwt.sign(
            { userid: params._id, email: params.email, role: params.role },
            process.env.JWT_SECRET,
            jwtconfig
        );
        return { data: token, error: null };
    } catch (err) {
        return { data: null, error: err };
    }
};

module.exports.verifyToken = (token) => {
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        return { data: decoded, error: null };
    } catch (err) {
        return { data: null, error: err };
    }
};

module.exports.decodeToken = (token) => {
    try {
        const decoded = jwt.decode(token, { complete: true });
        return { data: decoded, error: null };
    } catch (err) {
        return { data: null, error: err };
    }
};
