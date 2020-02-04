const dataStore= require('nedb-promise')
const User = require('../model/user')
const orderDb = new dataStore({filename:'./dataBase/orderList.db', autoload: true})

module.exports = {
  async create(body,userId){
      const newOrder = {
        owner:userId,
        timeStamp: Date.now(), // add server side
        status: 'inProcess', // done
        items: body.items,
        orderValue: body.payment.total

    }
      
    const updateOrder =  await orderDb.insert(newOrder)

      await User.userPayment(userId,body.payment)
      await User.addOrderInfo(userId,updateOrder._id)
      return updateOrder
  },
  async all(){
    return await orderDb.find({})
},

async getOrder(userId){
  return await orderDb.find({owner:userId})
}



}