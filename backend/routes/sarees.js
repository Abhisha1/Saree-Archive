const router = require('express').Router();
const bcrypt = require('bcrypt');
let Saree = require('../models/saree');

router.route('/').get((req, res) => {
    Saree.find()
        .then(users => res.json(users))
        .catch(err => res.status(400).json('Error: ' + err));
});
router.route('/add').post((req, res) => {
    let newItem = new Item();
    const newSaree = new Saree({
        owner: req.body.userId,
        imgs: [ {data: fs.readFileSync(req.files.userPhoto.path),
            contentType = 'image/png'
        }],
        location: req.body.location
    });
    newSaree.save()
        .then(() => {
            res.status(200).json({msg: "User added!", id: newUser._id});
        })
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;