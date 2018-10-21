const client = require('../../elasticsearch/connection')

const INDEX = 'movies'
const TYPE = 'movie'

var getMovies = ((req, res) => {
    let searchTerm = req.query.search;

    client.search({
        index: INDEX,
        type: TYPE,
        body: {
            _source: ["title", "genre", "dateCreated", "image"],
            query: {
                match: {
                    "autocomplete": {
                        query: searchTerm,
                        operator: 'and'
                    }
                }
            },
            size: 50
        }
    }, function (error, response, status) {
        if (error) {
            console.log("search error: " + error)
        }
        else {
            const data = response.hits.hits;

            let movies = data.map((hit) => {
                let movie = hit._source;

                movie["_id"] = hit._id;

                if (movie.hasOwnProperty('image')) {
                    movie.image = `https:${movie.image}`;
                }
                return movie;
            });

            return res.status(200).send(JSON.stringify(movies));
        }
    });
});

var getMovieDetail = ((req, res) => {
    let movieId = req.params.id;

    client.get({
        index: INDEX,
        type: TYPE,
        id: movieId
    }, function (error, response, status) {
        if (error) {
            console.log("search error: " + error)
        }
        else {
            const data = response._source;
            if (data.hasOwnProperty('image')) {
                data.image = `https:${data.image}`;
            }

            data.genre = data.genre.join(' / ');
            data.hraji = data.hraji.join(', ');
            if (data.hasOwnProperty('hudba')) {
                data.hudba = data.hudba.join(', ');
            }

            return res.status(200).send(JSON.stringify(data));
        }
    });
});

module.exports = {
    getMovies,
    getMovieDetail
}