
let Saree = require('../models/saree');

function addSaree(request, response){
    Saree.find()
        .then(users => response.json(users))
        .catch(err => response.status(400).json('Error: ' + err));
};
module.exports.addSaree = addSaree;