const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const multer = require('multer');
const routes = require('./routes');
require('dotenv').config();

const app = express();
const port = process.env.PORT;


app.use(cors());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.use(express.json());
app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

// Establish connection to MongoDB Atlas cluster
const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { userNewUrlParser: true, useCreateIndex: true });
const connection = mongoose.connection;
connection.once('open', () => {
    console.log('MongoDB connection established successfully');
})

const usersController = require('./controller/users');
const authController = require('./controller/auth');
const sareeController = require('./controller/sarees');


app.use(routes);
// Passively listen on specified port
app.listen(port, () => {
    console.log('Server is running on port: ' + port);
});