const User = require("../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const user = require("../models/user");
const saltRounds = 10;
exports.createUser = (req, res, next) => {
  const name = req.body.name;
  const password = req.body.password;
  const email = req.body.email;
  const role = req.body.role;
  bcrypt
    .hash(password, saltRounds)
    .then((hash) => {
      const user = new User({
        name: name,
        password: hash,
        email: email,
        role: role,
      });
      return user;
    })
    .then((user) => {
      user.save().then((u) => {
        res.status(200).send(u);
      });
    })
    .catch((err) => {
      console.log(err);
    });
};
exports.signIn = (req, res, next) => {
  const name = req.body.name;
  const password = req.body.password;
  User.findOne({ name: name })
    .then((u) => {
      if (u) {
        bcrypt.compare(password, u.password)
        .then( r=>{
            if (r) {
                //signing token with user id
                const token = jwt.sign(
                  {
                    id: u.id,
                  },
                  process.env.USER_TOKEN_SECRET,
                  {
                    expiresIn: 86400,
                  }
                );
                res.status(200).send({
                  user: u,
                  accessToken: token,
                });
              } else {
                res.status(403).send("wrong password !");
              }
        })
      } else {
        res.status(404).send("user not found !");
      }
    })
    .catch((err) => {
      console.log(err);
    });
};
