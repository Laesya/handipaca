const jwt = require('jsonwebtoken');
const User = require('../models').User;
const os = require('os');
const bcrypt = require('bcrypt');

module.exports =  {
    signIn : function(req, res) {
        /* By default passport save authenticated user in req.user object */
        const user =  {
            id: req.user.id,
            email: req.user.email,
            roleId: req.user.roleId
        };
        const token = jwt.sign(user, process.env.JWT_SECRET);
        res.json({ user, token });
    },

    signUp : function (req, res) { 
        let pseudonym = req.body.pseudonym;
        let email = req.body.email;
        let password =req.body.password;
        let liveIn = req.body.liveIn;
        let hasHandicap = req.body.hasHandicap;
        let roleId = req.body.roleId || 3;    
        
        if(email == null || password == null ){
            return res.status(400).json({ 'error' : 'missing parameters' })
        }
        bcrypt.hash(password, 5, function(err, bcryptedPassword){
            User.create({
                pseudonym: pseudonym,
                email: email,
                password: bcryptedPassword,
                liveIn: liveIn,
                hasHandicap: hasHandicap,
                roleId: roleId
            })
            .then((newUser) => {
                const user =  {
                    id: newUser.id,
                    email: newUser.email,
                    password: newUser.password,
                    roleId: newUser.roleId
                };    
                const token = jwt.sign(user, process.env.JWT_SECRET);
                res.status(201).json({ user, token });
                })
            .catch((err) => {
                res.status(503).json(err);
            });
        })
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