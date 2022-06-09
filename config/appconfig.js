

require('dotenv').config();

// config.js
module.exports = {
	app: {
		port: process.env.DEV_APP_PORT || 3000,
		appName: process.env.APP_NAME || 'iLrn',
		env: process.env.NODE_ENV || 'development',
	},
	db: {
		port: process.env.DB_PORT || 5432,
		database: process.env.DB_NAME || 'koddle',
		password: process.env.DB_PASS || 'password',
		username: process.env.DB_USER || 'postgres',
		host: process.env.DB_HOST || '127.0.0.1',
		dialect: 'postgres',
		logging: true,
	},
	winiston: {
		logpath: '/iLrnLogs/logs/',
	},
	auth: {
		jwt_secret: process.env.JWT_SECRET,
		jwt_expiresin: process.env.JWT_EXPIRES_IN || '10m',
		saltRounds: process.env.SALT_ROUND || 10,
		refresh_token_secret: process.env.REFRESH_TOKEN_SECRET || 'VmVyeVBvd2VyZnVsbFNlY3JldA==',
		refresh_token_expiresin: process.env.REFRESH_TOKEN_EXPIRES_IN || '2d', // 2 days
	},
	twillio: {
		accountSid: process.env.TWILIO_ACCOUNT_SID || 'AC6b4c5b7822e04ea7f3b983b116fef242',
		authToken: process.env.TWILIO_AUTH_TOKEN || '7d6334552b79f901d879977f362993ae',
		ssid: process.env.SSID || 'VA8bac3794d170a4e8053c40480142c17d',
	},
	firebase:{
		apiKey: "AIzaSyDqdt6H8pDG5lfNKhEtjixA_BBk7_Tiz1Q",
		authDomain: "koddle-15f63.firebaseapp.com",
		projectId: "koddle-15f63",
		storageBucket: "koddle-15f63.appspot.com",
		messagingSenderId: "450046522018",
		appId: "1:450046522018:web:5e8f0319d10b74a1f09dfb",
		measurementId: "G-MD020C5TTP"
	},
	FAST2SMS:'mlUyu0o7KA9bBphgOLXJWQtCHaMi2Gwv4jqI5Zfr3D68EknsNc9gZDY7rieU5pl2kH3czqjb6JhIVf1u'


};
