const env = process.env.NODE_ENV || 'development';
const config = require("../config/config.json")[env];
const mongoose = require("mongoose");



mongoose.connect(config.url).then(() => {
    console.log("...........fi ..........")
    //don't show the log when it is test
    if(process.env.NODE_ENV !== "test") {
        console.log("Connected to %s", config.url);
        console.log("App is running ... \n");
        console.log("Press CTRL + C to stop the process. \n");
    }
}).catch(err => {
    console.log(err)
    console.error("App starting error:", err.message);
    process.exit(1);
});
module.exports = mongoose.connection;
