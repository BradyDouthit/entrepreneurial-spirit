const mongoose = require('mongoose')
const Schema = mongoose.Schema;
mongoose.promise = Promise;

// Define userSchema
const stocksSchema = new Schema({
    symbol: String,
    data: String
})

const Stocks = mongoose.model('Stocks', stocksSchema)
module.exports = Stocks