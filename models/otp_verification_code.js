const mongoose = require('mongoose');
const Schema = mongoose.Schema;
let optSchema = new Schema({
    code:{
        type:String
    },
    mobile:{
        type:String
    },
    verified:{
        type:Boolean
    }
}, { timestamps: true })
const otp = mongoose.model("otp_verification_code", optSchema);
module.exports = otp