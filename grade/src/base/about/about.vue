<template>
  <div class="about">
    <div class="header">
      <div class="back" @click="back()">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-fanhui"></use>
        </svg>
      </div>
      <div class="title">关于App</div>
    </div>
    <div class="content">
      关于App，有以下几点说明：<br>
      1.App资讯页面和教程页面的内容均来源于数据库中的字段，采用vue指令v-html渲染到页面中，并非直接引入原来的素材页面，故样式会有些许遗漏，
      部分图片路径也可能不正确，见谅!<br>
      2.App资讯页面素材来源于开源中国网站<br>
      3.App教程页面素材来源于菜鸟教程网站<br>
      4.用户登录后点击用户头像可更改头像<br>
      5.部分页面可能出现无法滚动问题，原因是better-scroll初始化时页面图片加载未完成导致高度计算错误(已解决大部分页面此bug，小部分页面的原因还在查找中)，
      请切换其他页面再返回即可，目前已在修复，见谅!<br>
      6.App为个人测试所用App，不用于商业用途<br>
      以上
    </div>
  </div>
</template>

<script>
  import {mapMutations} from 'vuex'

  export default {
    name: "about",
    methods: {
      back() {
        this.$router.back();
        this.back_show(false);
      },
      ...mapMutations([
        'back_show'
      ])
    }
  }
</script>

<style scoped lang="stylus">
  .about
    width: 100%
    .header
      width: 100%
      height: 2.75rem
      position: absolute
      line-height: 2.75rem
      font-size: 1.2rem
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
    .content
      position: absolute
      top: 2.75rem
      width: 100%
      height: 100%
      font-size: .9rem
      text-align: left
      padding: 0 1rem
      line-height: 2rem
</style>
