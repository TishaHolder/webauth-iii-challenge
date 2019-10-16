//import express
const express = require('express');

//import server
const server = require('./api/server.js');

//set up dynamic port
const port = process.env.PORT || 8000;

//have server listen on port
server.listen(port, () => {
            
    console.log(`\n*** Server Running on http://localhost:${port} ***\n`);

})