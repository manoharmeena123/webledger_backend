const express = require('express');
const searchRouter = express.Router();
const {searchapi}= require('../controller/ recipe.controller');




// Define the route
searchRouter.get('/api/recipes', searchapi);


module.exports ={
    searchRouter
}