const RequestHandler = require('../helper/RequestHandler');
const Logger = require('../helper/logger');
const {generateOTP,sendOTP} = require('../helper/twillio');
const {createAccessToken,createRefreshToken} =require("../helper/token.utils")
const logger = new Logger();
const requestHandler = new RequestHandler(logger);
const User = require("../models/user")
const BaseController = require("../controllers/BaseController")
const  {
	PHONE_NOT_FOUND_ERR,
		PHONE_ALREADY_EXISTS_ERR,
		USER_NOT_FOUND_ERR,
		INCORRECT_OTP_ERR,
		ACCESS_DENIED_ERR,
	OTP_EXPIRED
} = require("../helper/errors")

class AuthController extends BaseController{

	static async createNewUser(req, res){
		try {
			let { phone,deviceType } = req.body;

			// check duplicate phone Number
			const phoneExist = await User.findOne({ phone:phone,deviceType:deviceType });

			if (phoneExist) {
				res.status(500).json({ type: 'error', message: PHONE_ALREADY_EXISTS_ERR});
				return;
			}

			// create new user
			const createUser = new User({
				deviceType,
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
			requestHandler.sendError(req,res,error)
		}
	}

	static async verifyOtp(req,res){
		try {
			const { otp, phone,deviceType } = req.body;
			const user = await User.findOne({phone:phone,deviceType:deviceType});
			if (!user) {
				res.status(400).json({ type: 'error', message: USER_NOT_FOUND_ERR});
				return;
			}
			if(user.phoneOtp.length===0){
				res.status(400).json({ type: 'error', message:OTP_EXPIRED });
				return;
			}
			if (user.phoneOtp !== otp) {
				res.status(400).json({ type: 'error', message: INCORRECT_OTP_ERR});
				return;
			}
			const token = await createAccessToken({ phone:phone,role:user.role,deviceType:deviceType })
			const refresh = await createRefreshToken({phone:phone,role:user.role,deviceType:deviceType });

			user.phoneOtp = "";
			user.deviceType = deviceType
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
			res.status(400).json(error);
		}
	}

	static async loginWithPhoneOtp(req,res){
		try {
			const { phone, deviceType} = req.body;
			const user = await User.findOne({ phone:phone,deviceType:deviceType });
			if (!user) {
				res.status(400).json({type:'error',message:PHONE_NOT_FOUND_ERR})
				return;
			}

			res.status(201).json({
				type: "success",
				message: "OTP sent to register mobile number",
				data: {
					userId:user._id
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
			res.status(400).json(error);
		}
	}


	static async username(req,res){
		try {
			const { name,deviceType } = req.body;
			const {userInfo} = res.local.user
			const user = await User.findOne({phone:userInfo.phone ,deviceType: deviceType});
			if (!user) {
				requestHandler.sendError(req,res,{ status: 400, message: USER_NOT_FOUND_ERR })
				return;
			}
			user.name = name
			user.deviceType = deviceType
			await user.save();
			requestHandler.sendSuccess(res,{
				type: "success",
				message: "name is updated ",
				data: {
					userId:user._id
				},
			},201)
		} catch (error) {
			requestHandler.sendError(req,res,error)
		}

	}
}
module.exports = AuthController;
