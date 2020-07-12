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
router.post('/auth/signup',[
    verifySignUp.checkDuplicateEmail
  ], auth.signUp)
router.post('/auth/getCurrentUser',auth.getCurrentUser)

// User api calls
router.post('/api/users/addCrowd', users.addCrowd)
router.post('/api/users/addLocation', users.addLocation)
router.get('/api/users/getAllUsers', users.getAllUsers)

// Saree api calls
router.post('/api/sarees/add',upload.any('image'), sarees.addSaree)


module.exports = router;



