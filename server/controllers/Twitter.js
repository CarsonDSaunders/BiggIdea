const Twitter = require('twitter-v2');
require('dotenv').config({ path: __dirname + `/../../.env` });
const axios = require('axios');

const client = new Twitter({
    consumer_key: `${process.env.TWITTER_CONSUMER_TOKEN}`,
    consumer_secret: `${process.env.TWITTER_CONSUMER_SECRET}`,
    bearer_token: `${process.env.TWITTER_BEARER_TOKEN}`,
});

module.exports = {
    searchHashtag: async (tagTerm) => {
        let params = {
            query: `#${tagTerm}`,
            max_results: 50,
            'tweet.fields':
                'attachments,author_id,created_at,entities,geo,id,lang,possibly_sensitive,source,text',
            'media.fields': 'media_key,url,type,preview_image_url',
            expansions: 'attachments.media_keys',
        };
        let searchResults = await client
            .get('tweets/search/recent', params)
            .catch((error) => {
                console.error(error);
            });
        return searchResults;
    },
    searchAccount: async (tagTerm) => {
        let usernameParams = {
            username: `${tagTerm}`,
        };

        let user = await client.get(`users/by/username/${tagTerm}`);
        if (!user) {
            return;
        } else {
            let userId = user.data.id;
            let tweetsParams = {
                'tweet.fields':
                    'attachments,author_id,created_at,entities,geo,id,lang,possibly_sensitive,source,text,public_metrics',
                max_results: 50,
                'media.fields': 'media_key,url,type,preview_image_url',
                expansions: 'attachments.media_keys',
            };
            let searchResults = await client.get(
                `users/${userId}/tweets`,
                tweetsParams
            );
            return searchResults;
        }
    },
};
