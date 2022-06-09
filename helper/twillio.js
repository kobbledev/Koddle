const appConfig = require('../config/appconfig')['twillio']
const Logger = require('./logger')
const logger = new Logger();
const twilio = require('twilio')
const RequestHandler = require("./RequestHandler");
const client=twilio(appConfig.accountSid, appConfig.authToken)
const errHandler = new RequestHandler(logger);
class OTPVerification{
   static generateOTP = (otp_length) => {
        // Declare a digits variable
        // which stores all digits
        var digits = "0123456789";
        let OTP = "";
        for (let i = 0; i < otp_length; i++) {
            OTP += digits[Math.floor(Math.random() * 10)];
        }
        return OTP;
    };
   static async  sendOTP(to , message){
        to = String(to).startsWith("+") ? to : "+91" + to;
        to = String(to).trim().replace(/\s/, ""); // no spaces
       const response = await client.messages.create({
           body: message,
           messagingServiceSid: appConfig.ssid,
           to: to
       })
       return response
    }

}

module.exports = OTPVerification