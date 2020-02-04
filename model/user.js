const dataStore= require('nedb-promise')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
require('dotenv').config()
const userDb = new dataStore({filename:'./dataBase/userList.db', autoload: true})
const Order = require('../model/order')

module.exports = {
  async create(body){

    if(body.password == body.repeatPassword){
        
    const user = await userDb.findOne( {email: body.email})
    if(user){
        return false
    }else{
        const passwordHash = await bcrypt.hash(body.password,10)
        const newUser = {
                
                email: body.email,
                password: passwordHash,
                name: body.name,
                role:"customer", // or customer
            
                adress: {
                    street: body.adress.street,
                    zip:body.adress.zip,
                    city: body.adress.city
               }
        }
        return await userDb.insert(newUser)
        } 
    }else{
        return false

    }
  },
  
  async authorize(body){
      const user = await userDb.findOne({email:body.email})
      if(!user){
          return false
      }
       else{
        const passwordMatch = await bcrypt.compare(body.password, user.password)
        if(passwordMatch){
            const payload = {
                email:user.email,
                role:user.role,
                  userId:user._id
            }
            const token = jwt.sign(payload, process.env.SECRET,{expiresIn:'1 hr'})

            const userAuthorize = {token: token,
                user:{
                    
                     email: user.email,
                     name: user.name,
                     role: user.role,
                       adress: {
                                street:user.adress.street,
                               city: user.adress.city,
                               zip:user.adress.zip
                                },
                    orderHistory: user.orderHistory
                   }
                }
               return userAuthorize
        
        }else{
            return false
        }
       }   
    },

    async userPayment(userId,payment){

        await userDb.update({_id:userId},{$set:{payment:payment}})

    },
    
    async  addOrderInfo(userId,_id){
        await userDb.update({_id:userId},{$push:{orderHistory:_id}})
    }
}