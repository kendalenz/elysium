const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');

//seceretkay?

// app.use(express.json());
app.use(express.urlencoded({ limit: '50mb', extended: false }));

app.use('/dist', express.static(path.join(__dirname, '../dist')));
app.use('/static', express.static(path.join(__dirname, '../static')));

app.get('/', (req, res)=> res.sendFile(path.join(__dirname, '../static/index.html')));
//or res.render?

app.use('/api/auth', require('./api/auth'));
app.use('/api/products', require('./api/products'));
app.use('/api/users', require('./api/users'));

module.exports = app;