/**
 * App dependencies.
 */
const config = require("./config/config");
const logger = require('./config/logger');
const morgan = require('morgan');
const xss = require('xss-clean');
const mongoSanitize = require('express-mongo-sanitize');
const express = require("express");
const helmet = require("helmet");
const compression = require("compression");
const cors = require("cors");
const cookieParser = require("cookie-parser");
//var path = require('path');
//const session = require("express-session");
//const MongoStore = require("connect-mongo")(session);
//const flash = require("connect-flash");

const passport = require('passport');
const { jwtStrategy } = require('./config/passport');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

const app = express();

app.use(helmet());
app.use(compression({ threshold: 512 }));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());
app.use(xss());
app.use(mongoSanitize());
//app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());
app.options("*", cors());
// connect flash for flash messages - should be declared after sessions
//app.use(flash());

app.use(passport.initialize());
passport.use('jwt', jwtStrategy);

app.use('/', indexRouter);
app.use('/users', usersRouter);

module.exports = app;
