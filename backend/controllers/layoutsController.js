// Imports
var models = require('../models');
const Layout = models.Layout;

// Routes
module.exports = {

//GET les layouts
    getLayouts: function(req, res) {
        Layout.findAll({include: { association: '{all: true }'}})
        .then((layouts) => { 
            if (layouts) {
                res.status(201).json(layouts);
            } else {
                res.status(404).json({ 'error': 'layouts not found' });
            }    
         })
        .catch((error) => { res.status(500).json({ error}) });
    },

//GET un layout selon son ID
    getLayout: function(req, res) {
        Layout.findByPk(req.params.id, {include: { association: '{all: true }'}})
        .then((layout) => { 
            if (layout) {
                res.status(201).json(layout);
            } else {
                res.status(404).json({ layout});
            }    
         })
        .catch((error) => { res.status(500).json({ error}) });
    },

//CREATE une place
    createLayout: function(req, res) {
            Layout.create({
                name: req.body.name,
                userId: req.body.userId,
            })
        .then((layout) => { res.status(201).json({ layout });             
    })
        .catch((error) => res.status(500).json({ error }));
    },

//UPDATE une place à partir de son ID
    updateLayout: function(req, res) {
        Layout.findByPk(req.params.id)
        .then((layout) => {
            Layout.update({
                name: req.body.name,
                userId: req.body.userId,
            })
        ;})
        .then((layout) => { res.status(201).json({ layout });             
    })
        .catch((error) => res.status(500).json({ error }));
    },

//DELETE un layout à partir de son ID
    deleteLayout: function(req, res) {
        Layout.findByPk(req.params.id)
        .then((Layout) => {
            Layout.destroy()
                .then(() => {res.json({message: 'Layout has been deleted !'});})
                .catch((error) => res.status(500).json({error}));
            ;})
        .catch((error) => res.status(404).json({error, message: `Layout with id ${req.params.id} was not found`}))
    },
}