const appConfig = require('../config/appconfig')['twillio']
const Logger = require('./logger')
const logger = new Logger();
const twilio = require('twilio')
const client=twilio(appConfig.accountSid, appConfig.authToken)
const requestHandler = require("../helper/RequestHandler")


module.exports = {

    sendOTP(to){
        to = String(to).startsWith("+") ? to : "+91" + to;
        to = String(to).trim().replace(/\s/, ""); // no spaces
        client.verify.services(appConfig.ssid)
            .verifications
            .create({to: to, channel: 'sms'})
            .then(verification =>{
                console.log(verification)
                return verification
                }
            )
            .catch((e) =>{
                console.log("Error", e.stack);
                console.log("Error", e.name);
                console.log("Error", e.message);
            logger.log("error while signUp","error",e)
                return e
        });
    }



}