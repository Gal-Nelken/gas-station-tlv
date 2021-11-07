import Axios from 'axios'

const BASE_URL = '//localhost:8081/api/'


var axios = Axios.create({
    withCredentials: true
})


export const httpService = {
    get(endpoint, data) {
        return ajax(endpoint, 'GET', data)
        // return Promise.resolve(require('../data/gas-companies.json'))
    },
    post(endpoint, data) {
        return ajax(endpoint, 'POST', data)
        // const stations = (require('../data/open-stations.json'))
        // return Promise.resolve(stations[data])
    },
    put(endpoint, data) {
        return ajax(endpoint, 'PUT', data)
    },
    delete(endpoint, data) {
        return ajax(endpoint, 'DELETE', data)
    }
}



async function ajax(endpoint, method = 'GET', data = null) {
    try {
        const res = await axios({
            url: `${BASE_URL}${endpoint}`,
            method,
            data,
            params: (method === 'GET') ? data : null
        })
        return res.data
    } catch (err) {
        console.log(`Had Issues ${method}ing to the backend, endpoint: ${endpoint}, with data: ${data}`)
    }
}
