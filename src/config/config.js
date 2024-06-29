const dotenv = require('dotenv');

dotenv.config();

/* 
HAY QUE CREAR LAS RESPECTIVAS BDD
  * tripleW_development
  * tripleW_test
  * tripleW_production
*/

module.exports = {
  "development": {
    "username": process.env.DB_USER,
    "password": process.env.DB_PASSWORD,
    "database":  `${process.env.DB_DATABASE}_development`,
    "host": process.env.DB_HOST,
    "dialect": "postgres"
  },
  "test": {
    "username": process.env.DB_USER,
    "password": process.env.DB_PASSWORD,
    "database": `${process.env.DB_DATABASE}_test`,
    "host": process.env.DB_HOST,
    "dialect": "postgres"
  },
  "production": {
    "username": process.env.DB_USER,
    "password": process.env.DB_PASSWORD,
    "database": `${process.env.DB_DATABASE}_production`,
    "host": process.env.DB_HOST,
    "dialect": "postgres"
  }
}
