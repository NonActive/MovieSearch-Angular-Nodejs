const client = require('../../elasticsearch/connection')
const esb = require('elastic-builder')

const INDEX = 'movies'
const TYPE = 'movie'


var getGenres = ((req, res) => {
    const requestBody = esb.requestBodySearch()
        .size(0)
        .agg(esb.termsAggregation('genres', 'genre.keyword').size(50));

    client.search({
        index: INDEX,
        type: TYPE,
        body: requestBody.toJSON()
    }).then(resp => {
        const data = resp.aggregations.genres.buckets;

        let genres = [{
            id: 0,
            title: '-všetky-'
        }, ...data.map((genre, index) => {
            return {
                id: index + 1,
                title: genre.key
            }
        })];

        return res.status(200).send(JSON.stringify(genres));
    }).catch(err => {
        console.trace(err.message)
    });
});

var getCountries = ((req, res) => {
    const requestBody = esb.requestBodySearch()
        .size(0)
        .agg(
            esb.termsAggregation('countries', 'origin.keyword')
                .order('_count', 'desc')
                .size(6));

    client.search({
        index: INDEX,
        type: TYPE,
        body: requestBody.toJSON()
    }).then(resp => {
        const data = resp.aggregations.countries.buckets;


        let countries = [{
            id: 0,
            title: '-všetky-'
        }, ...data.map((contry, index) => {
            return {
                id: index + 1,
                title: contry.key
            }
        })];

        return res.status(200).send(JSON.stringify(countries));
    }).catch(err => {
        console.trace(err.message)
    });
});

module.exports = {
    getGenres,
    getCountries
}