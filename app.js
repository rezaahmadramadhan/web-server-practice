const express = require('express')
const errorHandler = require('./middlewares/errorhandler')
const app = express()

app.set('view engine', 'ejs')
    
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use('/', require("./routers"))

app.use(errorHandler)

module.exports = app