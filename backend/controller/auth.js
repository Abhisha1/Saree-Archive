let ObjectId = require('mongodb').ObjectID;
let User = require('../models/user');
let jwt = require('jsonwebtoken');
const { authJwt } = require("../middleware");

function signUp(request,response) {
    console.log("hello")
    const email = request.body.email;
    const password = request.body.password;
    const newUser = new User({
        email: email,
        password: password
    });
    newUser.save()
        .then(() => {
            response.status(200).json({msg: "User added!", id: newUser._id});
        })
        .catch(err => response.status(500).json({msg: 'Error: ' + err}));
};


function signIn(request,response){
    const email = request.body.email;
    const password = request.body.password;
    User.findOne({ email: email }).then(user =>  {
        // Validate the password
        user.comparePassword(password, function(err, isMatch) {
            if (err) {
                response.status(400).json({msg: "Signin Failed: Please check your details"});
                return;
            }
            if (isMatch) {
                let token = jwt.sign({id: user._id}, process.env.SECRET, {
                    // expires in 24 hours
                    expiresIn:86400,
                    issuer: 'GeetsSarees',
                    subject: 'session-token'
                })
                response.status(200).send({token: token, msg: "Login successful"});
                return;
            } else {
                response.status(400).json({msg: "Signin Failed: Please check your details"});
                return;
            }
        });
    }).catch(err => {
        response.status(400).json({msg: "Signin Failed: Please check your details"});
    });
};

function getCurrentUser(request,response){
    const uid = authJwt.verifyToken(request.body.token);
    User.findOne({"_id": ObjectId(uid)})
    .then(user => {
        console.log(user);
        response.status(200).json({
            locations: user.locations,
            crowd: user.crowd,
            tags: user.tags});
    })
    .catch(err => {
        console.log(err);
        response.status(200).json({msg: "Could not find that user, please try again"})
    })
};

module.exports.signUp = signUp;
module.exports.signIn = signIn;
module.exports.getCurrentUser = getCurrentUser;