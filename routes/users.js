const express = require("express");
const router = express.Router();
const userController = require("../controllers/user");
const isAuth = require('../controllers/auth');
router.post("/signup", isAuth.verifyToken, userController.createUser);
router.post("/signin", userController.signIn);
module.exports = router;
