const {DataTypes} = require('sequelize')
const sequelize = require('../sequelize-sqlite/config.js')

const Airport = sequelize.define(
  'Airport',
  {
    air_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    icao_code: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    iata_code: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    city_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'cities',
        key: 'id',
      },
    },
    country_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'countries',
        key: 'id',
      },
    },
    continent_id: {
      type: DataTypes.INTEGER,
    },
    website_url: {
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
    latitude_deg: {
      type: DataTypes.FLOAT,
    },
    longitude_deg: {
      type: DataTypes.FLOAT,
    },
    elevation_ft: {
      type: DataTypes.INTEGER,
    },
    wikipedia_link: {
      type: DataTypes.STRING,
    },
  },
  {
    tableName: 'airports',
    timestamps: false,
  },
)

module.exports = Airport
