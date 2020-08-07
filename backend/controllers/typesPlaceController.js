// Imports
var models = require('../models');
const Place = models.Type_Place;
const User = models.User;
// Routes
module.exports = {

//GET tous les types de places
    getPlaces: function(req, res) {
        Place.findAll({ include : User})
        .then((places) => { 
            if (places) {
                res.status(201).json(places);
            } else {
                res.status(404).json({ 'error': 'Types of places not found' });
            }    
         })
        .catch((error) => { res.status(500).json({ error}) });
    },

//GET les types de places non validés par un admin selon son ID
    getPlaceFalse: function(req, res) {
        Place.findAll({ where: { isValid: false}, include : User})
        .then((places) => { 
            if (places) {
                res.status(201).json(places);
            } else {
                res.status(404).json({ 'error': 'Types of places not valid not found' });
            }    
         })
        .catch((error) => { res.status(500).json({ error}) });
    },

//GET les layouts validé par un admin selon son ID
    getPlaceTrue: function(req, res) {
        Place.findAll( { where: { isValid: true}, include : User} )
        .then((places) => { 
            if (places) {
                res.status(201).json(places);
            } else {
                res.status(404).json({ 'error': 'Types of places valid not found' });
            }    
         })
        .catch((error) => { res.status(500).json({ error}) });
    },
//GET un type de place
    getPlace: function(req, res) {
        Place.findByPk(req.params.id, {include : User} )
        .then((place) => { 
            if (place) {
                res.status(201).json(place);
            } else {
                res.status(404).json({ place });
            }    
        })
        .catch((error) => { res.status(500).json({ error}) });
    },
//CREATE un type de place
    createPlace: function(req, res) {
        console.log(req,'REQ')
            Place.create({
                name: req.body.placeName,
                isValid: false,
                userId: req.body.user,
            })
        .then((place) => { res.status(201).json({ place });})
        .catch((error) => res.status(500).json({ error }));
    },

//UPDATE un type place à partir de son ID
    updatePlace: function(req, res) {
        Place.findByPk(req.params.id)
        .then((place) => {
            place.update({
                name: req.body.placeName,
                isValid: req.body.isValid,
                userId: req.body.user,
            })
                .then((place) => res.status(201).json({ place })
                .catch((error) => res.status(500).json({ error })))
        })
        .catch((error) => { res.status(404).json({ error }); });
    },

//DELETE un type de place à partir de son ID
    deletePlace: function(req, res) {
        Place.findByPk(req.params.id)
        .then((Place) => {
            Place.destroy()
                .then(() => {res.json({message: 'Type of please has been deleted !'});})
                .catch((error) => res.status(500).json({error}));
            ;})
        .catch((error) => res.status(404).json({error, message: `Type of place with id ${req.params.id} was not found`}))
    },
}