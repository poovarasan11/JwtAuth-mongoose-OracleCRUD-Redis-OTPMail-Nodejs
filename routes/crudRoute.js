const express = require("express");
const router = express.Router();

const CrudController = require("../controllers/crud-controller");
const helperToken = require("../helpers/jwt-helpaer");

// console.log("verifyAccessToken", helperToken);
// console.log("crud controller", CrudController);

router.post("/create", helperToken.verifyAccessToken, CrudController.create);

router.get("/findAll", helperToken.verifyAccessToken, CrudController.find);
router.put("/update", helperToken.verifyAccessToken, CrudController.update);
router.delete("/delete", helperToken.verifyAccessToken, CrudController.deleteOne);

//Equitas  ADD Beneficiary
// router.post("/ADDBeneficiary", helperToken.verifyAccessToken, CrudController.BeneficiaryCreate);



module.exports = router;
