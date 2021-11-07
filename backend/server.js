// ----- MODULES -----
const stationService = require('./services/station_service')
const express = require('express')
const cors = require('cors')

// ----- EXPRESS APP CONFIG -----
const app = express()
const http = require('http').createServer(app)
const port = process.env.PORT || 8081
app.use(express.json())

// CORS Header - 'Access-Control-Allow-Origin'
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.resolve(__dirname, 'public')))
} else {
    const corsOptions = {
        origin: ['http://127.0.0.1:8080', 'http://localhost:8080', 'http://127.0.0.1:3000', 'http://localhost:3000'],
        credentials: true
    }
    app.use(cors(corsOptions))
}

// ----- APP -----
// GET COMPANIES NAMES
app.get('/api/companies', async (req, res) => {
    try {
        res.set('Access-Control')
        const companies = await stationService.getAllGasCompanies()
        res.send(companies)
    } catch (err) {
        console.log('Had Error', err)
    }
})
// GET COMPANY ACTIVE STATION
app.post('/api/companies', async (req, res) => {
    try {
        const companyName = req.body.company
        const stations = await stationService.getAllStationsByCompany(companyName)
        res.send(stations)
    } catch (err) {
        console.log('Had Error', err)
    }
})

http.listen(port, () => {console.log(`Server is running on port: ${port}`)})