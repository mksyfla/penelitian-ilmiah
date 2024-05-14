const { Pool } = require('pg');

const pg = new Pool();

module.exports = pg;
