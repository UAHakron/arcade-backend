const express = require('express');
const router = express.Router();
const User = require('../models/User')
const Transaction = require('../models/Transaction')
const Reader = require('../models/Reader')

router.get('/users', function(req, res) {
    console.log('GET /users');
    User.find().then(function(users, err){
        // if (err.length > 0) { 
        //     console.log(err);
        //     res.status(500).send(err);
        //     return;
        // }
    res.json(users);
    });
});

router.get('/users/bits', function(req, res) {
    console.log('GET /users/bits');

    User.find({}, 'name bits').sort([['bits','descending']]).then(function(users, err){
        if (err) { 
            res.sendStatus(500);
            return console.error(err);
        }
        res.json(users);
    });
});

router.get('/users/:nfc', function(req, res) {
    console.log('GET /users/:nfc');
    User.findOne({ 'nfc': req.params.nfc }, function(user, err) {
        if (err) {
            res.status(500).send(err);
            return;
        }
        res.json(user);
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
    User.findOne({ 'nfc': req.body.nfc }, function(user, err) {
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

router.delete('/users/:nfc', function(req, res) {
    console.log('DELETE /users/:nfc');
    User.remove({ 'nfc': req.params.nfc }, function(err) {
        if (err) {
            res.status(500).send(err);
            return;
        }
        res.sendStatus(200);
    });
});

router.put('/users/:nfc/bits', function(req, res) {
    console.log('PUT /users/:nfc/bits');
    
    //Get user, update their total
    User.findOne({ 'nfc': req.params.nfc }, function(err, user) {
        if (err) {
            res.status(500).send(err);
            return;
        }
        if(!user)
        {
            res.status(404).send('not found');
            return;
        }

    //Get reader based on num
    
        Reader.findOne( {'num': req.query.num}, function(err, reader) {
            //Update user and save
            user.bits += (reader.value - 0 ) || 0;
            user.save()

            //Create a transaction and save
            var transaction = new Transaction({
                nfc: req.params.nfc,
                bits: (reader.value - 0),
                reader: reader.num,
                location: reader.location
            });

            transaction.save(function(err, transaction) {
                if (err) {
                    res.status(500).send(err);
                    return;
                }
                res.json(transaction);
            });
        });
    });
});

router.post('/readers', function(req, res) {
    console.log('POST /readers');
    var reader = new Reader(req.body);

    reader.save(function(err, user) {
        if (err) {
            res.status(500).send(err);
            return;
        }
        res.json(user);
    });
    
});

router.put('/readers/:num', function(req, res) {
    console.log('POST /readers/:num/location');
    Reader.findOne({ 'num': req.params.num }, function(err, reader) {
        if (err) {
            res.status(500).send(err);
            return;
        }
        if (!reader) {
            res.status(404).send('not found');
            return;
        }
        reader.location = req.body.location;
        reader.value = req.body.value;
        reader.cooldown = req.body.cooldown;
        reader.save(function(err, reader) {
            res.json(reader);
        });
    });
});

router.delete('/readers/:num', function(req, res) {
    console.log('DELETE /readres/:num');
    Reader.remove({ 'num': req.params.num }, function(err) {
        if (err) {
            res.status(500).send(err);
            return;
        }
        res.sendStatus(200);
    });
});


module.exports = router;
