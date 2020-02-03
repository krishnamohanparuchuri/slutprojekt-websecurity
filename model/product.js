const dataStore= require('nedb-promise')
const productDb = new dataStore({filename:'./dataBase/productList.db', autoload: true})
const userDb = new dataStore({filename:'./dataBase/userList.db', autoload: true})

module.exports = {

    // Insert product into database
    // with post /api/products to admin
    // Return the created resource
    async create(body){
   
        return await productDb.insert({
             serial : body.serial,
            title: body.title,
            price: body.price,
            shortDesc: body.shortDesc,
            longDesc: body.longDesc,
            imgFile: body.imgFile
  
            })
        
    },

    // Find the product with the corresponding ID
    // with get /api/products/:id
    // Return the resource
    async get(productId){
        return await productDb.findOne({_id:productId})
    },

    // Find all products get /api/products
    // Return the resources
    async all(){
        return await productDb.find({})
    },

    // Try to remove the product with corresponding ID
    // with delete /api/products/:id
    // Returns if any documents were removed
    async remove(productId){
        const productDeleted = await productDb.remove({_id:productId})
        return productDeleted > 0
    },

    // Try to update the document with corresponding ID
    // Returns if any documents were updated
    async update(productId, body){

       
        
         let productUpdated = await productDb.findOne({_id:productId})
        productUpdated = await productDb.update(
            productUpdated,
            {$set:{body}}
        ) 
        return productUpdated > 0
    }
}