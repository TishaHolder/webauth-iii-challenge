//import express
const express = require('express');

//import database object
const db = require('../data/dbConfig.js');

//export functions
module.exports = {
    find,
    findByUserName,
    findById,
    add,
    update,
    remove

};

//define CRUD methods
function find(){

    return db('users');
}

function findByUserName({ username }){

    return db('users')
    .where({ 'users.username': username})
    .first();

}

function findById(id){

    return db('users')
    .where({ 'users.id': id })
    .first();    
}


function add(first_name, last_name, username, password, departmment){

    return db('users')
    .insert({ first_name, last_name, username, password, password })
    .then ( ([id]) => {
        return findById(id);
    })
}

function update(id, changes){

}

function remove(id){

}