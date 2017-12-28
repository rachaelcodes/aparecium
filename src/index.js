const express = require('express');
const app = express();
const path = require('path');
const request = require('request');
require('dotenv').config();

app.get('/', (req,res)=> res.sendFile(path.join(__dirname, '..', 'public', 'index.html')))
app.get('/call', (req, res, next) => {
    request({
        uri: 'https://www.potterapi.com/v1/characters',
        qs: {
            key: process.env.API_KEY
        }
    }).pipe(res);
})
app.use(express.static(path.join(__dirname, '..', 'public')));
module.exports = app;