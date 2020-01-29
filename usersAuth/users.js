const express= require('express')
const router = express.Router()

const User = require('../model/user')

router.post('/auth',async (req,res)=>{
    console.log(req.body)
   res.send('jkwhoög')
})

router.post('/register',async (req,res)=>{
    const user = await User.create(req.body)
    console.log(user)
     res.send('new registered user')
})

module.exports = router