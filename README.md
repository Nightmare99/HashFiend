# HashFiend 😈
Does sentiment analysis on a thousand tweets about a topic of your choosing.

## Setting up the environment

### Vue App
```
cd App
npm install
```
### Flask Server
```
cd Server2
```
Activate the virtualenv. 
```
pip install -r requirements
```
## Running the App
```npm run serve```

## Running the Server
```flask run```

## How it works
- The Vue app sends your query string to the Flask server.
- Flask server fetches the top 1000 tweets for your query. This can take a while.
- Flask server sends a response to the app with 1000 tweets.
- Vue app does sentiment analysis on these tweets and prints a neat pie chart with the result.

**Note:** Make sure both the App and Server are running before reporting bugs. 

## FAQs
### Why?
This is for a college project. Plus it looked pretty fun. Inspired by [this](https://towardsdatascience.com/twitter-sentiment-analysis-with-node-js-ae1ed8dd8fa7).

### What happened to Server1?
Once upon a time, in a land far, far away, there lived a back-end called Server1. He was an EJS server and was pretty damn good at what he did. One fine day, his programmer discovered [GetOldTweets3](https://github.com/Mottl/GetOldTweets3), and was seduced by its dark, mystic powers. That was the last anyone heard from him. Since then, everything he did, Server2 has been doing. Rumor has it that he was thrown into a dark pit by his programmer and left there to die.

TL;DR: I found a cool library for fetching tweets in python. Server1 was pure JS. So it had to go.

### IT TAKES SO LONG 🤬
1000 tweets ain't a joke, apparently.
 
