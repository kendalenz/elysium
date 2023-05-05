const express = require('express');
const app = express.Router();
const { Product } = require('../db');

module.exports = app;

app.get('/', async(req, res, next) => {
  try {
    const products = await Product.findAll();
    res.send(products);
  } catch(err) {
    next(err);
  }
});

app.get('/:id', async(req, res, next) => {
  try {
    const product = await Product.findByPk(req.params.id);
    res.send(product);
  } catch(err) {
    next(err);
  }
});