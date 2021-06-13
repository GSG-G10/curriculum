const express = require("express");
const staticSuperHeroes = require("./static");
const dynamicSuperHeroes = require("./dynamic");

const router = express.Router();

router.get("/", (req, res) => {
  res.json({ ali: "ali" });
});

router.get("/static", (req, res) => {
  res.json(staticSuperHeroes);
});

router.get("/dynamic", (req, res) => {
  dynamicSuperHeroes
    .getData()
    .then(result => {
      res.json(result.rows);
    })
    .catch(err => console.log(err));
});

module.exports = router;
