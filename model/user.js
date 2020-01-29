const dataStore= require('nedb-promise')
const bcrypt = require('bcryptjs')
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
      return await userDb.findOne({
           email: body.email,
           password : body.password,

           name : body.name,
           adress: {
            street: body.adress.street,
            zip:body.adress.zip,
            city: body.adress.city
        }
      })
  }

}