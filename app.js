const https = require('https')
const express = require('express')
const bodyParser = require('body-parser')
const authRoutes = require('./routes/auth')
const userRoutes = require('./routes/user')
const auths = require('./models/auth')
const path = require('path')
const flash = require('connect-flash')
const session = require('express-session')
const mySession = require('./models/session')
const Sequelize = require('sequelize')
const sequelize = require('./database/connect')
const app = express()
const SequelizeStore = require("connect-session-sequelize")(session.Store);
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, "public")))
app.use(flash())
app.use(session({
    secret: 'AsPay Web Banking',
    resave: false,
    saveUninitialized: false,
    store: new SequelizeStore({
        db: sequelize,
    }),
    cookie: {}
}))
app.use(authRoutes)
app.use(userRoutes)
app.set('view engine', 'ejs')
sequelize.sync().then(result => {
    app.listen(4001)
    console.log('connected to port 4000')
}).catch(err => {
    console.log(err)
})

