const express = require('express');
const router = express.Router();
const services = require('../services/render')
var User = require('../model/model');
var controller = require=('../controller/controller');


// @method GET
router.get('/',services.homeRoutes)
// @method GET/add_user
router.get('/add-user', services.add_user)
//  GET/update_user
router.get('/update-user', services.update_user)



// API
router.post('/api/users', (req,res)=>{
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
            //res.send(data);
            res.redirect('/add-user')
        }).catch(err =>{
            res.status(500).send({
                message: err.message || "some error occured while creating a create operation"
            });
        });
    // res.json({message: req.body});
    // res.end();
})

router.get('/api/users', (req,res) =>{
    if(req.query.id){
        const id= req.query.id;
        User.findById(id)
            .then(data => {
                if(!data){
                    res.status(404).send({message:"Not found user with id"+id})
                }else{
                    res.send(data)
                }
            }).catch(err=>{
                res.status(500).send({message:"Error retrieving user with id"+id})
            }

            )
    }else{
    
        User.find()
        .then(user =>{
            res.send(user)
        })
        .catch(err => {
            res.status(500).send({message: err.message || "Error occurred while retrieving information from database"})
        })
    }
});
router.put('/api/users/:id',(req,res)=> {
    if(!req.body)
    {
        return res
            .status(400)
            .send({message:"Data to update cannot be empty"})
    }
    const id = req.params.id;
    User.findByIdAndUpdate(id, req.body,{useFindAndModify:false})
        .then(data =>{
            if(!data){
                res.status(404).send({message :`Cannot update user with id: ${id}. Maybe user not found` })
            }else{
                res.send(data)
            }
        }).catch(err =>{
            res.status(500).send({message:"Error updating user information"})
        })
});

router.delete('/api/users/:id', (res,req) =>{
    const id = req.params.id;
    User.findByIdAndDelete(id, req.body)
        .then(data =>{
            if(!data){
                res.status(404).send({message:`Cannot delete user with id: ${id}`});
            }else{
                res.send({
                    message:"User was deleted successfully!!"
                })
            }
        }).catch(err =>{
            res.status(500).send({
                message:"could not delete user with Id:"+id
            });
        });

        
});

module.exports = router;