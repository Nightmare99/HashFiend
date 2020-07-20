const express = require('express');
const cors = require('cors');
const Twit = require('twit');
require('dotenv').config();

var client = new Twit({
    consumer_key: process.env.TWITTER_CONSUMER_KEY,
    consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
    access_token: process.env.TWITTER_ACCESS_TOKEN_KEY,
    access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
});

const app = express();
app.use(cors());
var server = require('http').createServer(app).listen(3000);
var io = require('socket.io').listen(server);

io.sockets.on('connection', function (socket) {
    console.log('client connected');
    socket.on('query', (data) => {
        var stream = client.stream('statuses/filter', { track: data.query, language: 'en' });
        stream.on('tweet', function (tweet) {
            console.log(tweet.text);
            socket.emit('stream', { tweet: tweet.text });
        });
        socket.on('disconnect', function () {
            stream.stop();
        });
    })
});