const express = require('express');
const cors = require('cors');
const Twitter = require('twitter-lite');
const Sentiment = require('sentiment');
require('dotenv').config();

var client = new Twitter({
    consumer_key: process.env.TWITTER_CONSUMER_KEY,
    consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
    access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
    access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
});

const app = express();
app.use(cors());

function analyzeTweets(tweets, result) {
    var temp;
    for (var tweet of tweets.statuses) {
        var sentiment = new Sentiment();
        temp = sentiment.analyze(tweet.text);
        if (temp.score > 0) result.positive += 1;
        else if (temp.score < 0) result.negative += 1;
        else result.neutral += 1;
    }
}

app.get('/api', async (req, res) => {
    var result = {
        positive: 0,
        negative: 0,
        neutral: 0
    };
    var tweets;
    try {
        tweets = await client.get('search/tweets', {q: req.query.query, lang: 'en', count: 100 });
    }
    catch (err) {
        console.log(err);
    }
    console.log(tweets);
    analyzeTweets(tweets, result);
    for (var i = 0; i < 9; i ++) {
        var max = tweets.search_metadata.max_id;
        tweets = await client.get('search/tweets', {q: req.query.query, lang: 'en', count: 100, since_id: max + 1 });
        console.log(tweets);
        analyzeTweets(tweets, result);
    }
    res.json(result);

    // 

    // }
});

app.listen(3000, () => {
    console.log('Server started.');
});