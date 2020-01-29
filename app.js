//enabling all the modules
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
require('dotenv').config()


//routes which should handle request
const productsRoutes = require('./routes/products')
const ordersRoutes = require('./routes/orders')
const userRoutes = require('./routes/users')


//middleware functions
app.use(express.static('public'))
app.use(bodyParser.urlencoded({extended: true}))
app.use(express.json())
/* app.use('/api/products',productsRoutes)
app.use('/api/orders',ordersRoutes) */
app.use('/api/',userRoutes)

app.listen(8080, () => console.log("Server started"))
