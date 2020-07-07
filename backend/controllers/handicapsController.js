// Imports
var models = require('../models');
const Handicap = models.Type_Handicap;

// Routes
module.exports = {

//GET lles types d'handicaps enregistrés 
    getHandicaps: function(req, res) {
        Handicap.findAll()
        .then((handicaps) => { 
            if (handicaps) {
                res.status(201).json(handicaps);
            } else {
                res.status(404).json({ 'error': 'users not found' });
            }    
         })
        .catch((error) => { res.status(500).json({ error}) });
    },
//GET un type d'handicap selon son ID
    getHandicap: function(req, res) {
        Handicap.findByPk(req.params.id)
        .then((handicap) => { 
            if (handicap) {
                res.status(201).json(handicap);
            } else {
                res.status(404).json({ error});
            }    
         })
        .catch((error) => { res.status(500).json({ error }) });
    },

//UPDATE un type d'handicap à partir de son ID
    updateHandicap: function(req, res) {
        Handicap.findByPk(req.params.id)
        .then((Handicap) => {
            Handicap.update({
                name: req.body.name,
            })
        ;})
        .then((Handicap) => { res.status(201).json({ Handicap });             
    })
        .catch((error) => res.status(500).json({ error }));
    },

//DELETE un utilisateur à partir de son ID
    deleteHandicap: function(req, res) {
        Handicap.findByPk(req.params.id)
        .then((Handicap) => {
            Handicap.destroy()
                .then(() => {res.json({message: 'Handicap has been deleted !'});})
                .catch((error) => res.status(500).json({error}));
            ;})
        .catch((error) => res.status(404).json({error, message: `Handicap with id ${req.params.id} was not found`}))
    },

//GET le profil public d'un utilisateur
//GET le profil privé d'un utilisateur
//UPDATE le profil privé d'un utilisateur
}