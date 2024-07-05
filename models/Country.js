const {DataTypes} = require('sequelize')
const sequelize = require('../sequelize-sqlite/config')

const Country = sequelize.define(
  'Country',
  {
    country_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    alt_name: {
      type: DataTypes.STRING,
    },
    country_code_two: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    country_code_three: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    flag_app: {
      type: DataTypes.STRING,
    },
    mobile_code: {
      type: DataTypes.INTEGER,
    },
    continent_id: {
      type: DataTypes.INTEGER,
    },
    country_flag: {
      type: DataTypes.STRING,
    },
  },
  {
    tableName: 'countries',
    timestamps: false,
  },
)

module.exports = Country
