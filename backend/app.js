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
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:3000");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.header("Access-Control-Allow-Methods",  "POST, GET, PUT, DELETE, OPTIONS, PATCH")
    res.header("Access-Control-Allow-Credentials", "true")
    if(req.method === "OPTIONS"){
        return res.status(200).end();
    }
    next();
});
localAuthStrategy;
jwtAuthStrategy;

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/users', passport.authenticate('jwt', { session : false }), usersRouter);
app.use('/api/V1/places', passport.authenticate('jwt', { session : false }), placesRouter);

module.exports = app;
