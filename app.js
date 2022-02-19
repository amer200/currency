require("dotenv").config();
var express = require("express");
var path = require("path");
var logger = require("morgan");
var mongoose = require("mongoose");
var app = express();
var cors = require("cors");

var corsOptions = {
  origin: "http://localhost:3000",
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};
app.use(cors(corsOptions));
app.use(logger("dev"));
app.use(express.json());
app.use(
  express.urlencoded({
    extended: false,
  })
);
app.use(express.static(path.join(__dirname, "public")));

const currencyRouter = require("./routes/currency");
const usersRouter = require("./routes/users");
app.use("/currency", currencyRouter);
app.use("/user", usersRouter);

mongoose
  .connect(process.env.DB_URL)
  .then((r) => {
    console.log("connected to DB");
    app.listen(process.env.PORT, () => {
      console.log(`server is on port =${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
