const { model, Schema } = require("mongoose");
const tokenSchema = new Schema(
    {
        token: {
            type: String,
            trim: true,
        }
    },
    { timestamps: true }
);
module.exports = model("Token", tokenSchema);