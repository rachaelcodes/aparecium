module.exports = {
  exampleData: [{
    '_id': '5a0fa4daae5bc100213c232e',
    'name': 'Hannah Abbott',
    'role': 'student',
    'house': 'Hufflepuff',
    'school': 'Hogwarts School of Witchcraft and Wizardry',
    '__v': 0,
    'ministryOfMagic': false,
    'orderOfThePhoenix': false,
    'dumbledoresArmy': true,
    'deathEater': false,
    'bloodStatus': 'half-blood',
    'species': 'human'
  },
  {
    '_id': '5a0fa54aae5bc100213c232f',
    'name': 'Bathsheda Babbling',
    'role': 'Professor, Ancient Runes',
    'school': 'Hogwarts School of Witchcraft and Wizardry',
    '__v': 0,
    'ministryOfMagic': false,
    'orderOfThePhoenix': false,
    'dumbledoresArmy': true,
    'deathEater': false,
    'bloodStatus': 'unknown',
    'species': 'human'
  },
  {
    '_id': '5a0fa5deae5bc100213c2330',
    'name': 'Ludo Bagman',
    'role': 'Head, Department of Magical Games and Sports',
    '__v': 0,
    'ministryOfMagic': true,
    'orderOfThePhoenix': false,
    'dumbledoresArmy': false,
    'deathEater': false,
    'bloodStatus': 'unknown',
    'species': 'human'
  },
  {
    '_id': '5a0fa60aae5bc100213c2331',
    'name': 'Bathilda Bagshot',
    'role': 'Author, A History Of Magic',
    '__v': 0,
    'ministryOfMagic': false,
    'orderOfThePhoenix': false,
    'dumbledoresArmy': false,
    'deathEater': false,
    'bloodStatus': 'unknown',
    'species': 'human'
  },
  {
    '_id': '5a0fa648ae5bc100213c2332',
    'name': 'Katie Bell',
    'role': 'student',
    'house': 'Gryffindor',
    'school': 'Hogwarts School of Witchcraft and Wizardry',
    'boggart': 'Lord Voldemort',
    '__v': 0,
    'ministryOfMagic': false,
    'orderOfThePhoenix': false,
    'dumbledoresArmy': false,
    'deathEater': false,
    'bloodStatus': 'pure-blood',
    'species': 'human'
  },
  {
    '_id': '5a0fa67dae5bc100213c2333',
    'name': 'Cuthbert Binns',
    'role': 'Professor, History of Magic',
    'house': 'Gryffindor',
    'school': 'Hogwarts School of Witchcraft and Wizardry',
    '__v': 0,
    'ministryOfMagic': false,
    'orderOfThePhoenix': false,
    'dumbledoresArmy': false,
    'deathEater': false,
    'bloodStatus': 'unknown',
    'species': 'ghost'
  }, 
  {
    '_id': '5a0fa772ae5bc100213c2337',
    'name': 'Regulus Arcturus Black',
    'house': 'Slytherin',
    'school': 'Hogwarts School of Witchcraft and Wizardry',
    '__v': 0,
    'ministryOfMagic': false,
    'orderOfThePhoenix': false,
    'dumbledoresArmy': false,
    'deathEater': true,
    'bloodStatus': 'pure-blood',
    'species': 'human'
  }],
  exampleFilteredData: [
    {
      '_id': '5a0fa4daae5bc100213c232e',
      'name': 'Hannah Abbott',
      'role': 'student',
      'house': 'Hufflepuff',
      'school': 'Hogwarts School of Witchcraft and Wizardry',
      '__v': 0,
      'ministryOfMagic': false,
      'orderOfThePhoenix': false,
      'dumbledoresArmy': true,
      'deathEater': false,
      'bloodStatus': 'half-blood',
      'species': 'human'
    },
    {
      '_id': '5a0fa54aae5bc100213c232f',
      'name': 'Bathsheda Babbling',
      'role': 'Professor, Ancient Runes',
      'school': 'Hogwarts School of Witchcraft and Wizardry',
      '__v': 0,
      'ministryOfMagic': false,
      'orderOfThePhoenix': false,
      'dumbledoresArmy': true,
      'deathEater': false,
      'bloodStatus': 'unknown',
      'species': 'human'
    }
  ],
  expectedDeathEater: [
    {
      '_id': '5a0fa772ae5bc100213c2337',      
      'name': 'Regulus Arcturus Black',
      'house': 'Slytherin',
      'school': 'Hogwarts School of Witchcraft and Wizardry',
      '__v': 0,
      'ministryOfMagic': false,
      'orderOfThePhoenix': false,
      'dumbledoresArmy': false,
      'deathEater': true,
      'bloodStatus': 'pure-blood',
      'species': 'human'
    }
  ],
  expectedMuggle: [
    {
      '_id': '5a0fa4daae5bc100213c232e',
      'name': 'Hannah Abbott',
      'role': 'student',
      'house': 'Hufflepuff',
      'school': 'Hogwarts School of Witchcraft and Wizardry',
      '__v': 0,
      'ministryOfMagic': false,
      'orderOfThePhoenix': false,
      'dumbledoresArmy': true,
      'deathEater': false,
      'bloodStatus': 'half-blood',
      'species': 'human'
    }
  ],
  expectedWizardBorn: [
    {
      '_id': '5a0fa648ae5bc100213c2332',
      'name': 'Katie Bell',
      'role': 'student',
      'house': 'Gryffindor',
      'school': 'Hogwarts School of Witchcraft and Wizardry',
      'boggart': 'Lord Voldemort',
      '__v': 0,
      'ministryOfMagic': false,
      'orderOfThePhoenix': false,
      'dumbledoresArmy': false,
      'deathEater': false,
      'bloodStatus': 'pure-blood',
      'species': 'human'
    },
    {
      '_id': '5a0fa772ae5bc100213c2337',
      'name': 'Regulus Arcturus Black',
      'house': 'Slytherin',
      'school': 'Hogwarts School of Witchcraft and Wizardry',
      '__v': 0,
      'ministryOfMagic': false,
      'orderOfThePhoenix': false,
      'dumbledoresArmy': false,
      'deathEater': true,
      'bloodStatus': 'pure-blood',
      'species': 'human'
    }
  ],
  expectedBureaucrats: [
    {
      '_id': '5a0fa5deae5bc100213c2330',
      'name': 'Ludo Bagman',
      'role': 'Head, Department of Magical Games and Sports',
      '__v': 0,
      'ministryOfMagic': true,
      'orderOfThePhoenix': false,
      'dumbledoresArmy': false,
      'deathEater': false,
      'bloodStatus': 'unknown',
      'species': 'human'
    }
  ]
}
