const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const redis = require("redis");
 const oracledb = require("oracledb");

const createError = require("http-errors");
require("dotenv").config();
require("./helpers/init-mongodb");
require("./helpers/init-oracledb");

const AuthRoute = require("./routes/AuthRoute");
const CrudRoute = require("./routes/crudRoute");
const OracleCrudRoute = require("./routes/oracleCRUD-Route");
// const BeneficiaryRoute = require("./routes/BeneficiaryRoute")
const jwt = require("jsonwebtoken");

const cookieParser = require("cookie-parser");

const { verifyAccessToken } = require("./helpers/jwt-helpaer");
const res = require("express/lib/response");

require("./helpers/init-redis");
const app = express();
//  app.use(oracledb);
app.use(cookieParser());

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/auth", AuthRoute);

app.use("/students", CrudRoute);

app.use("/oracle", OracleCrudRoute);

// console.log("ADDBeneficiary Route");

// app.use("/Beneficiary", BeneficiaryRoute);


app.use(async (req, res, next) => {
  next(createError.NotFound());
});

// app.use(async (err, req, res, next) => {
//   res.status(err.status || 500);
//   res.send({
//     error: {
//       status: err.status || 500,
//       message: err.message,
//     },
//   });
// });

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`servar running on port ${PORT}`);
});
