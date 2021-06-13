const express = require('express');
const { Router } = express; //Here we destructure (ES6) the Router value off of express
const router = Router();

const {
  getAll,
  getSingleFacster,
  addFacster,
  getFacsterHobby,
  getFacsterSuperpower
} = require('../controllers');

router.get('/facsters', getAll);

router.get('/facsters/:name', getSingleFacster);

router.post('/facster/new', addFacster);

router.get('/facsters/:name/hobby', getFacsterHobby);

router.get('/facsters/:name/superpower', getFacsterSuperpower);

module.exports = router;
