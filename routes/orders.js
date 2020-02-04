const express = require('express')
const router = express.Router()
const auth = require('./verifytoken')
const Order = require('../model/order')
const User = require('../routes/users')

router.get('/', auth.auth,async(req,res)=>{
if(req.user.role ==="admin"){
    const order= await Order.all({})
    res.status(200).json(order)

     }else{
    if(req.user.role ==="customer"){
      const order = await Order.getOrder(req.user.userId)
      res.status(200).json(order)
    }else{
    res.status(404).json({message:"Could not load orders!"})
    }
   }
 })

router.post('/', auth.auth,async(req,res)=>{
    const order = await Order.create(req.body,req.user.userId)
    if(order){
        res.status(200).json(order)
    }else{
        res.status(400).json({message:"Order is not created"})
    }
    
})






module.exports = router