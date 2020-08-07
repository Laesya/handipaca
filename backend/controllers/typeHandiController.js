// Imports
var models = require('../models');
const Handi = models.Type_Handicap;
const User = models.User;
// Routes
module.exports = {

//GET tous les types de places
    getHandi: function(req, res) {
        Handi.findAll({ include : User})
        .then((handis) => { 
            if (handis) {
                res.status(201).json(handis);
            } else {
                res.status(404).json({ 'error': 'Types of PMR not found' });
            }    
         })
        .catch((error) => { res.status(500).json({ error}) });
    },

//GET les types de places non validés par un admin selon son ID
    getHandiFalse: function(req, res) {
        Handi.findAll({ where: { isValid: false}, include : User})
        .then((handis) => { 
            if (handis) {
                res.status(201).json(handis);
            } else {
                res.status(404).json({ 'error': 'Types of PMR not valid not found' });
            }    
         })
        .catch((error) => { res.status(500).json({ error}) });
    },

//GET les layouts validé par un admin selon son ID
    getHandiTrue: function(req, res) {
        Handi.findAll( { where: { isValid: true}, include : User} )
        .then((handis) => { 
            if (handis) {
                res.status(201).json(handis);
            } else {
                res.status(404).json({ 'error': 'Types of PMR valid not found' });
            }    
         })
        .catch((error) => { res.status(500).json({ error}) });
    },
//GET un type de place
    getHandi: function(req, res) {
        Handi.findByPk(req.params.id, {include : User} )
        .then((handi) => { 
            if (handi) {
                res.status(201).json(handi);
            } else {
                res.status(404).json({ handi });
            }    
        })
        .catch((error) => { res.status(500).json({ error}) });
    },
//CREATE un type de place
    createHandi: function(req, res) {
            Handi.create({
                name: req.body.handiName,
                isValid: false,
                userId: req.body.user,
            })
        .then((handi) => { res.status(201).json({ handi });             
    })
        .catch((error) => res.status(500).json({ error }));
    },

//UPDATE un type place à partir de son ID
    updateHandi: function(req, res) {
        Handi.findByPk(req.params.id)
        .then((handi) => {
            handi.update({
                name: req.body.handiName,
                isValid: req.body.isValid,
                userId: req.body.user,
            })
                .then((handi) => res.status(201).json({ handi })
                .catch((error) => res.status(500).json({ error })))
        })
        .catch((error) => { res.status(404).json({ error }); });
    },

//DELETE un type de place à partir de son ID
    deleteHandi: function(req, res) {
        Handi.findByPk(req.params.id)
        .then((handi) => {
            handi.destroy()
                .then(() => {res.json({message: 'Type of PMR has been deleted !'});})
                .catch((error) => res.status(500).json({error}));
            ;})
        .catch((error) => res.status(404).json({error, message: `Type of place with id ${req.params.id} was not found`}))
    },
}