const express = require('express');
const app = express.Router();
const { User } = require('../db');
const { isLoggedIn } = require('./middleware');

//possibly delete
// const passport = require('passport');

module.exports = app;

app.post('/', async(req, res, next)=> {
  try {
    res.send(await User.authenticate(req.body));
  }
  catch(ex){
    next(ex);
  }
});

app.post('/register', async (req, res, next)=> {
  try {
    const user = await User.create(req.body);
    res.send(user.generateToken());
  } catch(err) {
    next(err);
  }
});
  
app.get('/', isLoggedIn, async(req, res, next)=> {
  try {
    res.send(req.user);
  }
  catch(ex){
    next(ex);
  }
});

// app.put('/', isLoggedIn, async(req, res, next)=> {
//   try {
//     const user = await User.findByToken(req.headers.authorization)
//     await user.update(req.body);
//     res.send(user);
//   }
//   catch(ex){
//     next(ex);
//   }
// });
  