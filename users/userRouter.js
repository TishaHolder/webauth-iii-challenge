//import express
const express = require('express');

//import data access file
const userDB = require('./userModel.js');

//create router
const userRouter = express.Router();

//end points beginning with /api/users
userRouter.get('/', (req, res) => {

    userDB.find()
    .then(users => {
        res.status(200).json(users);
    })
    .catch(error => {
        res.status(500).json({ error: 'There was an error retrieving the users from the database.'});
    })
})

//export router
module.exports = userRouter;