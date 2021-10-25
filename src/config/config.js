/**
 * Config Module dependencies
 */
 const dotenv = require('dotenv');
 const join = require('path').join;
 const joi = require('joi');
 
 dotenv.config({ path: join(__dirname, '../../.env') });
 
 /**
  * Define JOI schema for validation
  */
 const envSchema = joi.object()
   .keys({
     NODE_ENV: joi.string().valid('production', 'development', 'test').required(),
     PORT: joi.number().default(3000).description('port to connect nodejs to listening requests'),
     MONGODB_HOST: joi.string().required().description('Mongo DB host'),
     MONGODB_PORT: joi.number().default(27017),
     MONGODB_USER: joi.string().required().description('Mongo DB username'),
     MONGODB_PASS: joi.string().required().description('Mongo DB user password'),
     JWT_SECRET: joi.string().required().description('JWT secret key'),
     JWT_ACCESS_EXPIRATION_MINUTES: joi.number().default(30).description('minutes after which access tokens expire'),
     JWT_REFRESH_EXPIRATION_DAYS: joi.number().default(30).description('days after which refresh tokens expire'),
     SMTP_HOST: joi.string().description('server that will send the emails'),
     SMTP_PORT: joi.number().description('port to connect to the email server'),
     SMTP_USERNAME: joi.string().description('username for email server'),
     SMTP_PASSWORD: joi.string().description('password for email server'),
     EMAIL_FROM: joi.string().description('the from field in the emails sent by the app'),
   })
   .unknown();
 
 /**
  * Normalize a port into a number, string, or false.
  */
 
 function normalizePort(val) {
   "use strict";    
 
   var port = parseInt(val, 10);
 
   if (isNaN(port)) {
   // named pipe
       return val;
   }
 
   if (port >= 0) {
   // port number
       return port;
   }
 
   return false;
 }
 
 
 /**
  * DB define mongo parameters.
  */
 //process.env.DB_URL = `mongodb://${config.username}:${config.password}@${config.database.host}:${config.database.port}/${config.database.name}?authenticationMechanisms=DEFAULT`;
 /*process.env.DB_URL = util.format(
     config.url,
     config.username,
     config.password,
     config.database.host,
     config.database.port,
     config.database.name
 );*/
 
 //process.env.MONGO_TIMEOUT = 5;
 //process.env.SECRET = config.secret;
 
 const { value: oEnv, oError } = envSchema.prefs(
   { errors: {
       label: "key"
     }
   }
 ).validate(process.env)
 
 const env = process.env.NODE_ENV || "development";
 
 /**
  * DB config variables.
  *
 if (env == "development") {
   config = require("./config/conf-dev");
 } else {
   config = require("./config/conf-prd");
 }*/
 
 oEnv.MONGODB_URL = `mongodb://${oEnv.MONGODB_USER}:${oEnv.MONGODB_PASS}@${oEnv.MONGODB_HOST}:${oEnv.MONGODB_PORT}`;
 oEnv.MONGODB_URL = oEnv.MONGODB_URL + "/" + (oEnv.NODE_ENV === 'production' ? oEnv.MONGODB_BASE : oEnv.MONGODB_BASE + '_test');
 oEnv.MONGODB_URL = oEnv.MONGODB_URL + "?authenticationMechanisms=DEFAULT";
 //debug(oEnv);
 
 module.exports = {
   //url : 'mongodb://<dbuser>:<dbpassword>@novus.modulusmongo.net:27017/<dbName>'
   env: oEnv.NODE_ENV,
   port: oEnv.PORT,
   mongoose: {
     url: oEnv.MONGODB_URL,
     options: {
       useCreateIndex: true,
       useNewUrlParser: true,
       useUnifiedTopology: true
       //reconnectTries: 10,
       //reconnectInterval: 2000
     },
   },
   jwt: {
     secret: oEnv.JWT_SECRET,
     accessExpirationMinutes: oEnv.JWT_ACCESS_EXPIRATION_MINUTES,
     refreshExpirationDays: oEnv.JWT_REFRESH_EXPIRATION_DAYS,
     resetPasswordExpirationMinutes: 10,
   },
   email: {
     smtp: {
       host: oEnv.SMTP_HOST,
       port: oEnv.SMTP_PORT,
       auth: {
         user: oEnv.SMTP_USERNAME,
         pass: oEnv.SMTP_PASSWORD,
       },
     },
     from: oEnv.EMAIL_FROM,
   },
   secret: oEnv.JWT_SECRET
 };