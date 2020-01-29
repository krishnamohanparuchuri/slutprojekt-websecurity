const express= require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')



//middleware
const User = require('../model/user')



router.post('/auth',async (req,res)=>{
    //console.log(req.body)

    const user = await User.authorize(req.body)
   console.log(user)
})

router.post('/register',async (req,res)=>{
    const user = await User.create(req.body);
    if(user){
        res.json({
            message :"User is Registered"
        })
    }else{
        res.json({
            message :"User all ready exists"
        })
    }
})

module.exports = router