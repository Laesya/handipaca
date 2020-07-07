const models = require('../models');
const Type = models.Type_Handicap;

Type.create({
    name: "Mental",
    userId: 1
})
.then((role) => { console.log(role)})
.catch((error) => { console.log(error)})

Type.create({
    name: "Auditif",
    userId: 3
})
.then((role) => { console.log(role)})
.catch((error) => { console.log(error)})

Type.create({
    name: "Visuel",
    userId: 3
})
.then((role) => { console.log(role)})
.catch((error) => { console.log(error)})

Type.create({
    name: "Moteur",
    userId: 3
})
.then((role) => { console.log(role)})
.catch((error) => { console.log(error)})

Type.create({
    name: "Plurihandicap",
    userId: 3
})
.then((role) => { console.log(role)})
.catch((error) => { console.log(error)})

Type.create({
    name: "Polyhandicap",
    userId: 3
})
.then((role) => { console.log(role)})
.catch((error) => { console.log(error)})