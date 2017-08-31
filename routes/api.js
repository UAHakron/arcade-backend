const express = require('express');
const router = express.Router();
const User = require('../models/User')


router.get('/users', function(req, res) {
    console.log('GET /users');
    User.find().then(function(err, users){
        if (err.length > 0) { 
            console.log(err);
            res.status(500).send(err);
            return;
        }
    res.json(users);
    });
});

router.get('/users/:nfc', function(req, res) {
    console.log('GET /users/:nfc');
    User.findOne({ 'nfc': req.params.nfc }, function(err, user) {
        if (err) {
            res.status(500).send(err);
            return;
        }
        res.json(user);
    });
});

router.get('/users/bits', function(req, res) {
    console.log('GET /users/bits');

    User.find().then(function(err, users){
        if (err) { 
            res.sendStatus(500);
            return console.error(err);
        }
    });
});


router.post('/users', function(req, res) {
    console.log('POST /users');
    var user = new User(req.body);
    user.save(function(err, user) {
        if (err) {
            res.status(500).send(err);
            return;
        }
        res.json(user);
    });
});


router.put('/users', function(req, res) {
    console.log('PUT /users');
    User.findOne({ 'nfc': req.body.nfc }, function(err, user) {
        if (err) {
            res.status(500).send(err);
            return;
        }
        user.name = req.body.name || user.name;
        user.nfc = req.body.nfc || user.nfc;
        user.email = req.body.email || user.email;
        user.bits = req.body.bits || user.bits;

        user.save(function(err, user) {
            if (err) {
                res.status(500).send(err);
                return;
            }
            res.json(user);
        })

    });
});

router.put('/users/:nfc/bits', function(req, res) {
    console.log('PUT /users/:nfc/bits');
    User.findOne({ 'nfc': req.params.nfc }, function(err, user) {
        if (err) {
            res.status(500).send(err);
            return;
        }
        user.bits += req.body.bits || 0;
        user.save(function(err, user) {
            res.json(user);
        });
    });
});

module.exports = router;
