const dataStore= require('nedb-promise')
const orderDb = new dataStore({filename:'./dataBase/orderList.db', autoload: true})

module.exports = {
  async create(){
      return await orderDb.insert({
        
            title: req.params.title,
            price:req.params.price,
            shortDesc: req.params.shortDesc,
            longDesc: req.params.longDesc,
            imgFile: req.filename
 
      })
  }
}