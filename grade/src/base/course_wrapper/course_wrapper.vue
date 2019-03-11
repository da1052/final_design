<template>
  <div>
    <div class="course_wrapper" v-if="detail_flag == false">
      <div class="header">
        <div class="back" @click="back()">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-fanhui"></use>
          </svg>
        </div>
        <div class="title">{{data_course.name}}教程</div>
      </div>
      <div class="content">
        <div class="course_img">
          <img :src="data_course.photo">
        </div>
        <div class="course_title">
          {{data_course.name}}教程
        </div>
        <div class="course_btn">
          <div class="btn_s" @click="show_detail(data_course_detail.detail[0].detail[0].catanum)">开始阅读</div>
          <div class="btn_s" @click="popup_flag = true">目录</div>
          <div class="btn_s" :class="{btn_s_active: collection_flag}" @click="set_collection()">收藏</div>
        </div>
        <div class="course_summary">
          {{data_course.summary}}
        </div>
      </div>

    </div>
    <yd-popup v-model="popup_flag" position="right" width="60%" >
      <scroll :data="data_course_detail.detail" :pulldown="pulldown" class="detail_wrapper">
        <ul>
          <li v-for="item in data_course_detail.detail" class="detail_p">
            <h3>{{item.title}}</h3>
            <ul>
              <li v-for="item_s in item.detail" class="detail_s" @click="show_detail(item_s.catanum)">  <!---->
                <!--<a :href="item_s.address"></a>-->
                {{item_s.catalog}}
              </li>
            </ul>
          </li>
        </ul>
      </scroll>
    </yd-popup>
    <div class="course_detail" v-if="detail_flag && this.detail != null">
      <div class="header">
        <div class="back" @click="detail_back()">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-fanhui"></use>
          </svg>
        </div>
        <div class="title">{{detail_title}}</div>
      </div>
      <scroll class="content" :data="this.detail" :pulldown="pulldown">
        <div v-html="this.detail[0].prev"></div>
      </scroll>
      <div class="footer">
        <ul>
          <li :class="{check:detail[0].forward != ''}" @click="show_detail(detail[0].forward.catanum)">
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-previous"></use>
            </svg>
          </li>
          <li @click="popup_flag = true">
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-mulu"></use>
            </svg>
          </li>
          <li :class="{check:detail[0].next != ''}"  @click="show_detail(detail[0].next.catanum)">
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-next"></use>
            </svg>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapState, mapMutations} from 'vuex'
  import Scroll from '../../base/scroll/scroll'

  export default {
    name: "course_wrapper",
    data() {
      return {
        data_course_detail: {},
        popup_flag: false,
        pulldown: true,
        detail_flag: false,
        detail_title: null,
        detail: null,
        collection_flag: false
      }
    },
    props: {
      data_course: Object
    },
    computed: {
      ...mapState([
        'back_flag',
        'user'
      ])
    },
    methods: {
      ...mapMutations([
        'back_show'
      ]),
      back() {
        this.$emit('back_show');
        this.$router.back();
      },
      show_detail(num) {
        // this.detail = null;
        this.detail_flag = true;
        this.popup_flag = false;

        this.$http.get('/detail?catanum=' + num).then(response => {
          // console.log(response);
          this.detail = response.data;
          this.detail_title = this.detail[0].catalog;
          // console.log(this.detail);
        }, error => {
          console.log(error);
        })
      },
      detail_back() {
        this.detail_flag = false;
      },
      set_collection() {
        if(this.user == null) {
          this.$dialog.toast({
            mes: '请先登录！',
            timeout: 1500
          });
        } else {
          if(this.collection_flag == true) {
            this.$http.post('/delete_collection', {
              name: this.data_course.name,
              user: this.user
            }).then(response => {
              if(response.body.flag == true) {
                this.$dialog.toast({
                  mes: '取消收藏成功！',
                  timeout: 1500
                });
              } else {
                this.$dialog.toast({
                  mes: '取消收藏失败！',
                  timeout: 1500
                });
              }
              this.collection_flag = !response.body.flag;
            }, err => {
              this.$dialog.toast({
                mes: '未知错误！',
                timeout: 1500
              });
              console.log(err);
            })
          } else if(this.collection_flag == false) {
            this.$http.post('/add_collection', {
              name: this.data_course.name,
              user: this.user
            }).then(response => {
              if(response.body.flag == true) {
                this.$dialog.toast({
                  mes: '收藏成功！',
                  timeout: 1500
                });
              } else {
                this.$dialog.toast({
                  mes: '收藏失败！',
                  timeout: 1500
                });
              }
              this.collection_flag = response.body.flag;
            }, err => {
              this.$dialog.toast({
                mes: '未知错误！',
                timeout: 1500
              });
              console.log(err);
            })
          }
        }
      }
    },
    created() {
      this.$http.get('/classify/' + this.data_course.name).then(response => {
        this.data_course_detail = response.data;
        // console.log(this.data_course.name)
        // console.log(this.data_course_detail)
      }, error => {
        console.log('false');
      })
      this.$http.post('/select_collection', {
        user: this.user,
        name: this.data_course.name
      }).then(response => {
        this.collection_flag = response.body.flag;
      }, err => {
        console.log(err);
      })
    },
    components: {
      Scroll
    }
  }
</script>

<style scoped lang="stylus">
  .course_wrapper
    width: 100%;
    .header
      width: 100%
      height: 2.75rem
      position: fixed
      line-height: 2.75rem
      font-size: 1.2rem
      top: 0
      background-color: #0f9cff
      color: #ffffff
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
    .content
      position: absolute;
      top: 2.75rem
      width: 100%
      padding: 0 1rem
      font-size: .95rem
      line-height: 2.2rem
      .course_img
        margin-top: 1.5rem
      .course_title
        font-size: 1.1rem
        font-weight: 600
      .course_btn
        overflow: hidden
        padding: .35rem 0
        display: flex
        justify-content: center
        .btn_s
          width: 8rem
          float: left
          padding:0 .3rem
          margin: 0 1rem
          line-height: 1.7rem
          border:1px solid #0f9cff
          border-radius: 5px
        .btn_s_active
          background: #0f9cff
          color: #ffffff
      .course_summary
        margin-top: .6rem
        line-height: 1.5rem
        border-top: 1px solid #0f9cff
  .yd-mask
    top: 2.75rem !important
    .yd-popup-right
      top: 2.75rem !important
  .detail_wrapper
    position: absolute
    height: 100%
    width: 100%
    font-size: .9rem
    letter-spacing: .06rem
    line-height: 2.5rem
    text-align: left
    text-indent: .8rem
    .detail_p
      &:last-child
        .detail_s
          &:last-child
            border-bottom: none
      h3
        border-bottom: 1px solid rgba(102, 102, 102, .2)
        overflow: hidden
        text-overflow:ellipsis
        white-space: nowrap
        padding-right: .8rem
      .detail_s
        text-indent: 2rem
        border-bottom: 1px solid rgba(102, 102, 102, .2)
        padding-right: .8rem
        overflow: hidden;
        text-overflow:ellipsis
        white-space: nowrap
        /*&:last-child*/
        /*border-bottom: none*/
  .course_detail
    /*overflow: hidden*/
    .header
      width: 100%
      height: 2.75rem
      position: absolute
      line-height: 2.75rem
      font-size: 1.2rem
      top: 0
      background-color: #0f9cff
      color: #ffffff
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
    .content
      position: absolute
      top: 2.75rem
      width: 100%
      height: calc(100% - 5.4rem)
      overflow: hidden
      padding: 0 1rem
      font-size: .95rem
      line-height: 1.9rem
      text-align: left
    .content >>>
      h1
        margin: 0 0 .625rem 0
        font-size: 1.5em
        text-indent: initial
        text-decoration: none
        color: #000
        span
          color: #64854c
      h2
        margin: 0
        padding-top: 5px
        font-size: 1.2rem
        border-top: 1px solid #d4d4d4
        clear: both
      p
        word-wrap: break-word
        word-break: break-all
        font-size: .825rem
        line-height: 2em
      blockquote
        background-color: #fff
        padding: .625rem
        margin: .625rem
        font-size: .813rem
        line-height: 2em
        p
          word-wrap: break-word
          background: #f3f7f0
          padding: .25rem
          font-size: .875rem
          font-style: italic
          line-height: 1.5em
          font-weight: 400!important
      .example
        /*width: 98%*/
        color: #000
        background-color: #e5eecc
        margin: 0 0 5px 0
        padding: 5px
        border: 1px solid #d4d4d4
        background-image: -webkit-linear-gradient(#fff,#e5eecc 100px)
        background-image: linear-gradient(#fff,#e5eecc 100px)
        h2
          color: #617f10
          background-color: transparent
          margin-top: 0
        .example_code
          line-height: 1.4em
          width: 96%
          background-color: #fff
          padding: .3125rem
          border: 1px solid #d4d4d4
          font-size: 100%
          font-family: Menlo,Monaco,Consolas,"Andale Mono","lucida console","Courier New",monospace
          word-break: break-all
          word-wrap: break-word
          white-space: pre-wrap
          .h1-main
            background-color: #fff
            font-family: Menlo,Monaco,Consolas,"Andale Mono","lucida console","Courier New",monospace
            white-space: pre-wrap
            word-break: break-all
            word-wrap: break-word
            .hl-brackets
              color: Olive
            .hl-code
              color: gray
            .h1-var
              color: #00008b
            .hl-reserved
              color: Green
      .hr
        background-color: #d4d4d4;
        color: #d4d4d4;
        height: 1px;
        border: 0;
        clear: both;
      ul
        margin-top: 1em;
        margin-bottom: 1em;
        list-style-type: none;
        line-height: 140%;
        li
          list-style-type: none;
          /*background-image: url(assets/img/bullet@2x.png);*/
          background-repeat: no-repeat;
          background-position: left .4em;
          padding: 0 0 0 1.2em;
          -webkit-background-size: auto .5rem;
          -moz-background-size: auto .5rem;
          background-size: auto .5rem;
          margin: 0 0 1em 1em;
          line-height: 1.5em;
          font-size: .8125rem;
          word-break: break-all;
      .reference
      .tecspec
        border-collapse: collapse;
        width: 100%;
        margin-bottom: 4px;
        margin-top: 4px;
      .browserref
        border-collapse: collapse;
        width: 100%;
        tbody
          display: table-row-group;
          vertical-align: middle;
          tr
            display: table-row;
            vertical-align: inherit ;
            th
              color: #fff;
              background-color: #555;
              border: 1px solid #555;
              font-size: 12px;
              padding: 3px;
              vertical-align: top;
              text-align: left;
            td
              line-height: 2em;
              min-width: 24px;
              border: 1px solid #d4d4d4;
              padding: 5px;
              padding-top: 7px;
              padding-bottom: 7px;
              vertical-align: top;
  .footer
      position: absolute
      /*top: 0*/
      left: 0
      right: 0
      bottom: 0
      width: 100%
      z-index: 150
      box-shadow: 0px -1px 1px gray
      background-color: #fff
      ul
        display: flex
        li
          flex: 1
          line-height: 2.7rem
          font-size: 1.3rem
        .check
          color: rgb(0, 136, 255)
</style>
