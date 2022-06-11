const RequestHandler = require('../helper/RequestHandler');
const Logger = require('../helper/logger');
const User = require("../models/user");
const {USER_NOT_FOUND_ERR} = require("../helper/errors");
const {save} = require("debug");
const logger = new Logger();
const requestHandler = new RequestHandler(logger);


class CardController {
    static async saveSteps(req, res){
            try{
                const {phone,deviceType,role} = res.locals.user
                const stepData = req.body
                const user = await User.findOne({phone:phone ,deviceType: deviceType});
                if (!user) {
                    requestHandler.sendError(req,res,{ status: 400, message: USER_NOT_FOUND_ERR })
                    return;
                }
                await User.findOneAndUpdate({phone:phone,deviceType: deviceType},{$push:{cardSteps:[stepData]}})
                res.status(201).json({
                    type: "success",
                    message: "updated CardStep Data"
                });
            }catch (e) {
                res.status(400).json(e);
            }

    }
}
module.exports = CardController;
