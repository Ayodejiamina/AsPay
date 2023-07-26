const Sequelize = require('sequelize')
const connect = new Sequelize("a'spay","root","ayomidemysql",{
    host:"localhost",
    dialect:"mysql"
})
module.exports = connect