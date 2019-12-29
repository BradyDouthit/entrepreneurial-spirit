const express = require('express')
const router = express.Router()
const Stocks = require('../models/stocks')

router.get('/stocks', (req, res) => {
    Stocks.find({})
    .then(data => {
        let dataArr = []

        //map each database entry and format properly
        data.map(entry => {
            let dataToSend = {
                symbol: entry.symbol,
                data: JSON.parse(entry.data)
            };
            //format dates to make it easier on the front end
            dataArr.push(dataToSend)
        })

        //send the data
        res.json(dataArr)
    })
    .catch(err => {
        console.log(err)
        return res.json(err)
    })
})

module.exports = router;