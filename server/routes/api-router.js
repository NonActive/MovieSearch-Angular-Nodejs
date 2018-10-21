const routes = require('express').Router();
const movie = require('./movie/movie-routes');
const chart = require('./chart/chart-routes');
const search = require('./search/search-routes');
const enums = require('./enum/enum-routes');


routes.use('/movie', movie.movie);
routes.use('/chart', chart.chart);
routes.use('/search', search.search);
routes.use('/enums', enums.enums);


routes.get('/', (req, res) => {
	res.status(200).json({message: 'connected!'});
});

module.exports = {
	routes
};