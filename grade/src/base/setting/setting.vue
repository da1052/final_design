<template>
  <div class="setting">
    <div class="header">
      <div class="back" @click="back()">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-fanhui"></use>
        </svg>
      </div>
      <div class="title">设置</div>
    </div>
    <div class="setting_content">
      <div class="content_detail">
        <div class="left">自动更新</div>
        <div class="right">
          <yd-switch v-model="switch1" size="small" ></yd-switch>
        </div>
      </div>
      <div class="content_detail">
        <div class="left">清除缓存</div>
        <div class="right">100M</div>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapMutations, mapState} from 'vuex'

  export default {
    name: "setting",
    data() {
      return {
        switch1: false
      }
    },
    methods: {
      back() {
        this.$router.back();
        this.back_show(false);
      },
      ...mapMutations([
        'back_show',
        'set_autoUpdate'
      ])
    },
    computed: {
      ...mapState([
        'auto_update'
      ])
    },
    watch: {
      switch1() {
        this.set_autoUpdate(this.switch1);
      }
    },
    created() {
      this.switch1 = this.auto_update;
    }
  }
</script>

<style scoped lang="stylus">
  .setting
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

      .title
        font-size: 1rem
        line-height: 2.75rem
        margin: 0 25%
        overflow: hidden
        text-overflow: ellipsis
        white-space: nowrap
    .setting_content
      position: absolute
      width: 100%
      height: calc(100% - 2.75rem)
      top: 2.75rem
      overflow: hidden
      background: #ffffff
      padding-left: .5rem
      .content_detail
        overflow: hidden
        line-height: 2.5rem
        border-bottom: 1px solid rgba(102,102,102,0.2)
        .left
          float: left
          font-size: .9rem
        .right
          float: right
          font-size: .7rem
          height: 2.5rem
          display: flex
          align-items: center
          margin-right: .5rem
</style>
