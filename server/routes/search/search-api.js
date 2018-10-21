const client = require('../../elasticsearch/connection')
const esb = require('elastic-builder')

const INDEX = 'movies'
const TYPE = 'movie'


var searchMovies = ((req, res) => {
    let params = req.query;

    console.log(params);

    let body = {
        _source: ["title", "genre", "dateCreated", "rating"],
        // sort: [
        //     { "rating.count": "desc" }
        // ],
        query: {
            bool: { 
                must: []
            }
        }
    }

    // Create match query from params
    for (let prop in params) {
        let param = params[prop];

        if ((prop === 'genre' || prop === 'origin') && param === '-všetky-') continue
        else if (prop === 'from' && param.length > 0) {
            let year = param.split('-')[0];
            body.query.bool.must.push({
                range: {
                    dateCreated: {
                      gte: year
                  }
                }
            });
        }
        // else if (prop === 'title' && param.length > 0) {
        //     body.query.bool.must.push({
        //         range: {
        //             dateCreated: {
        //               gte: year
        //           }
        //         }
        //     });
        // }
        else if (param !== 'undefined' && param.length > 0) {
            let match = {}
            match[prop] = param;

            body.query.bool.must.push({
                match
            })
        }
    }

    console.log(JSON.stringify(body));

    client.search({
        index: INDEX,
        type: TYPE,
        body: body
    }).then((response) => {

        const data = response.hits.hits;
    
        let movies = data.map((hit) => {
            let movie = hit._source;
            movie["_id"] = hit._id;

            movie.genre = movie.genre.join(' / ');

            return movie;
        });

        return res.status(200).send(JSON.stringify(movies));
    }).catch(err => {
        console.trace(err.message)
    });
});


module.exports = {
    searchMovies
}