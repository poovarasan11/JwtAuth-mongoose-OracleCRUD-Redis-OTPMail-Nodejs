const express = require("express");
const router = express.Router();

const oracleController = require("../controllers/oracle-CRUD-controller");
const helperToken = require("../helpers/jwt-helpaer");

// router.get("/sample", helperToken.verifyAccessToken, oracleController.sampleget);
// router.post("/create", helperToken.verifyAccessToken, oracleController.create);


router.post("/create",helperToken.verifyAccessToken, oracleController.create);

router.get("/find",helperToken.verifyAccessToken, oracleController.find);

router.get("/findById",helperToken.verifyAccessToken, oracleController.findById);
router.put("/update",helperToken.verifyAccessToken, oracleController.update);

router.delete("/delete",helperToken.verifyAccessToken, oracleController.delete);

module.exports = router;
