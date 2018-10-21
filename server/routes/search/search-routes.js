const search = require('express').Router();
const { searchMovies } = require('./search-api');

search.get('/', searchMovies);

module.exports = {
	search
};