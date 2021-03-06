// Imports
var models = require('../models');
const User = models.User;

// Routes
module.exports = {

//GET les admins
    getAdmins: function(req, res) {
        User.findAll({
            where: {
              roleId: 1
            },
            include : 'suggestLayout',
          })
        .then((users) => { 
            if (users) {
                res.status(201).json(users);
            } else {
                res.status(404).json({ 'error': 'users not found' });
            }    
         })
        .catch((error) => { res.status(500).json({ error}) });
    },

//GET les users
    getUsers: function(req, res) {
        User.findAll({include : ['suggestLayout', 'suggestHandi', 'suggestPlace']})
        .then((users) => { 
            if (users) {
                res.status(201).json(users);
            } else {
                res.status(404).json({ 'error': 'users not found' });
            }    
         })
        .catch((error) => { res.status(500).json({ error}) });
    },

//GET un utilisateur selon son ID
    getUser: function(req, res) {
        User.findByPk(req.params.id, {include : ['suggestLayout', 'suggestHandi', 'suggestPlace', 'places']})
        .then((user) => { 
            if (user) {
                res.status(201).json(user);
            } else {
                res.status(404).json({ error});
            }    
         })
        .catch((error) => { res.status(500).json({ error}) });
    },

//UPDATE un utilisateur à partir de son ID
    updateUser: function(req, res) {
        User.findByPk(req.params.id)
        .then((user) => {
            user.update({
                pseudonym: req.body.pseudonym,
                email: req.body.email,
                password: req.body.password,
                liveIn: req.body.liveIn,
                hasHandicap: req.body.hasHandicap,
                RoleId: req.body.RoleId
            })
                .then((user) => res.json({ user }))
                .catch((error) => res.json({ error }));
        })
        .catch((error) => { res.status(404).json({ error }); });
    },
    
    

//DELETE un utilisateur à partir de son ID
    deleteUser: function(req, res) {
        User.findByPk(req.params.id)
        .then((User) => {
            User.destroy()
                .then(() => {res.json({message: 'User has been deleted !'});})
                .catch((error) => res.status(500).json({error}));
            ;})
        .catch((error) => res.status(404).json({error, message: `User with id ${req.params.id} was not found`}))
    },

//GET le profil public d'un utilisateur
//GET le profil privé d'un utilisateur
//UPDATE le profil privé d'un utilisateur
}