const dataStore= require('nedb-promise')
const orderDb = new dataStore({filename:'./dataBase/orderList.db', autoload: true})

module.exports = {
  async create(body,){
      return await orderDb.insert({
      
          timeStamp: Date.now(), // add server side
          status: 'inProcess', // done
          items: body.items,
          orderValue: body.orderValue
 
      })
  },
  async all(){
    return await orderDb.find({})
},

async getorderid(orderId){
  return await orderDb.findOne({_id:orderId})
}



}