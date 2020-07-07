const models = require('../models');
const User = models.User;

User.create({
    pseudonym: "Laesya",
    email: "isaureblaffa.pro@gmail.com",
    password: "1234",
    liveIn: "Salon-de-Provence",
    hasHandicap : false,
    roleId : 1
})
.then((user) => { console.log(user)})
.catch((error) => { console.log(error)})

User.create({
    pseudonym: "Nozone",
    email: "jean.labed@gmail.com",
    password: "1234",
    liveIn: "Salon-de-Provence",
    hasHandicap : false,
    roleId : 1
})
.then((user) => { console.log(user)})
.catch((error) => { console.log(error)})

User.create({
    pseudonym: "Eradna",
    email: "emeline.arousseau@laposte.net",
    password: "1234",
    liveIn: "Saint-Sulpice-La-Pointe",
    hasHandicap : true,
    roleId : 3
})
.then((user) => { console.log(user)})
.catch((error) => { console.log(error)})