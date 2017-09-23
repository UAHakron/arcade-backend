const express = require('express');
const router = express.Router();
const User = require('../models/User')
const Transaction = require('../models/Transaction')
const Reader = require('../models/Reader')
const Tag = require('../models/Tag')
const Person = require('../models/Person')

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

router.put('/bits', function(req, res) {
    console.log('POST bits');
    console.log(req.query.num);
    console.log(req.query.nfc);	
    Reader.findOne( {'num': req.query.num }, function(err, reader) {
	if (err) {
		res.status(500).send(err);
		return;
	}

	if (!reader) {
		res.status(404).send('not found');
		return;
	}
	console.log(reader)
        Tag.findOne( {'nfc': req.query.nfc }, function(err, tag) {
	    if (err) {
		res.status(500).send(err);
		return;
	    }
	    if (!tag) {
		res.status(404).send('not found');
		return;
	    }
	    console.log(tag);
            Person.findOne( {'_id': tag.person}, function(err, person) {
		if (err) {
		    res.status(500).send(err);
		    return;
		}
		if (!person) {
		    res.status(404).send('not found');
		}
		console.log(person);
                person.bits += (reader.value - 0 ) || 0;
                person.save(function(err, person) {
			if (err) {
				res.status(500).send(err);
				return;
			}
                    res.json(person);
                });
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

router.get('/people', function(req, res) {
    console.log('GET /people');
    Person.find().then(function(people, err){
    res.json(people);
    });
});

router.get('/people/bits', function(req, res) {
    console.log('GET /people/bits');

    Person.find({}, 'name bits').sort([['bits','descending']]).then(function(people, err){
        if (err) { 
            res.sendStatus(500);
            return console.error(err);
        }
        res.json(people);
    });
});

router.put('/people/:email/bits', function(req, res) {
	console.log('PUT people email bits');
	Person.find( { "email": req.params.email }, function(err, person) {
	if (err) {
		res.status(500).send(err);
		return;
	}
	if (!person) {
		res.status(404).send('not found');
		return;
	}
	
	if (req.body.bits < 0 && person.bits < Math.abs(req.body.bits)) {
		res.status(405).send('Not enough bits');
		return;
	}

        person.bits += (req.body.bits - 0 ) || 0;
	
	person.save(function(err, person) {
	if (err) {
		res.status(500).send(err);
		return;
	}
	res.json(person);
		});
	});
});

router.get('/people/:email', function(req, res) {
    console.log('GET /people/:email');

    Person.findOne({ 'email': req.params.email }, function(err, person) {
        if (err) {
            res.status(500).send(err);
            return;
        }
        if (!person) {
            res.status(404).send('not found');
            return;
        }
        res.json(person);
    })
})

router.post('/people', function(req, res) {

    console.log('POST /people');
    var person = new Person(req.body);

    person.save(function(err, person) {
        if (err) {
            res.status(500).send(err);
            return;
        }
        res.json(person);
    });

});

router.delete('/people/:email', function(req, res) {
    console.log('DELETE /users/:email');
   Person.remove({ 'email': req.params.email }, function(err) {
        if (err) {
            res.status(500).send(err);
            return;
        }
        res.sendStatus(200);
    });
});

router.post('/tags', function(req, res) {

    console.log('POST /tags');
    var tag = new Tag(req.body);

    tag.save(function(err, tag) {
        if (err) {
            res.status(500).send(err);
            return;
        }
        res.json(tag);
    });

});

router.get('/tags', function(req, res) {
    console.log('GET /tags');
    Tag.find().then(function(tags, err){
    res.json(tags);
    });
});

router.post('/tags/:nfc/person', function(req, res) {
    console.log('POST /tags/:nfc/person');
    console.log(req.params.nfc);
    Tag.findOne({ 'nfc': req.params.nfc }, function(err, tag) {
	console.log("TAG");
	console.log(tag);
        if (err) {
	    console.log(err);
            res.status(500).send(err);
            return;
        }
        if (!tag) {
	    console.log("Tag not found");
            res.status(404).send('not found');
            return;
        }
	console.log("Setting tag");
	console.log(req.body.person);
        tag.person = req.body.person;
        tag.save(function(err, tag) {
            if (err) {
		console.log(err);
                res.status(500).send(err);
                return;
            }
            res.json(tag);
        });
    });
});



module.exports = router;
