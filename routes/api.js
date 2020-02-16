const express = require('express');
const router = express.Router();
const Stocks = require('../models/stocks');
const Users = require('../models/user');
const bcrypt = require('bcryptjs');

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
    //prepare to salt the password
    bcrypt.genSalt(10, function (err, salt) {
        //hash the password
        bcrypt.hash(req.body.password, salt, function (err, hash) {
            req.body.password = hash;
            if (err) throw err;
            //save the secured password to db
            Users.create({
                "googleID": req.body.googleID,
                "username": req.body.username,
                "email": req.body.email,
                "firstName": req.body.firstName,
                "lastName": req.body.lastName,
                "password": req.body.password,
                "money": 10000
            }).then(response => {
                res.json(response)
                console.log('----------DB SIGNUP RESPONSE----------')
                console.log(response)
            }).catch(error => {
                res.json(error)
                console.log(error)
            });
        });
    });
});

router.post('/user/google/login', (req, res) => {
    Users.findOne({
        "googleID": req.body.googleID
    }).then(response => {
        console.log('----------DB LOGIN RESPONSE----------')
        console.log(response)
        if (response === null) {
            res.json({ error: 'could not find profile' })
        }
        else {
            res.json(response)
        };
    }).catch(error => {
        console.log(error);
    });
})

module.exports = router;