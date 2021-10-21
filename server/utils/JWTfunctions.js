const crypto = require("crypto"),
    jwt = require("jsonwebtoken"),
    refreshTokenLength = 30,
    jwtconfig = require("../config/jwtconfig.json"),
    jwtModel = require("../model/jwt/jwtToken.js"),
    jwtUidLength = 20;
//
// function will create refresh token for user
module.exports.createUserRefreshToken = async () => {
    try {
        console.log("err1");
        return crypto.randomBytes(refreshTokenLength).toString("hex");
    } catch (e) {
        console.log("err2");
        throw e;
    }
};

// function will create unqiue id for JWT token
module.exports.createJWTUniqueID = async () => {
    try {
        console.log("err3");
        return crypto.randomBytes(jwtUidLength).toString("hex");
    } catch (e) {
        console.log("err4");
        throw e;
    }
};

// function will create jwt token
module.exports.createJWTToken = async (params) => {
    try {
        console.log("err5");
        return jwt.sign(
            {
                emailID: params.emailID,
                uuid: params.uuid,
                loginTime: params.time,
                jwtuid: params.jwtUid,
                role: params.role,
            },
            global.secretKey,
            jwtconfig
        );
    } catch (e) {
        console.log("err6");
        throw e;
    }
};
//
//
module.exports.verifyJWT = async (param) => {
    try {
        console.log("err7");
        return jwt.verify(param.jwtToken, global.secretKey);
    } catch (e) {
        console.log("err8");
        throw e;
    }
};

//
module.exports.decodeJWT = async (param) => {
    try {
        console.log("err9");
        return jwt.decode(param.jwtToken, { complete: true });
    } catch (e) {
        console.log("err10");
        throw e;
    }
};
//
module.exports.createUniqueToken = async (tokenLength = 50) => {
    try {
        console.log("err11");
        return crypto.randomBytes(tokenLength).toString("hex");
    } catch (e) {
        console.log("err12");
        throw e;
    }
};
