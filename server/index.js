const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const compression = require('compression');
const { v4: uuid } = require('uuid');
const config = require('../config/appconfig');
const indexRouter = require("../routes/index");
const apiRouter = require("../routes/api");
const { API_ENDPOINT_NOT_FOUND_ERR, SERVER_ERR } = require("../helper/errors");

const app = express();
app.set('config', config);
app.use(bodyParser.json());

app.use(compression());
app.use(cors());

process.on('SIGINT', () => {
	process.exit();
});
process.on('SIGINT', () =>{
	process.exit();
});
app.set('db', require('../models/database.js'));

app.set('port', process.env.DEV_APP_PORT);

//Route Prefixes
app.use('/', indexRouter);
app.use('/api/', apiRouter);
app.use(express.json());
const morgan = require("morgan");
app.use(morgan("dev"));

module.exports = app;
