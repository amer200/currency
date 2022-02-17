const Base = require("../models/base");
const apiConfig = require("./apiConfig");
const rp = require("request-promise");
const base = require("../models/base");

exports.getAll = (req, res, next) => {
  Base.find()
    .then((bs) => {
      res.status(200).send(bs);
    })
    .catch((err) => {
      console.log(err);
    });
};
exports.getBaseByname = (req, res, next) => {
  const name = req.params.name;
  Base.findOne({ name: name })
    .then((b) => {
      res.status(200).send(b);
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.addBase = (req, res, next) => {
  const name = req.body.name;
  rp(`http://data.fixer.io/api/latest?access_key=${process.env.API_KEY}`)
  .then(data =>{
    const d = JSON.parse(data);
    const base = new Base({
        name: name,
        vs: d.rates
    })
    base.save()
    .then(r =>{
        res.status(200).send(r)
    })
    .catch(err =>{
        console.log(err)
    })
  })
};
exports.deleteBase = (req, res, next) => {
  const name = req.body.name;
  Base.findOneAndDelete({ name: name })
    .then((r) => {
      res.status(200).send("delete done");
    })
    .catch((err) => {
      console.log(err);
    });
};
