const express = require('express');
const app = express();
require('dotenv').config();
const twitter = require('./controllers/Twitter');

const PORT = process.env.PORT || 8000;

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/', (req, res) => {
  res.send('Hello world');
});

app.get('/api/social/twitter/:term', async (req, res) => {
  let { term } = req.params
  let searchType = req.query.type;
  if (searchType === 'hashtag') {
    let searchResults = await twitter.searchHashtag(term)
    res.status(200).send(searchResults)
  } else {
    // let searchResults = await twitter.searchHashtag(term)
    // res.status(200).send(searchResults)
  }
  
})


app.listen(PORT, () => console.log(`Server is running on PORT ${PORT}`));