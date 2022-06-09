const env = process.env.NODE_ENV || 'development';
const config = require("../config/config.json")[env];
const mongoose = require("mongoose");


const server = config.host; // REPLACE WITH YOUR DB SERVER
const database = config.database;      // REPLACE WITH YOUR DB NAME

class Database {
    constructor() {
        this._connect()
    }

    _connect() {
        mongoose.connect(`mongodb://${server}/${database}`)
            .then(() => {
                console.log('Database connection successful')
            })
            .catch(err => {
                console.error('Database connection error')
            })
    }
}

module.exports = new Database()
