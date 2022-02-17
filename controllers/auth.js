require("dotenv").config();
const jwt = require("jsonwebtoken");
const User = require("../models/user");

exports.verifyToken = (req, res, next) => {
  if (
    req.headers &&
    req.headers.authorization &&
    req.headers.authorization.split(" ")[0] === "JWT"
  ) {
    jwt.verify(
      req.headers.authorization.split(" ")[1],
      process.env.USER_TOKEN_SECRET,
      function (err, decode) {
        if (err) {
          req.user = undefined;
          res.status(403).send("invalid token");
        }
        User.findOne({
          _id: decode.id,
        })
          .then((u) => {
            if (u) {
              req.user = u;
              next();
            } else {
              res.status(403).send("invalid token");
            }
          })
          .catch((err) => {
            res.status(500).send("err");
          });
      }
    );
  } else {
    req.user = undefined;
    res.status(403).send("u are not auth !");
  }
};
