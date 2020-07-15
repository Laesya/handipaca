const jwt = require('jsonwebtoken');
const User = require('../models').User;
const os = require('os');
const bcrypt = require('bcrypt');

module.exports =  {
    signIn : function(req, res) {
        const user =  {
            id: req.user.id,
            email: req.user.email,
            RoleId: 3
        };
        const token = jwt.sign(user, process.env.JWT_SECRET);
        res.json({ user, token });
    },

    signUp : function (req, res) {
        User.create({
            pseudonym: req.body.pseudonym,
            email: req.body.email,
            password: req.body.password,
            liveIn: req.body.liveIn,
            hasHandicap: req.body.hasHandicap,
            RoleId: 3
        })
        .then((newUser) => {
            const user =  {
                id: newUser.id,
                email: newUser.email,
                password: newUser.password,
                RoleId: newUser.RoleId
            };
            const token = jwt.sign(user, process.env.JWT_SECRET);
            res.json({ user, token });
        })
        .catch((err) => {
            res.status(503).json(err);
        });
    },

    deleteAccount : function(res, req, next) {
        User.findOne({ where: { email: req.body.email }})
        .then((user) => {
            if(user){
                user.destroy()
                .then((deletedUser) => { 
                    res.json({ user : deletedUser});
                })
                .catch((err) => { res.status(500).json(err)});
            } else {
                res.status(404).json({ message : 'User not found '});
            }
        })
    },

    changePassword: function(res, req, next) {
        User.findOne({ where : { email : req.body.email }})
        .then((user) => {
            if(user) {
                bcrypt.compare(req.body.oldPassword, user.dataValues.password, function(err, result){
                    if(result){
                        user.update({password: req.body.password})
                        .then((updatedUser) => { 
                            res.json({user: updatedUser});
                        })
                        .catch((err) => {
                            res.status(500).json({error});
                        })
                    }
                })
            } else {
                res.status(404).json({ message : 'User not found' })
            }
        })
        .catch((error) => { res.status(500).json({error})})
    }
}