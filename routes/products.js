const express = require('express')
const router = express.Router()


router.get('/',async(req,res)=>{
    res.send('products list')
})

router.post('/',async(req,res)=>{
    res.send('New Product has Created')
})

router.get('/:productId',async(req,res)=>{
    res.send('New Product has Created')
})

router.patch('/:productId',async(req,res)=>{
    res.send('Product has been changed')
})

router.delete('/:productId',async(req,res)=>{
    res.send('Product has been deleted')
})

module.exports = router