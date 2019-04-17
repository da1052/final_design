<template>
  <div class="wrapper">
    <div class="header">
      <div class="back" v-if="back_flag" @click="back_show(false)">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-fanhui"></use>
        </svg>
      </div>
      <div class="title">{{data[0].title}}</div>
    </div>
    <scroll :data="data" :pulldown="pulldown" class="content_wrapper">
      <div>
        <div class="title">{{data[0].title}}</div>
        <div style="overflow: hidden;">
          <span class="author">{{data[0].author}}</span>
          <span class="time">发表于{{data[0].time | timeSubstr}}</span>
        </div>
        <div class="contents" v-html="data[0].prev"></div>
      </div>
    </scroll>
    <!--<p>123</p>-->
  </div>
</template>

<script>
  import {mapState, mapMutations} from 'vuex'
  import Scroll from "../scroll/scroll";

  export default {
    components: {Scroll},
    name: "wrapper",
    data() {
      return {
        pulldown: true
      }
    },
    computed: {
      ...mapState([
        'back_flag'
      ])
    },
    methods: {
      ...mapMutations([
        'back_show'
      ])
    },
    props: {
      data: Array
    },
    created() {
      // console.log(this.data)
    },
    filters: {
      timeSubstr: function (value) {
        return value.substr(0, 10)
      }
    }
  }
</script>

<style scoped lang="stylus">
  .wrapper
    /*position: absolute*/
    /*width: 100%*/
    /*height: 100%*/
    /*top: 0rem*/
    /*margin-bottom: 2.75rem*/
    /*overflow: hidden*/
    .header
      width: 100%
      height: 2.75rem
      position: absolute
      line-height: 2.75rem
      font-size: 1.2rem
      /*position: -webkit-sticky*/
      /*position: sticky*/
      top: 0
      background-color: #0f9cff
      color: #ffffff
      z-index: 150
      .back
        float: left
        position: absolute
        left: .5rem
        -webkit-tap-highlight-color: rgba(0,0,0,0)
        -webkit-tap-highlight-color: transparent
      .title
        font-size: 1rem
        line-height: 2.75rem
        margin: 0 25%
        overflow: hidden
        text-overflow: ellipsis
        white-space: nowrap
    .content_wrapper
      position: absolute
      width: 100%
      height: auto
      /*margin-top: 2.75rem*/
      top: 2.75rem
      bottom: .6rem
      overflow: hidden
      padding: 0 .875rem
      .title
        font-size: 1.6rem
        font-weight: 700
        text-align: left
        line-height: 2.25rem
        box-sizing: inherit
        word-break: break-word
      .author
        font-size: .9rem
        float: left
      .time
        font-size: .9rem
        float: right
      .contents
        text-align: left
      .contents >>>
        p
          margin-top: 1rem
          margin-bottom: .875rem
          line-height: 1.75rem
          font-size: 1rem
          text-align: left
        img
          width: 100%
          height: 100%
  .yd-flexview
    height: 30px

</style>
