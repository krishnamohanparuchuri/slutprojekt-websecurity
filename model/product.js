const dataStore= require('nedb-promise')
const productDb = new dataStore({filename:'./dataBase/productList.db', autoload: true})

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
    async get(productID){
        return await productDb.findOne({_id:productID})
    },

    // Find all products get /api/products
    // Return the resources
    async all(){
        return await productDb.find({})
    },

    // Try to remove the product with corresponding ID
    // with delete /api/products/:id
    // Returns if any documents were removed
    async remove(productID){
        const numDeleted = await productDb.remove({_id:productID})
        return numDeleted > 0
    },

    // Try to update the document with corresponding ID
    // Returns if any documents were updated
    async update(productID, body){        
        const numUpdated = await productDb.update(
            {_id:productID},
            {$set:{
                    content: body.content || product.content
            }}
        )
        return numUpdated > 0
    }
}