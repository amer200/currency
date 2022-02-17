var express = require("express");
var router = express.Router();
const currencyController = require("../controllers/currency");
const isAuth = require("../controllers/auth");
router.get("/", currencyController.getAll);
router.get("/:name", currencyController.getBaseByname);
router.post("/", isAuth.verifyToken, currencyController.addBase);
router.delete("/", isAuth.verifyToken, currencyController.deleteBase);

module.exports = router;
