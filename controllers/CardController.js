const RequestHandler = require('../helper/RequestHandler');
const Logger = require('../helper/logger');
const User = require("../models/user");
const Product = require("../models/product")
const {USER_NOT_FOUND_ERR} = require("../helper/errors");
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
    static async getCards(req, res){
        try{
            const {phone,deviceType,role} = res.locals.user
            const user = await User.findOne({phone:phone ,deviceType: deviceType});
            if (!user) {
                requestHandler.sendError(req,res,{ status: 400, message: USER_NOT_FOUND_ERR })
                return;
            }
            const cards = await Product.find({productType:'card'})
            res.status(200).json(cards);
        }catch (e) {
            res.status(400).json(e);
        }

    }
    static async saveCard(req, res){
        try{
            const {cardTitle} = req.body
            const {phone,deviceType,role} = res.locals.user
            const user = await User.findOne({phone:phone ,deviceType: deviceType});
            if (!user) {
                requestHandler.sendError(req,res,{ status: 400, message: USER_NOT_FOUND_ERR })
                return;
            }
            user.card = cardTitle
            user.save()
            res.status(200).json({
                type: "success",
                message: "card details saved!"
            });
        }catch (e) {
            res.status(400).json(e);
        }

    }
}
module.exports = CardController;
