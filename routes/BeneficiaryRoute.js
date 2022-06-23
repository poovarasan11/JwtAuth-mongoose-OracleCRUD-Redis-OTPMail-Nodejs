const express = require("express");
const router = express.Router();

// const CrudController = require("../controllers/crud-controller");
const helperToken = require("../helpers/jwt-helpaer");

const BeneficiaryController = require("../controllers/Beneficiary-Controller");

//Equitas  ADD Beneficiary
//router.post("/ADDBeneficiary", helperToken.verifyAccessToken, BeneficiaryController.BeneficiaryCreate);

router.post('/ADDBeneficiary', function (req, res) {
    BeneficiaryController.BeneficiaryCreate
});



module.exports = router;