const axios = require('axios');
const Twitter = require('twitter-v2');
require('dotenv').config();

const client = new Twitter({
    // consumer_key: `${process.env.TWITTER_CONSUMER_TOKEN}`,
    consumer_key: `q9YYaImmvaFi4Xz0XAMWJrh9Y`,
    // consumer_secret: `${process.env.TWITTER_CONSUMER_SECRET}`,
    consumer_secret: `ARLa83vvop2MpRF2WGnM10KvDdrTDXUA73EvOw97noG23vXheO`,
    // bearer_token: `${process.env.TWITTER_BEARER_TOKEN}`
    bearer_token: `AAAAAAAAAAAAAAAAAAAAAFHdSQEAAAAAv1ENV%2BW7kaJ%2FFRjEKKv8ljNp2Y8%3Dd1vfKuyrKsKXr2LagvSqndlKwC8XuzZTfUOcljx5ZFMpmJhhI4`
  });

module.exports = {
    searchHashtag: async (tagTerm) => {
        let params = {
            query: `#${tagTerm}`,
            'max_results': 30,
            'tweet.fields': 'attachments,author_id,created_at,entities,geo,id,lang,possibly_sensitive,source,text',
            'media.fields': 'media_key,url,type,preview_image_url',
            'expansions': 'attachments.media_keys'
        };
        let searchResults = await client.get("tweets/search/recent", params)
        .catch((error) => {
            console.error(error);
        })
        return searchResults.data;
    }
}
