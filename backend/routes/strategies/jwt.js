const passport = require('passport');

let JwtStrategy = require('passport-jwt').Strategy;
let ExtractJwt = require('passport-jwt').ExtractJwt;

const models = require('../../models');
const User = models.User;

let opts =  {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.JWT_SECRET;

const jwtAuthStrategy = passport.use(new JwtStrategy(opts, function (jwt_payload, done){
    User.findAll({where: { id: jwt_payload.id }})
    .then((users) => {
        if(users.length > 0){
            return done(null, users[0]);
        } else {
            return done(null, false);
        }
    })
    .catch((err) => done(err,false));
}));

module.exports.jwtAuthStrategy = this.jwtAuthStrategy;