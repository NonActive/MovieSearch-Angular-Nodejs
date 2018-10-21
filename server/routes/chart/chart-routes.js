const chart = require('express').Router();
const { getTopMovies, getTopActors, getTopGenresByRatingCount } = require('./chart-api');

chart.get('/top-movies', getTopMovies);
chart.get('/top-actors', getTopActors);
chart.get('/top-genres', getTopGenresByRatingCount);


module.exports = {
	chart
};