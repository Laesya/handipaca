// Imports
var models = require('../models');
const placehaslayout = require('../models/placehaslayout');
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
    }, { include: ['layouts'] }) // layouts are include here to return them if creation is successfull
        .then((place) => {
          console.log(req.body, 'REQBODY')
          if (req.body.layoutIds) {
            const layoutIds = Array.isArray(req.body.layoutIds) ? req.body.layoutIds : req.body.layoutIds.split(',')
            place.setLayouts(layoutIds) // layoutIds must be an array of id of Layout ex: [1, 7, 14]
              .then((LayoutsPlaceAssociation) => {
                // Reload instance first to display layouts associations
                place.reload().then(place => res.status(201).json({ place })) // Place was created and layouts was linked!
              })
              .catch((error) => {
                res.status(500).json({ error: error })
              })
          } else {
            res.status(201).json({ place }); // Place was created but no services linked!
          }
        })
        .catch((error) => {
          res.status(500).json({ error: error })
        })
    },

//GET les places
    getPlaces: (req, res, next) => {
        Place.findAll({include : ['layouts', 'type'] }) // Include all association and nested
          .then((places) => {
            if (places) {
                console.log(places)
                res.status(201).json(places);
            } else {
                res.status(404).json({ 'error': 'places not found' });
            } 
          })
          .catch((error) => res.status(500).json({ error }));
      },

//GET une place selon son ID
    getPlace: function(req, res) {
        Place.findByPk(req.params.id, {include : ['layouts', 'user', 'type'] })
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
    updatePlace: function(req, res, next) {
        Place.findByPk(req.params.id, { include: ['pictures', 'services'] })
          .then((place) => {
            place.update({
                name: req.body.name,
                street: req.body.street,
                nbStreet: req.body.nbStreet,
                city: req.body.city,
                zip: req.body.zip,
                note: req.body.note,
                typePlaceId: req.body.typePlaceId,
                userId: req.body.userId
            })
              .then((updateplace) => {
                if (req.body.layoutsIds) {
                  const layoutsIds = Array.isArray(req.body.layoutsIds) ? req.body.layoutsIds : req.body.layoutsIds.split(',')
                  place.setLayouts(layoutsIds) // serviceIds must be an array of id of Service ex: [1, 7, 14]
                    .then((LayoutsPlaceAssociation) => {
                      // Reload instance first to display services associations
                      place.reload()
                        .then(place => res.status(201).json({ place })) // Place was created and layouts was linked!
                    })
                    .catch((error) => {
                      res.status(500).json({ error: error })
                    })
                } else {
                    res.status(201).json({ place }); // Place was created but no layouts linked!
                }
              })
              .catch((error) => res.status(500).json({ error }));
          })
          .catch((error) => res.status(500).json({ error }));
      },
//DELETE une place à partir de son ID
    deletePlace: async function(req, res, next) {
        try {
          const place = await Place.findByPk(req.params.id)
          await place.setLayouts([])
          await place.destroy()
          res.status(201).json({ message: 'Place has been deleted !' })
        } catch (e) {
          res.status(500).json({ error: e })
        }
      },

    findByUserId: function (req, res) {
        const query = {
          where: { userId: req.params.id },
          include: { all: true, nested: true }
        }
    
        Place.findAll(query)
          .then((place) => res.status(201).json({ place }))
          .catch((error) => res.status(500).json({ error }))
      },
}

