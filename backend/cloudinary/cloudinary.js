// Adapted from Joshua Lugada
const cloudinary = require('cloudinary');
const dotenv = require('dotenv');

dotenv.config();

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})

function uploadStream(file) {
    return new Promise((resolve, reject) => {
      cloudinary.v2.uploader
        .upload_stream({}, (error, result) => {
          if (error) {
              console.log("error")
            reject(error);
          } else {
            resolve(result);
          }
        }).end(file)
    });
  }

exports.uploads = (files) => {
    let res_promises = []
    files.map(file => res_promises.push(uploadStream(file.buffer)))
    // Promise.all will fire when all promises are resolved 
    return Promise.all(res_promises);
}