const router = require('express').Router();
const bcrypt = require('bcrypt');
let Saree = require('../models/saree');

router.route('/').get((req, res) => {
    Saree.find()
        .then(users => res.json(users))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    const newUser = new User({
        email: email,
        password: password,
        mobile: req.body.mobile,
        home:req.body.home,
        work:req.body.work
    });
    newUser.save()
        .then(() => {
            res.status(200).json({msg: "User added!", id: newUser._id});
        })
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;