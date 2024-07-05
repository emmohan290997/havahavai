const fs = require('fs')
const {google} = require('googleapis')
const sqlite3 = require('sqlite3').verbose()

// Load Google Sheets API credentials
const credentials = require('./credentials/havahavai.json')

// Configure the Google Sheets API client
const auth = new google.auth.GoogleAuth({
  credentials,
  scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
})

const sheets = google.sheets({version: 'v4', auth})

// ID of the Google Sheet and ranges of data to read
const spreadsheetId = '1CLIUfiw2MduzIXNUXNKLR7e8h8JBikqyfJwmGutt7Kw'
const ranges = {
  airportRange: 'airport!A2:O8757',
  countryRange: 'country!A2:I6',
  cityRange: 'city!A2:I7078',
}

// Function to read data from Google Sheets
async function readSheetData(range) {
  try {
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range,
    })

    const rows = response.data.values
    if (rows.length) {
      console.log(`Data retrieved from range ${range}:`)
      rows.forEach(row => console.log(row))
      return rows
    } else {
      console.log(`No data found in range ${range}.`)
      return []
    }
  } catch (error) {
    console.error(`Error reading data from range ${range}:`, error)
    return []
  }
}

// Function to insert data into SQLite tables
async function insertDataIntoSQLite(data, tableName, columns) {
  const db = new sqlite3.Database('./database.db')

  db.serialize(() => {
    const columnsDef = columns.join(' TEXT, ') + ' TEXT'
    db.run(
      `CREATE TABLE IF NOT EXISTS ${tableName} (id INTEGER PRIMARY KEY, ${columnsDef})`,
    )

    const placeholders = columns.map(() => '?').join(', ')
    const stmt = db.prepare(
      `INSERT INTO ${tableName} (${columns.join(
        ', ',
      )}) VALUES (${placeholders})`,
    )
    data.forEach(row => {
      stmt.run(row)
    })
    stmt.finalize()
  })

  db.close()
}

async function main() {
  const airportData = await readSheetData(ranges.airportRange)
  const countryData = await readSheetData(ranges.countryRange)
  const cityData = await readSheetData(ranges.cityRange)
  console.log(countryData)
  if (airportData.length) {
    const airportColumns = [
      'air_id',
      'icao_code',
      'iata_code',
      'name',
      'type',
      'city_id',
      'country_id',
      'continent_id',
      'wesite_url',
      'created_at',
      'updated_at',
      'latitude_deg',
      'longitude_deg',
      'elevation_ft',
      'wikipedia_link',
    ] // Update column names based on your sheet
    await insertDataIntoSQLite(airportData, 'Airport', airportColumns)
    console.log('Airport data inserted into SQLite database successfully.')
  }

  if (countryData.length) {
    const countryColumns = [
      'country_id',
      'name',
      'alt_name',
      'country_code_two',
      'country_code_three',
      'flag_app',
      'modile_code',
      'continent_id',
      'country_flag',
    ] // Update column names based on your sheet
    await insertDataIntoSQLite(countryData, 'Country', countryColumns)
    console.log('Country data inserted into SQLite database successfully.')
  }

  if (cityData.length) {
    const cityColumns = [
      'city_id',
      'name',
      'alt_name',
      'country_id',
      'is_active',
      'column6',
      'created_at',
      'updated_at',
      'lat',
      'long',
    ] // Update column names based on your sheet
    await insertDataIntoSQLite(cityData, 'City', cityColumns)
    console.log('City data inserted into SQLite database successfully.')
  }
}

main()
