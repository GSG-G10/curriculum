const dbConnection = require("../config/connection");

const getData = () => {
  return dbConnection.query(`SELECT * FROM users;`);
};

module.exports = {
  getData
};
