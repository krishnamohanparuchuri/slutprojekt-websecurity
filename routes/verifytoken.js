const jwt = require('jsonwebtoken')
require('dotenv').config()


module.exports= {
async auth(req,res,next){

   const token = req.headers.authorization

   if(!token){
    res.status(400).json({message:'token is not found'})
      }
   try{
      const verified = await jwt.verify(token.replace("Bearer ",""),process.env.SECRET)
      req.user = verified
      }
      catch(err){
      res.status(400).json({message:'user is not verified'})
    }
    next()
}
}
