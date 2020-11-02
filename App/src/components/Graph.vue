<template>
  <div class="container-fluid">
    <h1 class="display-2 text-center">Hash<span class="text-danger">Fiend</span></h1>
    <h6 class="text-center">By S. Vishal Kumar</h6>
    <p class="text-center">Perform sentiment analysis on tweets of any topic, in real-time.</p>
    <div class="input-group mb-3">
      <input type="text" class="form-control" placeholder="#" v-model="query">
      <div class="input-group-append">
        <button class="btn btn-outline-danger" type="button" v-on:click="plot">Search</button>
      </div>
    </div>
    <div class="row d-flex align-items-center">
      <div class="col-4 d-flex justify-content-center"> 
        <div class="text-center graph" id="meta">
          <canvas id="myChart"></canvas>
          <h5>{{ count }} tweets fetched.</h5>
          <h6><span class="text-success">{{ Math.round((result.positive/count)*100) }}%</span> positive tweets</h6>
          <h6><span class="text-primary">{{ Math.round((result.neutral/count)*100) }}%</span> neutral tweets</h6>
          <h6><span class="text-danger">{{ Math.round((result.negative/count)*100) }}%</span> negative tweets</h6>
          <div class="d-flex justify-content-center">
            <button class="btn btn-danger mb-2 m-3" type="button" v-on:click="stop" id="stop">Stop</button>
            <button class="btn btn-danger mb-2 m-3" type="button" v-on:click="clear" id="clear">Clear</button>
          </div>
        </div>
      </div>
      <div class="col-8">
        <h1 style="display: none;" id="tweetsHeading">Tweets:</h1>
        <div id="tweets" class="tweets"></div>
        <a class="btn btn-success mb-2 m-3" type="button" v-on:click="downloadDataset" style="display: none; color: white;" id="download">Download</a>
      </div>
    </div>
  </div>
</template>

<script>
 /* eslint-disable */ 
import Chart from 'chart.js';
import Sentiment from 'sentiment';
import io from 'socket.io-client';

export default {
  data: function() {
    return {
      query: undefined,
      count: 0,
      result: {
        positive: 0,
        negative: 0,
        neutral: 0
      }
    }
  },
  methods: {
    async plot() {
      this.count = 0;
      this.result.positive = 0;
      this.result.negative = 0;
      this.result.neutral = 0; 
      document.getElementById('meta').style.display = "none";
      document.getElementById('tweetsHeading').style.display = "block";
      var conf = {
        type: 'pie',
        data: {
            labels: ['Negative', 'Neutral', 'Positive'],
            datasets: [{
                data: [this.result.negative, this.result.neutral, this.result.positive],
                backgroundColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(75, 192, 192, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
          animation: {
            duration: 0
          }
        }
      }
      
      if (this.myChart != undefined) this.myChart.destroy();
      var ctx = document.getElementById('myChart');
      this.myChart = new Chart(ctx, conf);
      var sentiment = new Sentiment();      
      var temp;
      var data = {
        query: this.query
      };
      this.socket = io('http://192.168.0.132:3000/', {'sync disconnect on unload': true });
      this.socket.emit('query', data);
      this.socket.on('stream', (data) => {
          this.count++;
          temp = sentiment.analyze(data.tweet);
          let curr = 'blue';
          if (temp.score > 0) {
            this.result.positive += 1;
            curr = 'green';
          } else if (temp.score < 0) {
            this.result.negative += 1;
            curr = 'red';
          }
          else this.result.neutral += 1;
          // console.log(result);
          this.myChart.destroy();
          conf.data.datasets[0].data = [this.result.negative, this.result.neutral, this.result.positive];
          this.myChart = new Chart(ctx, conf);
          
          document.getElementById('meta').style.display = "block";
          document.getElementById('stop').style.display = "block";
          document.getElementById('clear').style.display = "none";
          
          var textNode = document.createTextNode(data.tweet);
          var node = document.createElement("P"); 
          node.style.color = curr;
          node.appendChild(textNode);
          var tweetDiv = document.getElementById("tweets");
          tweetDiv.appendChild(node);
          tweetDiv.scrollTop = tweetDiv.scrollHeight;  
      });
    },
    stop() {
      this.socket.close();
      document.getElementById('stop').style.display = "none";
      document.getElementById('clear').style.display = "block";
      document.getElementById('download').style.display = "block";
    },
    clear() {
      this.myChart.destroy();
      document.getElementById('meta').style.display = "none";
      document.getElementById('tweetsHeading').style.display = "none";
      document.getElementById('download').style.display = "none";
      document.getElementById('tweets').innerHTML = "";
      this.count = 0;
      this.result.positive = 0;
      this.result.negative = 0;
      this.result.neutral = 0; 
    },
    downloadDataset() {
      var base64doc = btoa(unescape(encodeURIComponent(document.getElementById('tweets').innerText))),
          a = document.getElementById('download');
          //e = new MouseEvent('click');
      a.download = 'dataset.txt';
      a.href = 'data:text/text;base64,' + base64doc;
      //a.dispatchEvent(e);
    }
  },
  name: 'Graph',
  props: {
    query: String
  }
}
</script>

<style scoped>
#meta, #clear {
  display: none;
}
.tweets {
  height: 500px;
  overflow-x: hidden;
  display: flex;
  flex-direction: column;
}
.graph {
  text-align: center;
  height: 700px;
  width: 700px;
}
</style>