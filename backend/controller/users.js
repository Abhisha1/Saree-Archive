let ObjectId = require('mongodb').ObjectID;
let User = require('../models/user');
const { authJwt } = require("../middleware");

function getAllUsers(request, response){
    User.find()
        .then(users => response.json(users))
        .catch(err => response.status(400).json('Error: ' + err));
};

function addLocation(request, response){
    const uid = authJwt.verifyToken(request.body.token);
    const locations = request.body.locations;
    User.findOneAndUpdate({"_id": ObjectId(uid)}, {locations: locations}).then(user => {
        response.status(200).json({msg: "Successfully added location"});
    })
    .catch(err => {
        response.status(400).json({msg: "Could not add location"});
    })
}

function addCrowd(request, response){
    const crowd = request.body.crowd;
    const uid = authJwt.verifyToken(request.body.token);
    console.log(uid)
    User.findOneAndUpdate({"_id": ObjectId(uid)}, {crowd: crowd}).then(user => {
        response.status(200).json({msg: "Successfully added crowd"});
    })
    .catch(err => {
        response.status(400).json({msg: "Could not add crowd"});
    })
}

module.exports.getAllUsers = getAllUsers;
module.exports.addLocation = addLocation;
module.exports.addCrowd = addCrowd;