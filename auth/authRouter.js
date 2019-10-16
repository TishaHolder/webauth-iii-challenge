//import express
const express = require('express');

//import bcrypt
const bcrypt = require('bcrypt');

//import json web token
const jwt = require('jsonwebtoken');

//import data access file
const authDB = require('../users/userModel.js');

//create auth router
const authRouter = express.Router();

//endpoints beginning with /api/auth
authRouter.post('/register', (req, res) => {

     //destructure the info received from req.body
     const { first_name, last_name, username, password, department } = req.body;

     //hash the password. 8 indicates hashing rounds (2^8) and how we slow down attackers trying to pregenerate hashes
     //Having an algorithm that hashes the information multiple times (rounds) means an attacker needs to 
     //have the hash, know the algorithm used, and how many rounds were used to generate the hash in the first place.
     const hash = bcrypt.hashSync(password, 8);
 
     authDB.add({ first_name, last_name, username, password: hash, department })
     .then(user => {

        //send a token when the user registers so they can log in automatically
         res.status(200).json(user);
     })
     .catch(error => {
         console.log("registration error", error);
         res.status(500).json({ error: 'There was a registration error.'})
     })

})

authRouter.post('/login', (req, res) => {

    const { username, password } = req.body;    

    authDB.findByUserName({ username })    
    .then(user => {             
        //check that passwords match
        if(user && bcrypt.compareSync(password, user.password)){

            const token = generateToken(user);
            
            res.status(200).json({ token });
        }
        else {
            // we will return 401 if the password or username are invalid
            // we don't want to let attackers know when they have a good username
            res.status(401).json({ message: 'Invalid Credentials!'});
        }
    })
    .catch(error => {
        console.log("log in error", error);
        res.status(500).json({ error: 'There was an error signing the user into the database.'});
    })
})

authRouter.get('/logout', (req, res) => {
    if(req.session){
        req.session.destroy(err => {
            if(err){
                res.json({ message: 'There was an error logging you out!'})
            }
            else{
                res.status(200).json({ message: 'See you again soon....Thanks for stoppying by!'})
            }
        })
    }
    else {
        res.status(200).json({ message: 'Your are not currently logged in!'})
    }
})

//could be in a separate file
function generateToken(user){

    const payload = {
        username: user.username
    };

    const secret = 'keep it secret!';

    const options = {
        expiresIn: '1d'

    }

    //calls jwt's sign method
    //secret is used to protect the token
    //library will produce a signature based on the secret you give it
    return jwt.sign(payload, secret, options);

}

//export router
module.exports = authRouter;






