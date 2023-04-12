const express = require('express');
const app = express.Router();
const { Product } = require('../db');

module.exports = app;

app.get('/products', async(req, res, next) => {
    try {
        res.send(await Product.findAll());
    } catch(err) {
        next(err);
    }
});