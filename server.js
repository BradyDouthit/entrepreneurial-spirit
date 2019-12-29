let express = require("express");
let mongoose = require("mongoose");
let MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/EntrepreneurialSpirit";
let router = express.Router();
let axios = require('axios');
let schedule = require('node-schedule');

// get models
let stocks = require("./models/stocks");
// let comment = require("./models/comment");

let PORT = process.env.PORT || 8080;

// Initialize Express
let app = express();

// Parse request body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Make public a static folder
app.use(express.static("public"));

// Connect to the Mongo DB
mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });

// Template for creating new stocks data as eventually, I will not need to create new stocks.
// I will simply be updating them 
let msftURL = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=MSFT&apikey=${process.env.REACT_APP_ALPHA_VANTAGE_API_KEY}`;

let btcURL = `https://www.alphavantage.co/query?function=DIGITAL_CURRENCY_DAILY&symbol=BTC&market=USD&apikey=${process.env.REACT_APP_ALPHA_VANTAGE_API_KEY}`;

// Stocks template call
// axios.get(msftURL).then(res => {
//     stocks.create(
//         {
//             'symbol': res.data['Meta Data']['2. Symbol'],
//             'data': JSON.stringify(res.data['Time Series (Daily)']),
//             'hasBeenModified': false
//         })
//         .then(function (data) {
//             console.log(data)
//         })
//         .catch(function (err) {
//             console.log('----------ERROR----------')
//             console.log(err)
//         })
// });

// // Cryptocurrency template call
// axios.get(btcURL).then(res => {
//         console.log(res.data)
//     stocks.create(
//         {
//             'symbol': res.data['Meta Data']["2. Digital Currency Code"],
//             'data': JSON.stringify(res.data['Time Series (Digital Currency Daily)']),
//             'hasBeenModified': false
//         })
//         .then(function (data) {
//             console.log(data)
//         })
//         .catch(function (err) {
//             console.log('----------ERROR----------')
//             console.log(err)
//         })
// });

// Every hour, get new stocks data from api and save to db 

let checkForStockUpdates = schedule.scheduleJob('30 * * * *', function () {
    console.log('--------------------UPDATE--------------------')
    axios.get(msftURL)
        .then(res => {
            let symbol = res.data['Meta Data']['2. Symbol'];
            let updatedInfo = {
                data: JSON.stringify(res.data['Time Series (Daily)']),
                hasBeenModified: true
            }
            //update the db with new stock data
            return stocks.findOneAndUpdate({ symbol: symbol }, { $set: { data: updatedInfo.data, hasBeenModified: true } }, { useFindAndModify: false, new: true })
                .then(function (data) {
                    console.log(data)
                })
                .catch(function (err) {
                    console.log('----------ERROR----------')
                    console.log(err)
                });
        });
});

let checkForBTCUpdates = schedule.scheduleJob('31 * * * *', function () {
    console.log('--------------------UPDATE--------------------')
    axios.get(btcURL)
        .then(res => {
            let btcSymbol = res.data['Meta Data']["2. Digital Currency Code"];
            let updatedInfo = {
                data: JSON.stringify(res.data['Time Series (Digital Currency Daily)']),
                hasBeenModified: true
            }
            //update the db with new stock data
            return stocks.findOneAndUpdate({ symbol: btcSymbol }, { $set: { data: updatedInfo.data, hasBeenModified: true } }, { useFindAndModify: false, new: true })
                .then(function (data) {
                    console.log(data)
                })
                .catch(function (err) {
                    console.log('----------ERROR----------')
                    console.log(err)
                });
        });
});
// Start the server
app.listen(PORT, function () {
    console.log('App running on ' + PORT)
});