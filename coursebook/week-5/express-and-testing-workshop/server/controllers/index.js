// we use writeFileSync here because we want each request to wait until writing the file
// have finished so we prevent another request from writing on the same file at the same time.
// though this is a bad practice, you should always use writeFile (async)
// In an ideal situation, you would use a database, so all of that doesn't matter

const { writeFileSync } = require('fs');
const { join } = require('path');

const { capitaliseName } = require('./helpers');

const getAll = (req, res) => {
  const { facsters } = require('../models/data.json');
  res.json(facsters);
};

const getSingleFacster = (req, res) => {
  const { facsters } = require('../models/data.json');
  const { name } = req.params;

  const singleFacster = facsters.find(facster => facster.firstname === capitaliseName(name));

  res.send(singleFacster);
};

const addFacster = (req, res, next) => {
  const data = require('../models/data.json');
  const { facsters } = data;
  const { firstname, surname, cohort } = req.body;

  // get the Id of the last facster to generate a new Id
  const newId = facsters[facsters.length - 1].id + 1;

  const newFacster = { id: newId, firstname, surname, cohort };

  // add the new facster to the data object
  data.facsters.push(newFacster);

  try {
    writeFileSync(join(__dirname, '..', 'models', 'data.json'), JSON.stringify(data, null, 2) + '\n');
    res.status(201).json(newFacster);
  }
  catch (err) {
    next(err);
  }

};

const getFacsterHobby = (req, res) => {
  const { facsters, hobbies } = require('../models/data.json');
  const { name } = req.params;
  
  const facster = facsters.find(_facster => _facster.firstname === capitaliseName(name));
  const facsterHobbies = hobbies.find(_hobby => _hobby.facster_id === facster.id);
  
  facster.hobby = facsterHobbies.hobby;
  
  res.send(facster);
};

const getFacsterSuperpower = (req, res) => {
  const { facsters, hobbies } = require('../models/data.json');
  const { name } = req.params;
  
  const facster = facsters.find(_facster => _facster.firstname === capitaliseName(name));
  const facsterHobbies = hobbies.find(_hobby => _hobby.facster_id === facster.id);
  
  facster.superpower = facsterHobbies.superpower;
  
  res.send(facster);

}

module.exports = {
  getAll,
  getSingleFacster,
  addFacster,
  getFacsterHobby,
  getFacsterSuperpower
};
