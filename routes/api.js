const express = require('express');
const router = express.Router();
const Stocks = require('../models/stocks');
const Users = require('../models/user');

router.get('/stocks', (req, res) => {
    Stocks.find({})
        .then(data => {
            let dataArr = []

            //map each database entry and format properly
            data.map(entry => {
                let dataToSend = {
                    id: entry._id,
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
});

router.post('/user/google/signup', (req, res) => {
    console.log(req.body)

    Users.create({
        "socialIDs": {
            "googleID": req.body.googleID,
            "facebookID": ''
        },
        "username": req.body.username,
        "email": req.body.email,
        "firstName": req.body.firstName,
        "lastName": req.body.lastName,
        "password": req.body.password
    }).then(response => {
        res.json(response)
        console.log(response)
    }).catch(error => {
        res.json(error)
        console.log(error)
    })
});

router.post('/user/google/login', (req, res) => {
    console.log(req.body)
})

module.exports = router;