const test = require('tape');
const request = require('supertest');
const app = require('./index');
const summarise = require('./summarise');

test('should return homepage from home route', (t) => {
    request(app)
    .get('/')
    .expect(200)
    .end((err, res)=> {
        t.error(err, 'No error');
        t.end();
    })
})

test('/call should return response from API', (t) => {
    request(app)
    .get('/call')
    .expect(200)
    .end((err, res)=> {
        t.error(err, 'No error');
        t.equal(res.body[0].name, 'Hannah Abbott')
        t.end();
    })
})

test ('summarise data should return expected JSON', (t) => {
    t.deepEqual(summarise(exampleJSON), responseJSON);
    t.end();
})

const exampleJSON = [{
    "_id": "5a0fa4daae5bc100213c232e",
    "name": "Hannah Abbott",
    "role": "student",
    "house": "Hufflepuff",
    "school": "Hogwarts School of Witchcraft and Wizardry",
    "__v": 0,
    "ministryOfMagic": false,
    "orderOfThePhoenix": false,
    "dumbledoresArmy": true,
    "deathEater": false,
    "bloodStatus": "half-blood",
    "species": "human"
},
{
    "_id": "5a0fa54aae5bc100213c232f",
    "name": "Bathsheda Babbling",
    "role": "Professor, Ancient Runes",
    "school": "Hogwarts School of Witchcraft and Wizardry",
    "__v": 0,
    "ministryOfMagic": false,
    "orderOfThePhoenix": false,
    "dumbledoresArmy": true,
    "deathEater": false,
    "bloodStatus": "unknown",
    "species": "human"
},
{
    "_id": "5a0fa5deae5bc100213c2330",
    "name": "Ludo Bagman",
    "role": "Head, Department of Magical Games and Sports",
    "__v": 0,
    "ministryOfMagic": true,
    "orderOfThePhoenix": false,
    "dumbledoresArmy": false,
    "deathEater": false,
    "bloodStatus": "unknown",
    "species": "human"
},
{
    "_id": "5a0fa60aae5bc100213c2331",
    "name": "Bathilda Bagshot",
    "role": "Author, A History Of Magic",
    "__v": 0,
    "ministryOfMagic": false,
    "orderOfThePhoenix": false,
    "dumbledoresArmy": false,
    "deathEater": false,
    "bloodStatus": "unknown",
    "species": "human"
},
{
    "_id": "5a0fa648ae5bc100213c2332",
    "name": "Katie Bell",
    "role": "student",
    "house": "Gryffindor",
    "school": "Hogwarts School of Witchcraft and Wizardry",
    "boggart": "Lord Voldemort",
    "__v": 0,
    "ministryOfMagic": false,
    "orderOfThePhoenix": false,
    "dumbledoresArmy": false,
    "deathEater": false,
    "bloodStatus": "pure-blood",
    "species": "human"
}];

const responseJSON = [{
    "_id": "5a0fa4daae5bc100213c232e",
    "name": "Hannah Abbott",
    "role": "student",
    "house": "Hufflepuff",
    "school": "Hogwarts School of Witchcraft and Wizardry",
    "__v": 0,
    "ministryOfMagic": false,
    "orderOfThePhoenix": false,
    "dumbledoresArmy": true,
    "deathEater": false,
    "bloodStatus": "half-blood",
    "species": "human"
},
{
    "_id": "5a0fa54aae5bc100213c232f",
    "name": "Bathsheda Babbling",
    "role": "Professor, Ancient Runes",
    "school": "Hogwarts School of Witchcraft and Wizardry",
    "__v": 0,
    "ministryOfMagic": false,
    "orderOfThePhoenix": false,
    "dumbledoresArmy": true,
    "deathEater": false,
    "bloodStatus": "unknown",
    "species": "human"
},
{
    "_id": "5a0fa5deae5bc100213c2330",
    "name": "Ludo Bagman",
    "role": "Head, Department of Magical Games and Sports",
    "__v": 0,
    "ministryOfMagic": true,
    "orderOfThePhoenix": false,
    "dumbledoresArmy": false,
    "deathEater": false,
    "bloodStatus": "unknown",
    "species": "human"
},
{
    "_id": "5a0fa60aae5bc100213c2331",
    "name": "Bathilda Bagshot",
    "role": "Author, A History Of Magic",
    "__v": 0,
    "ministryOfMagic": false,
    "orderOfThePhoenix": false,
    "dumbledoresArmy": false,
    "deathEater": false,
    "bloodStatus": "unknown",
    "species": "human"
},
{
    "_id": "5a0fa648ae5bc100213c2332",
    "name": "Katie Bell",
    "role": "student",
    "house": "Gryffindor",
    "school": "Hogwarts School of Witchcraft and Wizardry",
    "boggart": "Lord Voldemort",
    "__v": 0,
    "ministryOfMagic": false,
    "orderOfThePhoenix": false,
    "dumbledoresArmy": false,
    "deathEater": false,
    "bloodStatus": "pure-blood",
    "species": "human"
}];