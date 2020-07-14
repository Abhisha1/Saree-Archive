let User = require('../models/user');
const cloudinary = require('../cloudinary/cloudinary')

let ObjectId = require('mongodb').ObjectID;
function addSaree(request, response){
    // const uid = authJwt.verifyToken(request.token);
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
        User.findOneAndUpdate({"_id": ObjectId("5ed37a9904d3e25b98f7911c")}, {$push: {'sarees': saree}})
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
module.exports.addSaree = addSaree;
