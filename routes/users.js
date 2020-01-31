const express= require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')
require('dotenv').config()



//middleware
const User = require('../model/user')



router.post('/auth',async (req,res)=>{
    const user = await User.authorize(req.body)
    const token = jwt.sign({_id:User._id}, process.env.SECRET)
    res.header('auth-token',token).send(token)
        if(user){

            let userResult = {token: token,
                user:{
                    
                     email: user.email,
                     name: user.name,
                     role: user.role,
                       adress: {
                                street:user.adress.street,
                               city: user.adress.city,
                               zip:user.adress.zip
                                }
                   }
               }
               console.log(userResult)
            res.status(200).json(userResult)
        }
        else{
             res.status(400).json({
              message :"Email or password didnt match"
             })
            }
})

router.post('/register',async (req,res)=>{
    const user = await User.create(req.body);
    console.log(user)
    if(user){
        res.json({
            message :"User is Registered"
        })
    }else{
        res.status(400).json({
            message :"User all ready exists"
        })
    }
})

module.exports = router