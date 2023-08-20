const express = require("express");
const searchRouter = express.Router();
const axios = require("axios");
require("dotenv").config()

// Search=====================================================================>
const searchapi = async (req, res) => {
    const query = req.query.query || 'pizza';
    const maxFat = req.query.maxFat || 60;
    const resultsPerPage = 50;
    const page = req.query.page || 1; 

    try {
        const response = await axios.get('https://api.spoonacular.com/recipes/complexSearch', {
      params: {
        query: query,
        maxFat: maxFat,
        apiKey: process.env.SPOONACULAR_API_KEY,
        includeNutrition: true,
        offset: (page - 1) * resultsPerPage, 
        number: resultsPerPage,
      },
    });

        const recipes = response.data.results;
        res.json(recipes);
    } catch (error) {
        console.error('Error fetching recipes:', error.message);
        res.status(500).json({ error: 'Failed to fetch recipes' });
    }
};



module.exports ={
 searchapi

     }
