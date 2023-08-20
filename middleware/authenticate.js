const jwt = require("jsonwebtoken");
const fs = require("fs")
const express = require("express");
const exp = require("constants");
const app = express()

//redis===========>


const authenticate = async(req, res, next) => {
  // const token = req.cookies.token
  const token = req.headers.authorization

  if (token) {
    jwt.verify(token, "masai", function(err, decode){
      if (decode) {
        const userId = decode.userId
        req.body.userId = userId
        next();
      } else {
          res.send("Please Login First");
      }
    })
  } else {
    // console.log(err);
    res.send("Please Login");
  }


}


module.exports = {
  authenticate
};