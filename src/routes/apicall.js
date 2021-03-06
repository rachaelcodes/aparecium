const express = require('express');
const router = express.Router();
const rp = require('request-promise');

router.get('/', (req, res, next) => {
    rp({
        uri: 'https://www.potterapi.com/v1/characters',
        qs: {
            key: process.env.API_KEY,
            school:'Hogwarts School of Witchcraft and Wizardry'
        },
        json: true
    })
    .then((response)=>res.send(response))
    ;
})

module.exports = router;