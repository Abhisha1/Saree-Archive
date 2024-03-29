"use strict"
const express = require('express');
const router = express.Router();
const { verifySignUp } = require("../middleware");
const upload = require('../multer/multer');

const users = require('../controller/users.js');
const auth = require('../controller/auth.js');
const sarees = require('../controller/sarees.js');

// Auth api calls
router.post('/auth/login', auth.signIn)
router.post('/auth/signup',
    verifySignUp(), auth.signUp)
router.post('/auth/getCurrentUser',auth.getCurrentUser)

// User api calls
router.post('/api/users/addCrowd', users.addCrowd)
router.post('/api/users/addLocation', users.addLocation)
router.get('/api/users/getAllUsers', users.getAllUsers)
router.post('/api/users/addTags', users.addTags)

// Saree api calls
router.post('/api/sarees/add',upload.array('files', 100), sarees.addSaree)
router.post('/api/sarees/getUsersSarees', sarees.getUsersSarees);
router.post('/api/sarees/filterSarees', sarees.filterSarees);
router.post('/api/sarees/getSaree', sarees.getSaree);
router.post('/api/sarees/updateSaree', sarees.updateSaree);

module.exports = router;



