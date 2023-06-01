const express = require('express');
const app = express.Router();
const { User, Product } = require('../db');

module.exports = app;

app.get('/users', async(req, res, next)=> {
    try {
      res.send(await User.findAll()); 
    }
    catch(ex){
      next(ex);
    }
  });

app.get('/products', async(req, res, next) => {
    try {
        res.send(await Product.findAll());
    } catch(err) {
        next(err);
    }
});