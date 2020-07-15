// Imports
var models = require('../models');
const Place = models.Place;

// Routes
module.exports = {

//CREATE une place
    createPlace: function(req, res) {
        Place.create({
            name: req.body.name,
            street: req.body.street,
            nbStreet: req.body.nbStreet,
            city: req.body.city,
            zip: req.body.zip,
            note: req.body.note,
            typePlaceId: req.body.typePlaceId,
            userId: req.body.userId,
        })
        .then((place) => { res.status(201).json({ place });             
        })
        .catch((error) => res.status(500).json({ error }));
    },

//GET les places
    getPlaces: function(req, res) {
        Place.findAll({include: { association: '{all: true }'}})
        .then((places) => { 
            if (places) {
                res.status(201).json(places);
            } else {
                res.status(404).json({ 'error': 'users not found' });
            }    
         })
        .catch((error) => { res.status(500).json({ error}) });
    },

//GET une place selon son ID
    getPlace: function(req, res) {
        Place.findByPk(req.params.id, {include: { association: '{all: true }'}})
        .then((place) => { 
            if (place) {
                res.status(201).json(place);
            } else {
                res.status(404).json({ error});
            }    
         })
        .catch((error) => { res.status(500).json({ error}) });
    },

//UPDATE une place à partir de son ID
    updatePlace: function(req, res) {
        Place.findByPk(req.params.id)
        .then((place) => {
            Place.update({
                name: req.body.name,
                street: req.body.street,
                nbStreet: req.body.nbStreet,
                city: req.body.city,
                zip: req.body.zip,
                note: req.body.note,
                typePlaceId: req.body.typePlaceId,
                userId: req.body.userId
            })
        ;})
        .then((place) => { res.status(201).json({ place });             
    })
        .catch((error) => res.status(500).json({ error }));
    },

//DELETE une place à partir de son ID
    deletePlace: function(req, res) {
        Place.findByPk(req.params.id)
        .then((Place) => {
            Place.destroy()
                .then(() => {res.json({message: 'Place has been deleted !'});})
                .catch((error) => res.status(500).json({error}));
            ;})
        .catch((error) => res.status(404).json({error, message: `Place with id ${req.params.id} was not found`}))
    },
}