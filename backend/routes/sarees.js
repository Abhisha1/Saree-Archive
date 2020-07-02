const router = require('express').Router();
const bcrypt = require('bcrypt');
let Saree = require('../models/saree');

router.route('/').get((req, res) => {
    Saree.find()
        .then(users => res.json(users))
        .catch(err => res.status(400).json('Error: ' + err));
});
module.exports = router;