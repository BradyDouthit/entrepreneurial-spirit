let express = require("express");
let mongoose = require("mongoose");
let MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/EntrepreneurialSpirit";
let router = express.Router();
let axios = require('axios');
let schedule = require('node-schedule');

// Our scraping tools
// Axios is a promised-based http library, similar to jQuery's Ajax method
// It works on the client and on the server

//let axios = require("axios");
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
mongoose.connect(MONGODB_URI, { useNewUrlParser: true });

//every hour, get stocks data from api and save to db 
let checkForStockUpdates = schedule.scheduleJob('30 * * * *', function () {
    axios.get(
        `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=MSFT&apikey=${process.env.REACT_APP_ALPHA_VANTAGE_API_KEY}`)
        .then(res => {
            let symbol = res.data['Meta Data']['2. Symbol'];
            let updatedInfo = {
                'symbol': symbol,
                'data': JSON.stringify(res.data['Time Series (Daily)']),
                'hasBeenModified': true
            }
            //update the db with new stock data
            return stocks.findOneAndUpdate(symbol, { $set: updatedInfo }, { useFindAndModify: false, new: true})
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