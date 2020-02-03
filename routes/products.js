const express = require('express')
const router = express.Router()

const Product= require('../model/product')
const auth = require('./verifytoken')


router.get('/',async(req,res)=>{
    const products = await Product.all()
    res.json(products)
})

router.post('/',auth.auth,async(req,res)=>{
    if(req.user.role ==="admin"){
    const product = await Product.create(req.body)
        res.status(201).json(product)
    }else{
    res.status(404).json({message: 'Not allowed to created'})
    }
   
})

router.get('/:productId',async(req,res)=>{
    const product = await Product.get(req.params.productId)
    if(product){
        res.json(product)
    }else{
     res.status(404).json({
         message: 'Product not found'
     })
    }
    
})

router.patch('/:productId', auth.auth ,async(req,res)=>{
    if(req.user.role ==="admin"){
    const product = await Product.update(req.params.productId,req.body) 
        res.status(200).json(product)
    }else{
     res.status(404).json({
         message: 'Product is not Updated'
     })
    }
   
})

router.delete('/:productId', auth.auth,async(req,res)=>{
    if(req.user.role ==="admin"){
    const product = await Product.remove(req.params.productId)
        res.status(200).json({ message:"Product is deleted"})
    }else{
        res.status(404).json({message:'you are not able to delete'})
    }
   
})

module.exports = router