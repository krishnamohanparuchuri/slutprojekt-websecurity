//enabling all the modules
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const nedb = require('nedb')
const dotenv = require('dotenv')


//routes which should handle request
const productsRoutes = require('./routes/products')
const ordersRoutes = require('./routes/orders')


//middleware functions
app.use(express.static('public'))
app.use(bodyParser.urlencoded({extended: true}))
app.use(express.json())
app.use('/api/products',productsRoutes)
app.use('/api/orders',ordersRoutes)


//listening to port or server
app.listen(8080, () => console.log("Server started"))
