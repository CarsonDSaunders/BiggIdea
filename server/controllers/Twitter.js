<<<<<<< HEAD
const axios = require("axios");
const Twitter = require("twitter-v2");
require("dotenv").config();
=======
const Twitter = require('twitter-v2');
require("dotenv").config({ path: __dirname + `/../../.env` }); 
>>>>>>> 511f2e3abd3ce5bbdbc656a6eace41fffb65d833

const client = new Twitter({

    'consumer_key': `${process.env.TWITTER_CONSUMER_TOKEN}`,
    'consumer_secret': `${process.env.TWITTER_CONSUMER_SECRET}`,
    'bearer_token': `${process.env.TWITTER_BEARER_TOKEN}`
  });

module.exports = {
    searchHashtag: async (tagTerm) => {
        let params = {
            query: `#${tagTerm}`,
            max_results: 30,
            "tweet.fields":
                "attachments,author_id,created_at,entities,geo,id,lang,possibly_sensitive,source,text",
            "media.fields": "media_key,url,type,preview_image_url",
            expansions: "attachments.media_keys",
        };
        let searchResults = await client
            .get("tweets/search/recent", params)
            .catch((error) => {
                console.error(error);
            });
        return searchResults;
    },
    searchUser: async (tagTerm) => {
        let usernameParams = {
            username: `${tagTerm}`,
            "user.fields": "profile_image_url,url",
        };

        client
            .get("users/by/username", usernameParams)
            .then((response) => {
                let userId = response.data.id;
                let tweetsParams = {
                    "tweet.fields":
                        "attachments,author_id,created_at,entities,geo,id,lang,possibly_sensitive,source,text",
                    max_results: 30,
                    "media.fields": "media_key,url,type,preview_image_url",
                    expansions: "attachments.media_keys",
                };
                client
                    .get(`users/${userId}/tweets`, tweetsParams)
                    .then((response) => {
                        return response;
                    })
                    .catch((error) => {
                        console.error(error);
                    });
            })
            .catch((error) => {
                console.error(error);
            });
    },
    getStream: async () => {
        let params = {
            "tweet.fields":
                    "attachments,author_id,created_at,entities,geo,id,lang,possibly_sensitive,source,text",
                    "media.fields": "media_key,url,type,preview_image_url",
                    expansions: "attachments.media_keys"
        };

        const stream = client.stream('tweets/search/stream', params);

        // Close the stream after 30s.
        setTimeout(() => {
            stream.close();
        }, 1000);

        for await (const { data } of stream) {
            console.log(data);
        }
    },
};
