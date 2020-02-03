const express = require('express')
const router = express.Router()
const auth = require('./verifytoken')
const Order = require('../model/order')

router.get('/', auth.auth,async(req,res)=>{
if(req.user.role ==="admin"){
    const order= await Order.all({})
    res.status(200).json(order)

}else{
      const customerOrder = await Order.getorderid(req.params.id)
      res.status(200).json(customerOrder)
}
})

router.post('/', auth.auth,async(req,res)=>{
    const order = await Order.create(req.body)
    if(order){
        res.status(200).json(order)
    }else{
        res.status(400).json({message:"Order is not created"})
    }
    
})






module.exports = router