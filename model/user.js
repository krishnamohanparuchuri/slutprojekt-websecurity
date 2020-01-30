const dataStore= require('nedb-promise')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const userDb = new dataStore({filename:'./dataBase/userList.db', autoload: true})

module.exports = {
  async create(body){

    if(body.password == body.repeatPassword){
        
    const user = await userDb.findOne( {email: body.email})
    if(user){
        return false
    }else{
        const passwordHash = await bcrypt.hash(body.password,10)
        return await userDb.insert({        
            email: body.email,
            password: passwordHash,
            name: body.name,
            role:"customer", // or customer
        
            adress: {
                street: body.adress.street,
                zip:body.adress.zip,
                city: body.adress.city
           }  
         })
        } 
    }else{
        return false

    }
  },
  
  async authorize(body){
      const user = await userDb.findOne({email:body.email})
      if(!user){
          return false
      }else {
          const validPass = await bcrypt.compare(body.password,user.password)
          
          if(validPass){
              
             return {user:{
                        email: user.email,
                        name: user.name,
                        role: user.role,
                        adress: {
                            street:user.adress.street,
                            city: user.adress.city,
                            zip:user.adress.zip
                        }
                    }
                    }
                }
            else{
                return false
            }
        }
          
    }

}