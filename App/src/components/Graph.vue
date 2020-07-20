<template>
  <div class="container mx-auto">
    <h1 class="display-2 text-center">Hash<span class="text-danger">Fiend</span></h1>
    <h6 class="text-center">By S. Vishal Kumar</h6>
    <p class="text-center">Perform sentiment analysis on tweets of any topic, in real-time.</p>
    <div class="input-group mb-3">
      <input type="text" class="form-control" placeholder="#" v-model="query">
      <div class="input-group-append">
        <button class="btn btn-outline-danger" type="button" v-on:click="plot">Search</button>
      </div>
    </div>
    <canvas id="myChart" width="400" height="400"></canvas>
    <div class="text-center" id="meta">
      <h2>{{ count }} tweets fetched.</h2>
      <h3><span class="text-success">{{ Math.round((result.positive/count)*100) }}%</span> positive tweets</h3>
      <h3><span class="text-primary">{{ Math.round((result.neutral/count)*100) }}%</span> neutral tweets</h3>
      <h3><span class="text-danger">{{ Math.round((result.negative/count)*100) }}%</span> negative tweets</h3>
      <div class="d-flex justify-content-center">
        <button class="btn btn-danger mb-2 m-3" type="button" v-on:click="stop" id="stop">Stop</button>
        <button class="btn btn-danger mb-2 m-3" type="button" v-on:click="clear" id="clear">Clear</button>
      </div>
    </div>
  </div>
</template>

<script>
 /* eslint-disable */ 
import Chart from 'chart.js';
import axios from 'axios';
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
      // document.getElementById('loading').style.display = "block";
      if (this.myChart != undefined) this.myChart.destroy();
      var ctx = document.getElementById('myChart');
      this.myChart = new Chart(ctx, conf);
      var sentiment = new Sentiment();      
      var temp;
      var data = {
        query: this.query
      };
      this.socket = io('http://localhost:3000/', {'sync disconnect on unload': true });
      this.socket.emit('query', data);
      this.socket.on('stream', (data) => {
          this.count++;
          temp = sentiment.analyze(data.tweet);
          if (temp.score > 0) this.result.positive += 1;
          else if (temp.score < 0) this.result.negative += 1;
          else this.result.neutral += 1;
          // console.log(result);
          this.myChart.destroy();
          conf.data.datasets[0].data = [this.result.negative, this.result.neutral, this.result.positive];
          this.myChart = new Chart(ctx, conf);
          document.getElementById('meta').style.display = "block";
          document.getElementById('stop').style.display = "block";
          document.getElementById('clear').style.display = "none";
      });
    },
    stop() {
      this.socket.close();
      document.getElementById('stop').style.display = "hide";
      document.getElementById('clear').style.display = "block";
    },
    clear() {
      this.myChart.destroy();
      document.getElementById('meta').style.display = "none";
      this.count = 0;
      this.result.positive = 0;
      this.result.negative = 0;
      this.result.neutral = 0; 
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
</style>