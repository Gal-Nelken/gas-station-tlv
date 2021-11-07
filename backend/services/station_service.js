const axios = require('axios')
const URL = 'https://api.tel-aviv.gov.il/gis/Layer?layerCode=548'

// GET GAS COMPANIES NAMES ARRAY
async function getAllGasCompanies() {
    try {
        // Get All Stations From URL
        const stations = await _ajax('get')
        const companies = []
        // Push Company Name Only If The Company Is Not In Companies Array 
        stations.features.map(station => {
            const { shem_hevra } = station.attributes
            const isInCompany = companies.includes(shem_hevra);
            if ((!isInCompany)) companies.push(shem_hevra)
        })
        return companies
    } catch (err) {
        console.log('Had Error in backend', err)
    }
}
// GET COMPANY STATIONS
async function getAllStationsByCompany(companyName) {
    try {
        const stations = await _ajax('get')
        return stations.features.filter(station => {
            const { shem_hevra, is_open } = station.attributes
            return shem_hevra === companyName 
            && is_open === 'כן'
        })
    } catch (err) {
        console.log('Had Error in backend', err)
    }
}



async function _ajax(method = 'get', data = null) {
    try {
        const res = await axios({
            url: URL,
            method,
            data,
            params: (method === 'GET') ? data : null
        })
        return res.data
    } catch (err) {
        console.log(`Had Issues ${method}ing to the backend, endpoint: ${endpoint}, with data: ${data}`)
        console.dir(err)
        throw err
    }
}





module.exports = {
    getAllGasCompanies,
    getAllStationsByCompany
}