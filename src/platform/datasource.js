import _fp from 'lodash/fp';
import mockInv from './_mock-inventory';

/* 
	Map of mock endpoints and data
*/
const endpoints = {
	inventory: mockInv.data
}

/*
	Filters
*/
export const propFilter = (prop) => (val, limit = 5) => (obj) => _fp.filter((o) => _fp.startsWith(_fp.toLower(val), _fp.toLower(o[prop])), obj).slice(0, limit);

export const nameFilter = propFilter('name');

export const typeFilter = propFilter('type');

export const priceFilter = (price) => (obj) => _fp.filter((o) => o.price < price, obj);



/*
	datasource get funcion mock
*/
export const get = (ds) => (filter, callback) => setTimeout(() => { 
	console.log(`Making ajaxCall to ${ds} at ${new Date().getTime()}`); 
	callback(filter(endpoints[ds]))
}, 200)
