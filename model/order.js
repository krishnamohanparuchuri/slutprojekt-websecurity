const dataStore= require('nedb-promise')
const User = require('../model/user')
const Product = require('../model/product')
const orderDb = new dataStore({filename:'./dataBase/orderList.db', autoload: true})

module.exports = {
  async create(body,userId){
   
    let itemprice = 0
      for(let items=0; items< body.items.length;items++){
       const itemlist = await Product.get(body.items[items])
        itemprice += parseInt(itemlist.price)
      }
      console.log(itemprice)

    
    /* let productId = orderDb.find({_id:body.items}) */ 

      const newOrder = {
        owner:userId,
        timeStamp: Date.now(), // add server side
        status: 'inProcess', // done
        items: body.items,
        orderValue: itemprice

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