const express= require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')




//middleware
const User = require('../model/user')



router.post('/auth',async (req,res)=>{
    const user = await User.authorize(req.body)
            if(user){

            res.status(200).json(user)
            console.log(user)
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
        res.status(200).json({
            message :"User is Registered"
        })
    }else{
        res.status(400).json({
            message :"User all ready exists"
        })
    }
})

module.exports = router