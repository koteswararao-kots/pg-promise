const pgp = require('pg-promise')({});
const db = pgp('postgresql://user_1:test123@localhost:5432/products');
module.exports = db; 