//server uses this middleware to verify the user is logged in before providing access to any of our endpoints
//import json web token
const jwt = require('jsonwebtoken');

const secrets = require('../config/secrets.js');

function restricted (req, res, next){

    //most companies are going to use a specific header called authorization to verify token
    const token = req.headers.authorization;
    
    //if no token was provided
    if(token){
        jwt.verify(token, secrets.jwtSecret, (err, decodedToken) => {
            if(err){
                //means token expired or is invalid
                res.status(401).json({ message: 'Please provide valid credentials!'});
            }
            else {
                //means token is good
                req.user = {username: decodedToken.username};
                next();
            }
        });

        
    }       
    else {
        res.status(401).json({ message: 'No credentials provided!'});
       
    }

}

//export the restricted function
module.exports = restricted;
