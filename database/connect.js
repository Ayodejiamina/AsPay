const Sequelize = require('sequelize')
const connect = new Sequelize("a'spay","root","",{
    host:"localhost",
    dialect:"mysql"
})
module.exports = connect