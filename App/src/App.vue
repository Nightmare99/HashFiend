<template>
  <div id="app">
    <br>
    <Graph id="pie" msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
import Graph from './components/Graph.vue'

export default {
  name: 'App',
  components: {
    Graph
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #2c3e50;
  margin-top: 60px;
}
#logo {
  color: red;
}
#pie {
  width: 400px;
  height: 400px;
}
</style>
