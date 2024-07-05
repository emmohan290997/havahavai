const {DataTypes} = require('sequelize')
const sequelize = require('../sequelize-sqlite/config')

const City = sequelize.define(
  'City',
  {
    city_id: {
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
    country_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'countries',
        key: 'id',
      },
    },
    is_active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    column6: {
      type: DataTypes.STRING,
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    lat: {
      type: DataTypes.FLOAT,
    },
    long: {
      type: DataTypes.FLOAT,
    },
  },
  {
    tableName: 'cities',
    timestamps: false,
  },
)

module.exports = City
