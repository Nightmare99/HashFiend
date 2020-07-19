<template>
  <div class="hello">
    <h1>Hash<span id="logo">Fiend</span></h1>
    <input name="hashtag" placeholder="#" v-model="query"/>
    <button v-on:click="plot" id="btn">Search</button>
    <canvas id="myChart" width="400" height="400"></canvas>
  </div>
</template>

<script>
 /* eslint-disable */ 
import Chart from 'chart.js';
import axios from 'axios';

export default {
  methods: {
    async plot() {
      console.log('clicked');
      if (this.myChart != undefined) this.myChart.destroy();
      var ctx = document.getElementById('myChart');
      var context = ctx.getContext("2d");
      context.fillText("Loading...", 100, 50);
      var result = await axios.get(`http://localhost:3000/api?query=` + this.query);
      result = result.data;
      console.log(result);
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
#btn {
  background-color: white;
  border: none;
}
</style>