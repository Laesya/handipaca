const models = require('../models');
const Role = models.Role;

Role.create({
    name: "admin"
})
.then((role) => { console.log(role)})
.catch((error) => { console.log(error)})

Role.create({
    name: "editor"
})
.then((role) => { console.log(role)})
.catch((error) => { console.log(error)})

Role.create({
    name: "user"
})
.then((role) => { console.log(role)})
.catch((error) => { console.log(error)})
