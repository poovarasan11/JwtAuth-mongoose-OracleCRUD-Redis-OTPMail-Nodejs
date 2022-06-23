const oracledb = require("oracledb");

const dbConfig = require("../config/dbConfig");

module.exports = {
  create: async (req, res, next) => {
    const connection = await oracledb.getConnection(dbConfig);
    try {
      const a = await connection.execute(
        `INSERT INTO EMPLOYEES VALUES(:id,:firstname,:lastname,:age) `,

        {
          firstname: req.body.FISTNAME,
          lastname: req.body.LASTNAME,
          age: req.body.AGE,
          id: req.body.ID,
          // id: { type: oracledb.NUMBER, dir: oracledb.BIND_OUT },
        },

        {
          autoCommit: true,
        }
      );
      res.send("sucessfuly data create..");
      console.log("check", a.body);
    } catch (error) {
      res
        .status(500)
        .json({ message: error.message || "Some error occurred!" });
    }
  },

  find: async (req, res) => {
    try {
      const connection = await oracledb.getConnection(dbConfig);
      const data = await connection.execute(`SELECT * FROM EMPLOYEES`);
      res.send(data);
    } catch (error) {
      console.log("Error in find all query: ", error);
      res.status(500).send("error while in the database");
    }
  },

  findById: async (req, res) => {
    try {
      const connection = await oracledb.getConnection(dbConfig);
      const data = await connection.execute(`SELECT * FROM EMPLOYEES WHERE ID = :ID`, { ID: req.body.ID });
      res.send(data)
    } catch (error) {
      console.log("Error in findById query: ", error);
      res.status(500).send("error while in the database");
    }
  },

  update: async (req, res) => {

    try {
      const connection = await oracledb.getConnection(dbConfig);
      const data = await connection
        .execute(`UPDATE EMPLOYEES SET FISTNAME = :FISTNAME WHERE ID = :ID`, { ID: req.body.ID, FISTNAME: req.body.FISTNAME }, { autoCommit: true, })
      res.send(data);
    } catch (error) {
      console.log("Error in update query: ", error);
      res.status(500).send("error while in the database");
    }
  },

  delete: async (req, res) => {
    try {
      const connection = await oracledb.getConnection(dbConfig);
      const data = await connection.execute(`DELETE FROM EMPLOYEES WHERE ID = :ID`, { ID: req.body.ID }, { autoCommit: true, });
      res.send(data)
    } catch (error) {
      console.log("Error in update query: ", error);
      res.status(500).send("error while in the database");
      await connection.close();
    }
  },
};
