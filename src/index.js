const express = require('express');
const app = express();
const path = require('path');
const request = require('request');
require('dotenv').config();

const index = require('./routes/index');
const call = require('./routes/apicall');

app.use('/', index);
app.use('/call', call);

// app.get('/call', (req, res, next) => {
//     request({
//         uri: 'https://www.potterapi.com/v1/characters',
//         qs: {
//             key: process.env.API_KEY
//         }
//     }).pipe(res);
// })
app.use(express.static(path.join(__dirname, '..', 'public')));
module.exports = app;