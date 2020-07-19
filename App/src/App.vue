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
#logo {
  color: red;
}
#pie {
  width: 500px;
  height: 500px;
}
</style>
