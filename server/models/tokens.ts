const db = require('.');
const path = require('path');

async function getTokens() {
  try {
    // console.log('db is: ', await db.sequelize.query('select * from token'));
    const tokens = await db.sequelize.query('select * from token');
    return tokens[0];
  } catch (err) {
    console.error(
      `Error at ${path.basename(__dirname)}/${path.basename(
        __filename,
      )} ${err}`,
    );
  }
}

async function selectUserFieldTokens(queryStr) {
  try {
    const tokens = await db.sequelize.query(
      `select * from token where ${queryStr}`,
    );
    return tokens;
  } catch (err) {
    console.error(
      `Error at ${path.basename(__dirname)}/${path.basename(
        __filename,
      )} ${err}`,
    );
  }
}

module.exports = {
  getTokens,
  selectUserFieldTokens,
};