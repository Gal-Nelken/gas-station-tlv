import { httpService } from './http-service.js';

const KEY = 'companies'

export default {
    query,
    update,

};
// GET ALL COMPANIES
async function query() {
    return await httpService.get(KEY)
}

// GET STATIONS BY COMPANY
async function update(company) {
        return await httpService.post(KEY, company)
}
