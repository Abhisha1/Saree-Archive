let User = require('../models/user');
const cloudinary = require('../cloudinary/cloudinary')
const fs = require('fs');
const { authJwt } = require("../middleware");

function addSaree(request, response){
    const uid = authJwt.verifyToken(request.body.token);
    let images = request.files;
    let cloudUrls = []
    Array.from(images).map((item) => {
        if (item.buffer === null || item.buffer === undefined){
            response.sendStatus(500)
            return;
        }
    })
    cloudinary.uploads(images).then((results) => {
        results.forEach((result) => cloudUrls.push(result.secure_url));
        response.status(200).json({msg: "Successful upload"})
    })
    .catch((err) => {
        response.status(500).json({msg: "Upload failed"});
        console.log(err);
    })
    
};
module.exports.addSaree = addSaree;