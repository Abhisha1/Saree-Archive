const router = require('express').Router();
const bcrypt = require('bcrypt');
let ObjectId = require('mongodb').ObjectID;
let User = require('../models/user');

router.route('/').get((req, res) => {
    User.find()
        .then(users => res.json(users))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
    console.log("hello")
    const email = req.body.email;
    const password = req.body.password;
    const newUser = new User({
        email: email,
        password: password
    });
    newUser.save()
        .then(() => {
            res.status(200).json({msg: "User added!", id: newUser._id});
        })
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/login').post((req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    User.findOne({ email: email }).then(user =>  {
        // Validate the password
        user.comparePassword(password, function(err, isMatch) {
            if (err) {
                res.status(400).json({msg: "Signin Failed: Please check your details"});
                return;
            }
            if (isMatch) {
                res.status(200).json({msg: "Login successful", id: user._id});
                return;
            } else {
                res.status(400).json({msg: "Signin Failed: Please check your details"});
                return;
            }
        });
    }).catch(err => {
        res.status(400).json({msg: "Signin Failed: Please check your details"});
    });
});

router.route('/getCurrUser').post((req,res) => {
    User.findOne({"_id": ObjectId(req.body.id)})
    .then(user => {
        console.log(user);
        res.status(200).json({data: user});
    })
    .catch(err => {
        console.log(err);
        res.status(200).json({msg: "Could not find that user, please try again"})
    })
})
module.exports = router;