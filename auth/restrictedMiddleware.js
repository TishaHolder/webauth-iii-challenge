//server uses this middleware to verify credentials before providing access to any of our endpoints

/*********************************RESTRICTED MIDDLEWARE USING SESSIONS***************************************/


function restricted (req, res, next){
    
    //if the user successfully logged in a cookie will be saved with this user's information
    //so we no longer need to go and search for anything in the database
    //if we have a session and the user is inside there we can assume that you are already logged in
    if(req.session && req.session.username){

        next(); //if you find the user, go to the end point
    }       
    else {
        res.status(401).json({ message: 'Please provide valid credentials!'});
    }

}

//export the restricted function
module.exports = restricted;
