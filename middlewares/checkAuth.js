
const User = require("../models/user")
const { AUTH_TOKEN_MISSING_ERR, AUTH_HEADER_MISSING_ERR, JWT_DECODE_ERR, USER_NOT_FOUND_ERR } = require("../helper/errors")
const { verifyJwtToken } = require('../helper/token.utils')




module.exports = async (req, res, next) => {
    try {
        // check for auth header from client
        const header = req.headers.authorization

        if (!header) {
            next({ status: 403, message: AUTH_HEADER_MISSING_ERR })
            return
        }

        // verify  auth token
        const token = header.split("Bearer ")[1]

        if (!token) {
            next({ status: 403, message: AUTH_TOKEN_MISSING_ERR })
            return
        }

        const userInfo = await verifyJwtToken(token)

        if (!userInfo) {
            next({ status: 403, message: JWT_DECODE_ERR })
            return
        }

        const user = await User.findOne({phone:userInfo.phone})

        if (!user) {
            next({status: 404, message: USER_NOT_FOUND_ERR })
            return
        }

        res.locals.user = user

        next()
    } catch (err) {
        next(err)
    }
}