const { create } = require("../model/UserModel");
const nodemailer = require("nodemailer")
require("dotenv").config();

const createError = require("http-errors");
const User = require("../model/UserModel");
const { authSchema } = require("../helpers/validationSchema");
//const uuid = require("uuid");  // uuid is random string id janarator use npm pakageg..
const {
  signAccessToken,
  signRefreshToken,
  verifyRefreshToken,
} = require("../helpers/jwt-helpaer");

const client = require("../helpers/init-redis");

const MailOtp = require("../helpers/mail-otp")

module.exports = {
  register: async (req, res, next) => {
    try {
      const result = await authSchema.validateAsync(req.body);

      const doesExist = await User.findOne({ email: result.email });
      console.log(doesExist);
      if (doesExist)
        throw createError.Conflict(`${result.email} is already been registerd`);

      const user = new User(result);
      const savedUser = await user.save();
      const accessToken = await signAccessToken(user.id);
      const refreshToken = await signRefreshToken(user.id);

      res.send("User Register Sucessfuly..");
    } catch (error) {
      console.log("register function error", error);
      next(error);
    }
  },

  login: async (req, res, next) => {
    try {
      const result = await authSchema.validateAsync(req.body);
      const user = await User.findOne({ email: result.email });

      if (!user) throw createError.NotFound("User not registered");

      const isMatch = await user.isValidPassword(result.password);
      if (!isMatch)
        throw createError.Unauthorized("Username/password not valid");

      const accessToken = await signAccessToken(user.id);
      const refreshToken = await signRefreshToken(user.id);
      // console.log("uuid.v3()", uuid.v3.DNS);

      // user.isLoggedIn = true;
      // console.log("isLoggedIn data cheking..");
      // console.log("isLogged data ", isLoggedIn);
      // console.log("user data", user);

      // res.cookie({
      //   "accessToken ": accessToken,
      //   "refreshToken ": refreshToken,
      // });

      res.cookie("accessToken ", accessToken);
      res.cookie("refreshToken ", refreshToken);
      res.send("Login Sucessfuly Wellcome to my page..");



      // res.send({ accessToken, refreshToken });
    } catch (error) {
      if (error.isJoi === true)
        return next(createError.Unauthorized("Invalid Username/Password"));
      next(error);
    }
  },

  refreshToken: async (req, res, next) => {
    try {
      const { refreshToken } = req.body;

      if (!refreshToken) throw createError.BadRequest();
      const user = await verifyRefreshToken(refreshToken);

      const accessToken = await signAccessToken(user);
      const refToken = await signRefreshToken(user);
      res.send({ accessToken: accessToken, refreshToken: refToken });
    } catch (error) {
      next(error);
    }
  },

  MailOtp: async (req, res, next) => {
    try {
      const sender = await nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.AUTH_MAILID,
          pass: process.env.AUTH_PASSWORD
        }
      })

      const OTP = Math.floor(100000 + Math.random() * 9000);
      console.log("Magil OTP: ", OTP);
      const composemail = {
        from: `poos25451@gmail.com`,
        to: `poovarasan1999skp@gmail.com,gopinath3939@gmail.com,lokeshwariraju11@gmail.com`,
        subject: `sample Node OTP sucessfully `,
        text: `sample Node OTP ${OTP}`

      }
      // return JSON.stringify(json, null, 2);
      sender.sendMail(composemail, function (error, info) {
        if (error) {
          console.log(error);

        } else {
          res.cookie("Generate OTP", OTP);
          res.send("Mail OTP Send Successfuly");
        }
      })
    } catch (error) {

    }
  },

  logout: async (req, res, next) => {
    try {
      const { refreshToken } = req.body;

      console.log("logout token..", req.body);

      if (!refreshToken) throw createError.BadRequest();
      const user = await verifyRefreshToken(refreshToken);
      client.DEL(user, (err, val) => {
        if (err) {
          console.log(err.message);
          throw createError.InternalServerError();
        }
        console.log(val);
      });
      res.sendStatus(204).then();
      if (err) {
        res.send(err);
      } else {
        res.send("logout.");
      }
      console.log("logout..");
      res.send("user logout sucessfuly..... ");
    } catch (error) {
      next(error);
    }
  },
};
