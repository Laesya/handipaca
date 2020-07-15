var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const passport = require('passport');

const { localAuthStrategy } = require('./routes/strategies/local');
const { jwtAuthStrategy } = require('./routes/strategies/jwt');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var placesRouter = require('./routes/places');
var authRouter = require('./routes/auth');
var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

localAuthStrategy;
jwtAuthStrategy;

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/users', passport.authenticate('jwt', { session : false }), usersRouter);
app.use('/api/V1/places', passport.authenticate('jwt', { session : false }), placesRouter);

module.exports = app;
