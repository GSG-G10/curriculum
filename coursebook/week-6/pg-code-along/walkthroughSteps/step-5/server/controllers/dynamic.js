const dbConnection = require("../database/connection");

const getData = () => {
  return dbConnection.query(`SELECT * FROM superheroes;`);
};

module.exports = {
  getData
};
