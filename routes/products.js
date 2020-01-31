const express = require('express')
const router = express.Router()

const Product= require('../model/product')


router.get('/',async(req,res)=>{
    const products = await Product.all()
    res.json(products)
})

router.post('/',async(req,res)=>{
    const product = await Product.create(req.body)
    if(product){
        res.status(201).json(product)
    }else{
    res.status(404).json({message: 'Error message Product is not created'})
    }
})

router.get('/:productId',async(req,res)=>{
    const product = await Product.get(req.params.id)
    if(product){
        res.json(product)
    }else{
     res.status(404).json({
         message: 'Product not found'
     })
    }
    
})

router.patch('/:productId',async(req,res)=>{
    res.send('Product has been changed')
})

router.delete('/:productId',async(req,res)=>{
    const product = await Product.remove(req.params.id)
    if(product){
        res.status(200).json({ message:"Product is deleted"})
    }else{
        res.status(404).json({message:'Product not found with Specific _id'})

    }
})

module.exports = router