
var Userdb = require('../model/model');

// create and save new user
exports.create = (req,res)=>{
    //validate request
    if(!req.body)
    {
        res.status(400).send({message : "Content can not be empty!"});
        return;
    }
    // new user
    var user = new User({
        name: req.body.name,
        email: req.body.email,
        gender: req.body.gender,
        status: req.body.status,
    })

    //save user in db
    user.save().then(data =>{
            res.send(data);
        }).catch(err =>{
            res.status(500).send({
                message: err.message || "some error occured while creating a create operation"
            });
        });
        
}

// retrieve and return users
exports.find = (req,res) =>{
    Userdb.find()
    .then(user => {
        res.send(user)
    })
    .catch(err=> {
        res.status(500).send({message: err.message || "Error Occurred while retriving user information"})
    })
}

// update a user by user id
exports.update = (req,res) =>{
    
}

//delete a user with specified user id in request
exports.delete = (req,res) =>{
    
}