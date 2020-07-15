const models = require('../models');
const Layout = models.Layout;

Layout.create({
    name: "Rampe",
    userId: 1,
})
.then((layout) => { console.log(layout)})
.catch((error) => { console.log(error)})

Layout.create({
    name: "Ascenseur",
    userId: 2,
})
.then((layout) => { console.log(layout)})
.catch((error) => { console.log(error)})
