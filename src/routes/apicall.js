const express = require('express');
const router = express.Router();
const rp = require('request-promise');
const summarise = require('../summarise');

router.get('/', (req, res, next) => {
    rp({
        uri: 'https://www.potterapi.com/v1/characters',
        qs: {
            key: process.env.API_KEY
        },
        json: true
    }).then((response)=>{res.send(summarise(response))});
})

module.exports = router;