# HashFiend 😈
Does sentiment analysis on tweets about a topic of your choosing.

## Setting up the environment

### Vue App
```
cd App
npm install
```
### Express Server
```
cd Server
npm install
```

## Running the App
```npm run serve```

## Running the Server
```node index.js```

## How it works
- The Vue app creates a socket connection and sends your query string to the server.
- The server starts a stream to fetch tweets based on the user's query and sends it to the user using the socket.
- Vue app does sentiment analysis on these tweets and prints a neat pie chart with the result.

**Note:** Make sure both the App and Server are running before reporting bugs. 

## FAQs
### Why?
This is for a college project. Plus it looked pretty fun. Inspired by [this](https://towardsdatascience.com/twitter-sentiment-analysis-with-node-js-ae1ed8dd8fa7).


 
