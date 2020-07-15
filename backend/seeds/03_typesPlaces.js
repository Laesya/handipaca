const models = require('../models');
const TypePlace = models.Type_Place;

TypePlace.create({
    name: "Restaurant",
    userId: 1,
})
.then((typePlace) => { console.log(typePlace)})
.catch((error) => { console.log(error)})

TypePlace.create({
    name: "Cinéma",
    userId: 1,
})
.then((typePlace) => { console.log(typePlace)})
.catch((error) => { console.log(error)})

TypePlace.create({
    name: "Piscine",
    userId: 2,
})
.then((typePlace) => { console.log(typePlace)})
.catch((error) => { console.log(error)})