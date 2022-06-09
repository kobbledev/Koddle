const Joi = require('joi');
const bcrypt = require('bcrypt');
const _ = require('lodash');
const jwt = require('jsonwebtoken');
const config = require('../config/appconfig');
const RequestHandler = require('../helper/RequestHandler');
const Logger = require('../helper/logger');
const {generateOTP,sendOTP} = require('../helper/twillio');
const {createAccessToken,createRefreshToken} =require("../helper/token.utils")
const logger = new Logger();
const requestHandler = new RequestHandler(logger);
const tokenList = {};
const User = require("../models/user")
const BaseController = require("../controllers/BaseController")
const  {
	PHONE_NOT_FOUND_ERR,
		PHONE_ALREADY_EXISTS_ERR,
		USER_NOT_FOUND_ERR,
		INCORRECT_OTP_ERR,
		ACCESS_DENIED_ERR,
} = require("../helper/errors")

class AuthController extends BaseController{

	static async createNewUser(req, res, next){
		try {
			let { phone } = req.body;

			// check duplicate phone Number
			const phoneExist = await User.findOne({ phone });

			if (phoneExist) {
				res.status(500).json({ type: 'error', message: PHONE_ALREADY_EXISTS_ERR});
				return;
			}


			// create new user
			const createUser = new User({
				phone,
				role : phone === process.env.ADMIN_PHONE ? "ADMIN" :"USER"
			});

			// save user

			const user = await createUser.save();
			res.status(200).json({
				type: "success",
				message: "Account created OTP sent to mobile number",
				data: {
					userId: user._id,
				},
			});

			// generate otp
			const otp = generateOTP(6);
			// save otp to user collection
			user.phoneOtp = otp;
			await user.save();
			// send otp to phone number
			await sendOTP(user.phone, `Your OTP is ${otp}`)
		} catch (error) {
			next(error);
		}
	}

	static async verifyOtp(req,res,next){
		try {
			const { otp, phone } = req.body;
			const user = await User.findOne({phone:phone});
			if (!user) {
				next({ status: 400, message: USER_NOT_FOUND_ERR });
				return;
			}

			if (user.phoneOtp !== otp) {
				next({ status: 400, message: INCORRECT_OTP_ERR });
				return;
			}
			const token = await createAccessToken({ phone:phone,role:user.role })
			const refresh = await createRefreshToken({phone:phone,role:user.role });

			//user.phoneOtp = "";
			await user.save();

			res.status(201).json({
				type: "success",
				message: "OTP verified successfully",
				data: {
					token,
					refresh
				},
			});
		} catch (error) {
			next(error);
		}
	}
}
module.exports = AuthController;
