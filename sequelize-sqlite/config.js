const {Sequelize} = require('sequelize')

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './google-sheets-to-sqlite/database.db',
})

module.exports = sequelize
