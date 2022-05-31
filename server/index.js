const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const compression = require('compression');
const { v4: uuid } = require('uuid');
const config = require('../config/appconfig');
const indexRouter = require("../routes/index");
const apiRouter = require("../routes/api");
const apiResponse = require('../helper/apiResponse')


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
app.set('db', require('../models/dbconnect.js'));

app.set('port', process.env.DEV_APP_PORT);

app.use((err,req, res, next) => {
	req.identifier = uuid();
	const logString = `a request has been made with the following uuid [${req.identifier}] ${req.url} ${req.headers['user-agent']} ${JSON.stringify(req.body)}`;
	next();
});

//Route Prefixes
app.use('/', indexRouter);
app.use('/api/', apiRouter);
// throw 404 if URL not found
app.all("*", function(req, res) {
	return apiResponse.notFoundResponse(res, "Page not found");
});

app.use((err, req, res) => {
	if(err.name === "UnauthorizedError"){
		return apiResponse.unauthorizedResponse(res, err.message);
	}
});

app.use((req, res, next) => {
	logger.log('the url you are trying to reach is not hosted on our server', 'error');
	const err = new Error('Not Found');
	err.status = 404;
	res.status(err.status).json({ type: 'error', message: 'the url you are trying to reach is not hosted on our server' });
	next(err);
});

module.exports = app;
