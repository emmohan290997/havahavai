const express = require('express')
const sequelize = require('./sequelize-sqlite/config')
const Airport = require('./models/Airport')
const City = require('./models/City')
const Country = require('./models/Country')

Country.hasMany(City, {foreignKey: 'country_id'})
City.belongsTo(Country, {foreignKey: 'country_id'})

City.hasMany(Airport, {foreignKey: 'city_id'})
Airport.belongsTo(City, {foreignKey: 'city_id'})

const app = express()
const PORT = process.env.PORT || 4123

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})

app.get('/airport/:iata_code', async (req, res) => {
  const iataCode = req.params.iata_code

  try {
    const airport = await Airport.findOne({
      where: {iata_code: iataCode},
      include: [
        {
          model: City,
          include: [Country],
        },
      ],
    })

    if (airport) {
      res.json(airport)
    } else {
      res.send(null)
    }
  } catch (error) {
    console.error('Error fetching airport:', error)
    res.status(500).json({message: 'Internal server error'})
  }
})
