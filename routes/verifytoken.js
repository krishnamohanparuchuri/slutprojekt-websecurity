const jwt = require('jsonwebtoken')
require('dotenv').config()

function auth(req,res,next){

   const token = req.headers.authorization

   const sliceToken = token.split(" ",1)

   if(!token){
    return false
      }
   try{
      const verified = jwt.verify(sliceToken[1],process.env.SECRET)
      req.user = verified
      next()
      }
      catch(err){
    return false
    }
}

module.exports = auth