const express = require('express');
const app = express();
const path = require('path');
const request = require('request');
require('dotenv').config();

const index = require('./routes/index');
const call = require('./routes/apicall');

app.use('/', index);
app.use('/call', call);

app.use(express.static(path.join(__dirname, '..', 'public')));
module.exports = app;