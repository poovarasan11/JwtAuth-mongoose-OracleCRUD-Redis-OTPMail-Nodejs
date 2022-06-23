
const oracledb = require("oracledb");

const dbConfig=require("../config/dbConfig")

let connection;
// var oracledb = require("oracledb");

(async ()=> {
  try {
    // console.log("jd ckdkvcdb");
    connection = await oracledb.getConnection({
      user: dbConfig.user,
      password: dbConfig.password,
      connectString: dbConfig.connectString,
    });
    console.log("Successfully connected to Oracle!");
  } catch (err) {
    console.log("Error: ", err);
  } finally {
    if (connection) {
      try {
        await connection.close();
      } catch (err) {
        console.log("Error when closing the database connection: ", err);
      }
    }
  }
})();

module.exports = connection;