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



// get a list of IDs from db
router.get('/nfc', function(req, res)
{
	console.log('Get request received');
	res.send([{"name":"Kyle","bits":"9999","rank":"1"},{"name":"Cam","bits":"888","rank":"2"},{"name":"Rodney","bits":"77","rank":"3"},{"name":"Larry","bits":"1","rank":"4"},{"name":"memerson","bits":"1","rank":"5"},{"name":"Larry","bits":"1","rank":"6"},{"name":"Steve","bits":"1","rank":"7"}]);
});

//registration
router.post('/register', function(req, res)
{
	//req contains name, id, email, bits, timestamp (maybe)
	//check to see if id already exisits
	//if not, create a new one
	//if so, write over it
	//send back a json that contains a message that contains 
	
	MongoClient.connect(url, function(err, db){
		if(err) throw err;
		var query = { nfcID: req.params.id};
		console.log(req.params.id);
		db.collection("regusers").find(query).toArray(function(err, result){
			console.log('gets in the query');
			if (err){
				console.log('gets in the if statement');
				RegUser.create(req.body).then(function(regUser){
					res.send(regUser);
				});
			}

			else{
				console.log('gets in the else');
				router.delete('/register/:id', function(req,res){
					console.log('gets in delete');
					RegUser.find({"nfcID": req.params.id}).then(function(regUser){
						res.send(regUser);
					});
				});

				RegUser.create(req.body).then(function(regUser){
					res.send(regUser);
				});
			}
		});
	});	
	console.log(req.body);
	


});


router.post('/bits', function(req, res)
{
	//req contains id, bit change, location, timestamp (maybe)
	//add column to bits table 
	//cooldown?
	//update register table with bit total - query register table for bits and add req bits to that value
	//send json confirmation with bit updated total 
	console.log(req.body);
	res.send({type: 'POST'});
});


//update an ID in the db
router.put('/register/:id', function(req, res)
{
	res.send({type: 'PUT'});
});

// delete an ID form the database
router.delete('/register/:id', function(req, res)
{
	res.send({type: 'DELETE'});
});

module.exports = router;
