const Twitter = require('twitter-v2');
require("dotenv").config({ path: __dirname + `/../../.env` }); 

const client = new Twitter({

    'consumer_key': `${process.env.TWITTER_CONSUMER_TOKEN}`,
    'consumer_secret': `${process.env.TWITTER_CONSUMER_SECRET}`,
    'bearer_token': `${process.env.TWITTER_BEARER_TOKEN}`
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
