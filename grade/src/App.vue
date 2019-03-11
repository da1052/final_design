<template>
  <div id="app">
    <mheader></mheader>
    <router-view/>
    <mfooter></mfooter>
  </div>
</template>

<script>
  import Mheader from './components/mheader/mheader'
  import Mfooter from './components/mfooter/mfooter'
export default {
  name: 'App',
  components: {
    Mheader,
    Mfooter
  }
}
</script>

<style >
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  /*margin-top: 60px;*/
}
</style>
