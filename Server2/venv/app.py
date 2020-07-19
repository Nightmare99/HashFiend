import flask
from flask_cors import CORS
from flask import request, jsonify
import GetOldTweets3 as got

app = flask.Flask(__name__)
CORS(app)

@app.route('/')
def hello_world():
    return 'Hello, World!'

@app.route('/api', methods=['GET'])
def api():
    searchword = request.args.get('query', '')
    print('Request recieved: ', searchword)
    tweetCriteria = got.manager.TweetCriteria().setQuerySearch(searchword)\
                                            .setLang("en")\
                                            .setMaxTweets(1000)
    tweets = got.manager.TweetManager.getTweets(tweetCriteria)
    result = []
    for tweet in tweets:
        print(tweet.text)
        result.append(tweet.text)
    return jsonify({'data': result})