let User = require('../models/user');
const cloudinary = require('../cloudinary/cloudinary');
const { authJwt } = require('../middleware');

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
    console.log("line40"+uid);
    User.findOne({"_id": ObjectId(uid)})
    .then((user) => {
        console.log(user);
        response.status(200).json({msg: "success", data: user.sarees})
    })
    .catch((err) =>
        response.status(500).json({msg: "Couldn't fetch your sarees"})
    )
}
module.exports.addSaree = addSaree;
module.exports.getUsersSarees = getUsersSarees;
