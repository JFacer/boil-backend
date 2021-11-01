/**
 * Config Module dependencies
 */
const dotenv = require('dotenv');
const join = require('path').join;
const Joi = require('joi');

dotenv.config({ path: join(__dirname, '../../.env') });

/**
 * Define JOI schema for validation
 */
const envSchema = Joi.object().keys({
  NODE_ENV: Joi.string().uppercase().valid('PRODUCTION', 'DEVELOPMENT', 'TEST').required(),
  PORT: Joi.number().default(3000).description('port to connect nodejs to listening requests'),
  MONGODB_HOST: Joi.string().required().description('Mongo DB host'),
  MONGODB_PORT: Joi.number().default(27017),
  MONGODB_BASE: Joi.string().description('DB name for app').default('temp'),
  MONGODB_USER: Joi.string().required().description('Mongo DB username'),
  MONGODB_PASS: Joi.string().required().description('Mongo DB user password'),
  JWT_SECRET: Joi.string().required().description('JWT secret key'),
  JWT_ACCESS_EXPIRATION_MINUTES: Joi.number().default(30).description('minutes after which access tokens expire'),
  JWT_REFRESH_EXPIRATION_DAYS: Joi.number().default(30).description('days after which refresh tokens expire'),
  SMTP_HOST: Joi.string().description('server that will send the emails'),
  SMTP_PORT: Joi.number().description('port to connect to the email server'),
  SMTP_USERNAME: Joi.string().description('username for email server'),
  SMTP_PASSWORD: Joi.string().description('password for email server'),
  EMAIL_FROM: Joi.string().description('the from field in the emails sent by the app'),
});

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

const { value: oEnv, error: oError } = envSchema.prefs(
  {
    abortEarly: false, // include all errors
    allowUnknown: true, // ignore unknown props
    errors: {
      label: "key"
    }
  }
).validate(process.env)
 
//const { oEnv, oError } = envSchema.prefs().validate( process.env );
const valid = oError == null;

if (!valid) {
  const { details } = oError; 
  const message = details.map(i => i.message).join(',');
  console.log("Config Error %O", message); 
  //console.log('Config error: %O', oError.message);
  //throw new Error(JSON.stringify(oError));
}

//const env = oEnv.NODE_ENV; //process.env.NODE_ENV || "development";

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
oEnv.MONGODB_URL = oEnv.MONGODB_URL + "?authenticationMechanisms=DEFAULT&authenticationDatabase=admin";
//debug(oEnv);

module.exports = {
  //url : 'mongodb://<dbuser>:<dbpassword>@novus.modulusmongo.net:27017/<dbName>'
  env: oEnv.NODE_ENV,
  port: oEnv.PORT,
  mongo: {
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