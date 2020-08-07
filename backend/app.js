var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const passport = require('passport');
const bodyParser = require('body-parser')

const { localAuthStrategy } = require('./routes/strategies/local');
const { jwtAuthStrategy } = require('./routes/strategies/jwt');



var app = express();

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:3000");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.header("Access-Control-Allow-Methods",  'GET, POST, PUT, DELETE, PATCH, OPTIONS')
    res.header("Access-Control-Allow-Credentials", "true")
    if(req.method === "OPTIONS"){
        return res.status(200).end();
    }
    next();
});
localAuthStrategy;
jwtAuthStrategy;

var usersRouter = require('./routes/users');
var placesRouter = require('./routes/places');
var authRouter = require('./routes/auth');
var typeLayoutRouter = require('./routes/typeOfLayouts');
var typePlaceRouter = require('./routes/typeOfPlaces');
var typeHandiRouter = require('./routes/typeOfHandi');

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/users', passport.authenticate('jwt', { session : false }), usersRouter);
app.use('/api/V1/places', passport.authenticate('jwt', { session : false }), placesRouter);
app.use('/api/V1/types/layouts', passport.authenticate('jwt', { session : false }), typeLayoutRouter);
app.use('/api/V1/types/places', passport.authenticate('jwt', { session : false }),  typePlaceRouter);
app.use('/api/V1/types/pmr', passport.authenticate('jwt', { session : false }), typeHandiRouter);

module.exports = app;
