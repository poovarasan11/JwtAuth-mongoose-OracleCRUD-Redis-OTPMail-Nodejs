const express = require("express");
const router = express.Router();
const AuthController = require("../controllers/auth-controllers");
const CrudController = require("../controllers/crud-controller")
const helperToken = require("../helpers/jwt-helpaer");


router.post("/register", AuthController.register);

router.post("/login", AuthController.login);

router.post("/refresh-token", AuthController.refreshToken);

router.delete("/logout", AuthController.logout);

router.post("/MailOtp", helperToken.verifyAccessToken, AuthController.MailOtp)


module.exports = router;
