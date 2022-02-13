const mongoose = require('mongoose');


const currencySchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    vs: {
        type: [String],
        required: true
    },
    sell: {
        type: Number,
    },
    buy: {
        type: Number
    }
})
module.exports = mongoose.model('Currency', currencySchema);