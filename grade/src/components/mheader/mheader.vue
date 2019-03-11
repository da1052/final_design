<template>

  <!--头部导航-->
  <!--<yd-navbar title="NavBar" class="header">-->
  <!--<yd-navbar-back-icon></yd-navbar-back-icon>-->
  <!--</yd-navbar>-->
  <div class="header" v-show="back_flag == false">
    {{header_text}}
  </div>

</template>

<script>
  import {mapState, mapMutations} from 'vuex'

  export default {
    name: "box",
    computed: {
      ...mapState([
        'back_flag',
        'header_text'
      ])
    },
    methods: {
      ...mapMutations([
        'back_show'
      ])
    }
  }
</script>

<style scoped lang="stylus">
  h1, h2
    font-weight: normal;

  ul
    list-style-type: none;
    padding: 0;

  li
    display: inline-block;
    margin: 0 10px;

  a
    color: #42b983;

  .header
    width: 100%
    height: 2.75rem
    position: fixed
    line-height: 2.75rem
    font-size: 1.2rem
    /*position: -webkit-sticky*/
    /*position: sticky*/
    top: 0
    background-color: #0f9cff //#0f9cff
    color: #ffffff
    z-index: 150
    .back
      float: left
      position: absolute
      left: .5rem

  .yd-flexview
    height: 30px

</style>

