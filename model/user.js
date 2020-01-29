const dataStore= require('nedb-promise')
const userDb = new dataStore({filename:'./dataBase/userList.db', autoload: true})

module.exports = {
  async create(body){
      return await userDb.insert({
        
            email: body.email,
            password: body.password,
            name: body.name,
            role: body.role, // or customer
        
            adress: {
                street: body.adress.street,
                zip:body.adress.zip,
                city: body.adress.city
            }
      })
  },
  
  async authorize(userID){
      return await userDb.findone({
          _id:userID
      })
  }

}