const test = require('tape')
const request = require('supertest')
const app = require('../index')

const {filter, retrieveNames, retrieveUnknowns} = require('../../public/data_manipulation')
const {
  exampleData,
  exampleFilteredData,
  expectedDeathEater,
  expectedMuggle,
  expectedWizardBorn,
  expectedBureaucrats
} = require('./sample_data.js')

test('should return homepage from home route', (t) => {
  request(app)
    .get('/')
    .expect(200)
    .end((err, res) => {
      t.error(err, 'No error')
      t.end()
    })
})

test('/call should return response from API', (t) => {
  request(app)
    .get('/call')
    .expect(200)
    .end((err, res) => {
      t.error(err, 'No error')
      t.equal(res.body[0].name, 'Hannah Abbott')
      t.end()
    })
})

test('retrieveNames() returns expected names for filtered data', (t) => {
  const expected = ['Hannah Abbott']
  t.deepEqual(retrieveNames('Hufflepuff', exampleFilteredData, exampleData), expected)
  t.end()
})

test('retrieveNames() returns expected names for unfiltered data', (t) => {
  const expected = ['Katie Bell', 'Cuthbert Binns']
  t.deepEqual(retrieveNames('Gryffindor', [], exampleData), expected)
  t.end()
})

test('retrieveUnknowns() returns expected names for filtered data', (t) => {
  const expected = ['Bathsheda Babbling']
  t.deepEqual(retrieveUnknowns(exampleFilteredData, exampleData), expected)
  t.end()
})

test('retrieveUnknowns() returns expected names for unfiltered data', (t) => {
  const expected = ['Bathsheda Babbling', 'Ludo Bagman', 'Bathilda Bagshot']
  t.deepEqual(retrieveUnknowns([], exampleData), expected)
  t.end()
})

test('filter() returns expected output for "good" case', (t) => {
  t.deepEqual(filter('good', exampleData), exampleFilteredData)
  t.end()
})

test('filter() returns expected output for "deathEater" case', (t) => {
  t.deepEqual(filter('deathEater', exampleData), expectedDeathEater)
  t.end()
})

test('filter() returns expected output for "muggleBorn" case', (t) => {
  t.deepEqual(filter('muggleBorn', exampleData), expectedMuggle)
  t.end()
})

test('filter() returns expected output for "wizardsOnly" case', (t) => {
  t.deepEqual(filter('wizardsOnly', exampleData), expectedWizardBorn)
  t.end()
})

test('filter() returns expected output for "bureaucrats" case', (t) => {
  t.deepEqual(filter('bureaucrats', exampleData), expectedBureaucrats)
  t.end()
})
