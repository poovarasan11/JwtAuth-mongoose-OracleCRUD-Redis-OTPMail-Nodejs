const jwt = require("jsonwebtoken");
const createError = require("http-errors");
const promise = require("promise");
const { verify } = require("jsonwebtoken");
const { resolve, reject } = require("promise");
const client = require("./init-redis");
const res = require("express/lib/response");
const cli = require("nodemon/lib/cli");

module.exports = {
  signAccessToken: (user) => {
    return new promise((resolve, reject) => {
      const payload = {
        id: user._id,
      };
      const secret = process.env.ACCESS_TOKEN_SECRET;
      const options = {
        expiresIn: "1d",
      };
      jwt.sign(payload, secret, options, (err, token) => {
        if (err) {
          console.log(err.message);
          reject(createError.InternalServerError());
          return;
        }

        resolve(token);
      });
    });
  },

  verifyAccessToken: (req, res, next) => {
    if (!req.headers["authorization"]) return next(createError.Unauthorized());
    const authHeader = req.headers["authorization"];
    const bearerToken = authHeader.split(" ");
    const token = bearerToken[1];
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, payload) => {
      if (err) {
        const message =
          err.name === "jsonWebTokenError" ? "Unauthorized" : err.message;
        return next(createError.Unauthorized(message));
      } else {
        next();
      }
    });
  },

  signRefreshToken: (user) => {
    return new promise((resolve, reject) => {
      const payload = {
        id: user._id,
      };
      const secret = process.env.REFRESH_TOKEN_SECRET;
      const options = {
        expiresIn: "10m",
        audience: user,
      };
      jwt.sign(payload, secret, options, (err, token) => {
        if (err) {
          console.log(err.message);
          reject(createError.InternalServerError());
          return;
        }

        client.SETEX("user", 60, JSON.stringify(token), (err, reply) => {
          if (err) {
            console.log(err.message);
            reject(createError.InternalServerError());
            return;
          }
        });

        resolve(token);
      });
    });
  },

  verifyRefreshToken: (refreshToken) => {
    return new promise((resolve, reject) => {
      jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        (err, payload) => {
          if (err) return reject(createError.Unauthorized());

          const user = payload.aud;

          client.GET(user, (err, result) => {
            if (err) {
              console.log(err.message);
              reject(createError.InternalServerError());
              return;
            }

            if (refreshToken === result) return resolve(user);
            reject(createError.Unauthorized());
          });

          resolve(user);
        }
      );
    });
  },
};
