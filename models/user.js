const { model, Schema } = require("mongoose");
const userSchema = new Schema(
    {
        name: {
            type: String,
            trim: true,

        },

        phone: {
            type: String,
            required: true,
            trim: true,
            unique: true,
        },

        role :{
            type : String,
            enum:["ADMIN","USER"],
            default:"USER",
        },
        deviceType:{
            type:String,
            trim:true
        },
        phoneOtp:String
    },
    { timestamps: true }
);
module.exports = model("User", userSchema);