const client = require('../../elasticsearch/connection')
const esb = require('elastic-builder')

const INDEX = 'movies'
const TYPE = 'movie'


var getTopActors = ((req, res) => {
    client.search({
        index: INDEX,
        type: TYPE,
        body: {
            size: 0,
            query: {
                bool: {
                    must: [
                        {
                            range: {
                                'rating.count': {
                                    gte: 10000
                                }
                            }
                        }
                    ],
                    filter: {
                        term: {
                            dateCreated: 2018
                        }
                    }
                }
            },
            aggs: {
                actors: {
                    terms: {
                        size: 10000,
                        field: "hraji.keyword",
                        min_doc_count: 2
                    },
                    aggs: {
                        avg_rating: {
                            avg: {
                                field: "rating.avg_rating"
                            }
                        },
                        count_sum: {
                            sum: {
                                field: "rating.count"
                            }
                        },
                        actor_rating_sort: {
                            bucket_sort: {
                                sort: [
                                    {
                                        "avg_rating": {
                                            "order": "desc"
                                        }
                                    }
                                ],
                                size: 20
                            }
                        }
                    }
                }
            }
        }
    }).then(resp => {
        const data = resp.aggregations.actors.buckets;
        let topActors = data.map(actor => {

            return {
                actor: actor.key,
                movie_count: actor.doc_count,
                avg_rating: actor.avg_rating.value,
                count_sum: actor.count_sum.value
            }


        });

        return res.status(200).send(JSON.stringify(topActors));
    }).catch(err => {
        console.trace(err.message);
    });
});


var getTopGenresByRatingCount = ((req, res) => {
    client.search({
        index: INDEX,
        type: TYPE,
        body: {
            size: 0,
            aggs: {
                "genres": {
                    "terms": {
                        "field": "genre.keyword",
                        "min_doc_count": 1000
                    },
                    "aggs": {
                        "rating_count": {
                            "avg": {
                                "field": "rating.count"

                            }
                        },
                        "rating_count__bucket_filter": {
                            "bucket_selector": {
                                "buckets_path": {
                                    "totalSales": "rating_count"
                                },
                                "script": "params.totalSales > 1000"
                            }
                        },
                        "rating_count_sort": {
                            "bucket_sort": {
                                "sort": [
                                    {
                                        "rating_count": {
                                            "order": "desc"
                                        }
                                    }
                                ]
                            }
                        }
                    }
                }
            }
        }
    }).then(resp => {
        const data = resp.aggregations.genres.buckets;

        let topGenres = data.map(genre => {
            return {
                genre: genre.key,
                movie_count: genre.doc_count,
                avg_count: Math.round(+genre.rating_count.value * 100) / 100
            }
        });

        return res.status(200).send(JSON.stringify(topGenres));
    }).catch(err => {
        console.trace(err.message);
    });
});

var getTopMovies = ((req, res) => {
    client.search({
        index: INDEX,
        type: TYPE,
        body: {
            _source: ["title", "genre", "dateCreated", "rating", "origin"],
            sort: [
                { "rating.count": "desc" },
                { "rating.avg_rating": "desc" },
                "_score"
            ],
            query: {
                match_all: {}
            }
        }
    }, function (error, response, status) {
        if (error) {
            console.log("Top movies error: " + error)
        }
        else {
            const data = response.hits.hits;
            let topMovies = data.map((hit) => {
                let movie = hit._source;
                movie.genre = movie.genre.join(' / ');
                movie["_id"] = hit._id;

                return movie;
            });


            return res.status(200).send(JSON.stringify(topMovies));
        }
    });
});

module.exports = {
    getTopActors,
    getTopMovies,
    getTopGenresByRatingCount
}