const express = require('express')
const router = express.Router()
const Stocks = require('../models/stocks')

router.get('/stocks', (req, res) => {
    Stocks.find({})
    .then(data => {
        let dataArr = []
        data.map(entry => {
            let dataToSend = {
                symbol: entry.symbol,
                data: JSON.parse(entry.data)
            };
            dataArr.push(dataToSend)
        })
        res.json(dataArr)
    })
    .catch(err => {
        console.log(err)
        return res.json(err)
    })
})

module.exports = router;