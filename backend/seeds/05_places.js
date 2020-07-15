const models = require('../models');
const Place = models.Place;

Place.create({
    name: "Chez Cam",
    street: "Rue Maréchal Joffre",
    nbStreet: 49,
    city: "Salon-de-Provence",
    zip: 13300,
    note: 9,
    typePlaceId: 1,
    userId: 1,      
})
.then((place) => { console.log(place)})
.catch((error) => { console.log(error)})

