const express = require('express');
const staticSuperHeroes = require('./static.js');

const router = express.Router();

router.get('/', (req, res) => {
  res.json({ ali: 'ali' });
});

router.get('/static', (req, res) => {
  res.json(staticSuperHeroes);
});

module.exports = router;
