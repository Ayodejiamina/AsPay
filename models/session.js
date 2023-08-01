const seq = require('../database/connect')
const {DataTypes} = require('sequelize');
const mySession =seq.define("my_session", {
    sid: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    userId: DataTypes.STRING,
    expires: DataTypes.DATE,
    data: DataTypes.TEXT,
  });

  module.exports =mySession; 