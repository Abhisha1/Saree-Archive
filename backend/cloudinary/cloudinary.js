// Adapted from Joshua Lugada
const cloudinary = require('cloudinary');
const dotenv = require('dotenv');

dotenv.config();

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})

function uploadStream(fileBuffer, options) {
    return new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream(options, (error, result) => {
          if (error) {
              console.log(error);
            reject(error);
          } else {
              console.log(result)
            resolve(result);
          }
        })
        .end(fileBuffer);
    });
  }

exports.uploads = async(res, files, folder) => {
    console.log(files[0].buffer)
    let res_promises = files.map(file => uploadStream(file.buffer, {destpublic_id: new Date().toISOString()+'-'+file.originalname}))
    // Promise.all will fire when all promises are resolved 
    Promise.all(res_promises)
    .then((result) =>  response.status(200).json({msg: "Success", result: result}))
    .catch((error) => response.status(200).json({msg: "Failed", error: error} ))
}