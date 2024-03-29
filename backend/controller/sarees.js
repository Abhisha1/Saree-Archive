let User = require('../models/user');
const cloudinary = require('../cloudinary/cloudinary');
const { authJwt } = require('../middleware');
const limitFactor = 50

let ObjectId = require('mongodb').ObjectID;
function addSaree(request, response){
    const uid = authJwt.verifyToken(request.body.token);
    let images = request.files;
    let saree = JSON.parse(request.body.fields);
    let cloudUrls = []
    Array.from(images).map((item) => {
        if (item.buffer === null || item.buffer === undefined){
            response.sendStatus(500)
            return;
        }
    })
    cloudinary.uploads(images).then((results) => {
        results.forEach((result) => cloudUrls.push(result.secure_url));
        saree.imgs = cloudUrls;
        User.findOneAndUpdate({"_id": ObjectId(uid)}, {$push: {'sarees': saree}})
        .then((user) => {
            console.log(user);
            response.status(200).json({msg: "Successful upload"})
        })
        .catch((err) => {
            response.status(500).json({msg: "Upload failed"});
            console.log(err);
        })
    })
    .catch((err) => {
        response.status(500).json({msg: "Upload failed"});
        console.log(err);
    })
    
};


function getUsersSarees(request, response){
    console.log(request.body.token)
    const uid = authJwt.verifyToken(request.body.token);
    User.aggregate([{$match: {_id: ObjectId(uid)}}, {$unwind: '$sarees'},{$project: {'sarees': 1}}, {$skip: request.body.skip}, {$limit: limitFactor}])
    .then((sarees) => {
        console.log(sarees);
        response.status(200).json({msg: "success", data: sarees})
    })
    .catch((err) =>
        response.status(200).json({msg: "Couldn't fetch your sarees"})
    )
}

function filterSanitising(filters){
    let filter = {};
    if(filters.hasOwnProperty('blouseStitched')){
        filter['sarees.blouseStitched'] = filters['blouseStitched']
    }
    if(filters.hasOwnProperty('location')){
        filter['sarees.location'] = {$in: filters['location']}
    }
    if(filters.hasOwnProperty('type')){
        filter['sarees.type'] = {$in: filters['type']}
    }
    if(filters.hasOwnProperty('crowd')){
        filter['sarees.worn.crowd'] = {$in: filters['crowd']}
    }
    if(filters.hasOwnProperty('tags')){
        filter['sarees.tags'] = {$in: filters['tags']}
    }
    console.log(filter);
    return filter;
}

function sortField(sort){
    let sorter = {};
    if (sort === ""){
        sorter["sarees._id"] = 1
    }
    if (sort === "new-old"){
        sorter["sarees.purchase.datePurchased"] = -1
    }
    if (sort === "old-new"){
        sorter["sarees.purchase.datePurchased"] = 1
    }
    if (sort === "newly-added"){
        sorter["sarees._id"] = -1
    }
    return sorter
}

function filterSarees(request, response){
    let filter = filterSanitising(request.body.filters);
    const uid = authJwt.verifyToken(request.body.token);
    User.aggregate([{$match: {_id: ObjectId(uid)}}, {$unwind: '$sarees'},
     {$match: filter}, {$project: {'sarees': 1}}, {$sort: sortField(request.body.sort)},
      {$skip: request.body.skip}, {$limit: limitFactor}])

    .then((sarees) => {
        console.log(sarees);
        response.status(200).json({msg: "got sarees", sarees: sarees})
    })
    .catch((err) => {
        console.log(err);
        response.status(400).json({msg: "We could not fetch your results"})
    })
}

function getSaree(request, response){
    const uid = authJwt.verifyToken(request.body.token);
    console.log("hello")
    // User.findById({_id: ObjectId(uid)}, {$elemMatch: {'sarees._id': ObjectId(request.body._id)}})
    User.aggregate([{$match: {_id: ObjectId(uid)}}, {$unwind: '$sarees'},
     {$match: {'sarees._id': ObjectId(request.body._id)}}])
    .then((sarees) => {
        console.log(sarees);
        response.status(200).json({msg: "got sarees", item: sarees})
    })
    .catch((err) => {
        console.log(err);
        response.status(400).json({msg: "We could not fetch your results"})
    })
}
function updateSaree(request, response){
    User.updateOne({'sarees._id': ObjectId(request.body._id)}, {$set: {'sarees.$': request.body.saree}})
    .then((sarees) => {
        console.log(sarees);
        response.status(200).json({msg: "got sarees", item: sarees})
    })
    .catch((err) => {
        console.log(err);
        response.status(400).json({msg: "We could not fetch your results"})
    })
}


module.exports.addSaree = addSaree;
module.exports.getUsersSarees = getUsersSarees;
module.exports.filterSarees = filterSarees
module.exports.getSaree = getSaree;
module.exports.updateSaree = updateSaree