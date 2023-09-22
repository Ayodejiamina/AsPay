const sequelize = require('../database/connect')
const Sequelize = require('sequelize')
const authModel = sequelize.define('auth',{
    id:{
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement:true,
        primaryKey: true 
    },
    name:{
        type: Sequelize.STRING(80),
        allowNull:false,
      },
    email:{
        type: Sequelize.STRING(100),
        unique:true,
        allowNull:false,
  },
  phone:{
    type: Sequelize.STRING,
    unique:true,
    allowNull:false,
  },
   acctNum:{
    type: Sequelize.STRING,
    unique:true,
    allowNull:false,
  },
  password:{
    type: Sequelize.STRING,
    allowNull:false,
  }
})
module.exports = authModel