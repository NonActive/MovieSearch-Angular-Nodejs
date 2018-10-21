const enums = require('express').Router();
const { getGenres, getCountries } = require('./enum-api');

enums.get('/genre', getGenres);
enums.get('/country', getCountries)

module.exports = {
	enums
};