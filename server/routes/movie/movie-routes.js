const movie = require('express').Router();
const { getMovies, getMovieDetail, getTopMovies } = require('./movie-api');

movie.get('/', getMovies);
movie.get('/:id', getMovieDetail);


module.exports = {
	movie
};