'use strict';

import { DbService } from './db-service.js';
// import { httpService } from './http-service.js';

const KEY = 'item';

export default {
    query,
    get,
    remove,
    save,

};

// ----- LIST -----
async function query() {
    return await DbService.query(KEY);
    // return items = await httpService.get(KEY)
}

// ----- READ -----
async function get(id) {
    return await DbService.get(KEY, id);
    // return await httpService.get(KEY + '/' + id);
}

// ----- DELETE -----
async function remove(id) {
    return await DbService.delete(KEY, id);
    // return await httpService.delete(KEY + '/' + id);
}

// ----- UPDATE & CREATE -----
async function save(item) {
    if (item._id) {
        return await DbService.put(KEY, item)
        // return await httpService.put(KEY + '/' + item._id, item)
    }
    else {
        return await DbService.post(KEY, item)
        // return await httpService.post(KEY, item)
    }
}


