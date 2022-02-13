const Currency = require("../models/currency")

exports.getAll = (req, res, next) => {
    Currency.find()
        .then(c => {
            res.send(c)
        })
        .catch(err => {
            console.log(err)
        })
}
exports.addCurr = (req, res, next) => {
    const name = req.body.name;
    const vs = req.body.vs;
    const sell = req.body.sell;
    const buy = req.body.buy;

    const newCurr = new Currency({
        name: name,
        vs: vs,
        sell: sell,
        buy: buy
    })
    newCurr.save()
        .then(c => {
            res.send(c)
        })
        .catch(err => {
            console.log(err);
        })
}