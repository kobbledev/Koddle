const jwt = require("jsonwebtoken");
const { JWT_DECODE_ERR } = require("../helper/errors");
const { auth } = require("../config/appconfig");
const Token = require("../models/token.model")
const User = require("../models/user");

exports.createAccessToken = async (payload) => {
    try {
        let accessToken = jwt.sign(payload, auth.jwt_secret);
        return accessToken;
    } catch (error) {
        console.error(error);
        return;
    }
};
exports.createRefreshToken = async  (payload) =>{
    try {
        let refreshToken = jwt.sign(payload, auth.refresh_token_secret,{expiresIn:auth.jwt_expiresin});
        await  new Token({ token: refreshToken }).save();
        return refreshToken;
    } catch (error) {
        console.error(error);
        return;
    }
}

exports.verifyJwtToken = async  (token) => {
    try {
        const user  =  jwt.verify(token,auth.jwt_secret);
        return user;
    } catch (error) {
        console.error(error);
        return;
    }
};

