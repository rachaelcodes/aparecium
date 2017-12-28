const test = require('tape');
const request = require('supertest');
const app = require('./index');

test('should return homepage from home route', (t) => {
    request(app)
    .get('/')
    .expect(200)
    .end((err, res)=> {
        t.error(err, 'No error');
        t.end();
    })
})