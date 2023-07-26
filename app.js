const https = require('https')
const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')
const sequelize = require('./database/connect')
const app = express()
app.use(bodyParser.urlencoded({extended:true}))
app.use(express.static(path.join(__dirname,"public")))
app.set('view engine','ejs')
sequelize.sync().then(result=>{
    app.listen(4000)
    console.log('connected to port 4000')
}).catch(err=>{
    console.log(err)
})

