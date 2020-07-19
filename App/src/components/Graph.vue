<template>
  <div class="container mx-auto">
    <h1 class="display-2 text-center">Hash<span class="text-danger">Fiend</span></h1>
    <h6 class="text-center">By S. Vishal Kumar</h6>
    <p class="text-center">Perform sentiment analysis on top 1000 tweets of any topic</p>
    <div class="input-group mb-3">
      <input type="text" class="form-control" placeholder="#" v-model="query">
      <div class="input-group-append">
        <button class="btn btn-outline-danger" type="button" v-on:click="plot">Search</button>
      </div>
    </div>
    <div class="d-flex justify-content-center">
      <div class="spinner-border text-danger" id="loading" role="status">
        <span class="sr-only">Loading...</span>
      </div>
    </div>
    <canvas id="myChart" width="400" height="400"></canvas>
  </div>
</template>

<script>
 /* eslint-disable */ 
import Chart from 'chart.js';
import axios from 'axios';
import Sentiment from 'sentiment';

export default {
  methods: {
    async plot() {
      document.getElementById('loading').style.display = "block";
      if (this.myChart != undefined) this.myChart.destroy();
      var ctx = document.getElementById('myChart');      
      var result = {
        positive: 0,
        negative: 0,
        neutral: 0
      }, temp;
      var tweets = await axios.get(`http://127.0.0.1:5000/api?query=` + this.query);
      tweets = tweets.data.data;
      for (var tweet of tweets) {
        var sentiment = new Sentiment();
        temp = sentiment.analyze(tweet);
        if (temp.score > 0) result.positive += 1;
        else if (temp.score < 0) result.negative += 1;
        else result.neutral += 1;
      }
      console.log(result);
      document.getElementById('loading').style.display = "none";
      this.myChart = new Chart(ctx, {
          type: 'pie',
          data: {
              labels: ['Negative', 'Neutral', 'Positive'],
              datasets: [{
                  data: [result.negative, result.neutral, result.positive],
                  backgroundColor: [
                      'rgba(255, 99, 132, 1)',
                      'rgba(54, 162, 235, 1)',
                      'rgba(75, 192, 192, 1)'
                  ],
                  borderWidth: 1
              }]
          },
          options: {}
      });
    }
  },
  name: 'Graph',
  props: {
    query: String
  }
}
</script>

<style scoped>
#loading {
  display: none;
}
</style>