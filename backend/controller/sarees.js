let User = require('../models/user');
const cloudinary = require('../cloudinary/cloudinary')
const fs = require('fs');
const { authJwt } = require("../middleware");

function addSaree(request, response){
    // const uid = authJwt.verifyToken(request.body.token);
    let saree = request.files;
    Array.from(saree).map((item) => {
        if (item.buffer === null || item.buffer === undefined){
            return response.send(500)
        }
    })
    console.log(saree)
    cloudinary.uploads(response, saree, 'Images');
    
};
module.exports.addSaree = addSaree;