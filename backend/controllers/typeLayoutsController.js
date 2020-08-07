// Imports
var models = require('../models');
const Layout = models.Type_Layout;
const User = models.User;
// Routes
module.exports = {

//GET tous les types delayouts
    getLayouts: function(req, res) {
        Layout.findAll({ include : User})
        .then((layouts) => { 
            if (layouts) {
                res.status(201).json(layouts);
            } else {
                res.status(404).json({ 'error': 'layouts not found' });
            }    
         })
        .catch((error) => { res.status(500).json({ error}) });
    },

//GET les types de layouts non validé par un admin selon son ID
    getLayoutFalse: function(req, res) {
        Layout.findAll({ where: { isValid: false}, include : User})
        .then((layouts) => { 
            if (layouts) {
                res.status(201).json(layouts);
            } else {
                res.status(404).json({layouts});
            }    
         })
        .catch((error) => { res.status(500).json({ error}) });
    },

//GET les types de layouts validé par un admin selon son ID
    getLayoutTrue: function(req, res) {
        Layout.findAll( { where: { isValid: true}, include : User} )
        .then((layouts) => { 
            if (layouts) {
                res.status(201).json(layouts);
            } else {
                res.status(404).json({ layouts});
            }    
         })
        .catch((error) => { res.status(500).json({ error}) });
    },
//GET un type de layout
    getLayout: function(req, res) {
        Layout.findByPk(req.params.id, {include : User} )
        .then((layout) => { 
            if (layout) {
                res.status(201).json(layout);
            } else {
                res.status(404).json({ layout});
            }    
        })
        .catch((error) => { res.status(500).json({ error}) });
    },
//CREATE un type de layout
    createLayout: function(req, res) {
            Layout.create({
                name: req.body.layoutName,
                isValid: false,
                userId: req.body.user,
            })
        .then((layout) => { res.status(201).json({ layout });             
    })
        .catch((error) => res.status(500).json({ error }));
    },

//UPDATE un type de layout à partir de son ID
    updateLayout: function(req, res) {
        Layout.findByPk(req.params.id)
        .then((layout) => {
            layout.update({
                name: req.body.layoutName,
                isValid: req.body.isValid,
                userId: req.body.user,
            })
                .then((layout) => res.status(201).json({ layout })
                .catch((error) => res.status(500).json({ error })))
        })
        .catch((error) => { res.status(404).json({ error }); });
    },

//DELETE un type de layout à partir de son ID
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