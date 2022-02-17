require("dotenv").config();
const rp = require("request-promise");
const Base = require("../models/base");

exports.updateDataDaily = () => {
  Base.find()
    .then((b) => {
      if (b) {
        b.forEach((e) => {
          rp(`http://data.fixer.io/api/latest?access_key=${process.env.API_KEY}`)
          .then(data =>{
            const d = JSON.parse(data);
            e.vs = d.rates
            e.save();
          })
        });
      }
    })
    .catch((err) => {
      console.log(err);
    });
};
