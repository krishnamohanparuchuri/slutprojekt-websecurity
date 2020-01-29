const express = require('express')
const router = express.Router()

router.get('/',async(req,res)=>{
    res.send('Order list')
})

router.post('/',async(req,res)=>{
    res.send('New order has Created')
})

router.get('/:productId',async(req,res)=>{
    res.send('Order information')
})

router.patch('/:productId',async(req,res)=>{
    res.send('Order has been changed')
})

router.delete('/:productId',async(req,res)=>{
    res.send('Order has been deleted')
})




module.exports = router