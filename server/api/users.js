const express = require('express');
const app = express.Router();
const { User } = require('../db');

module.exports = app;

app.use(express.json());

app.get('/', async(req,res, next) => {
  try {
    res.send(await User.findAll());
  } catch(err) {
    next(err);
  }
});

