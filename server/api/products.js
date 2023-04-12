const express = require('express');
const app = express.Router();
const { Product } = require('..db');

module.exports = app;

app.get('/', async(req, res, next) => {
  try {
    const products = await Product.findAll();
  } catch(err) {
    next(err);
  }
});