<template>
  <div>
    <scroll class="interlocution" :pulldown="pulldown" v-show="back_flag == false">
      <ul>
        <li v-for="item in data_inte" @click="set_detail(item)">
          <div class="info_p">
            <div class="info_message">
              <div>
                <svg class="icon" aria-hidden="true">
                  <use xlink:href="#icon-menu_news"></use>
                </svg>
                <div>{{item.comment_num}}</div>
              </div>
            </div>
            <div class="info_detail">
              <div class="detail_left">
                <div class="detail_title">
                  {{item.title}}
                </div>
                <div class="detail_user">
                  <div class="user_img">
                    <img :src="item.user_img"/>
                  </div>
                  <div class="user_name">{{item.user}}</div>
                </div>
                <div class="detail_time">{{item.time.substr(0, 10)}}</div>
              </div>
              <div class="detail_right">
                <img :src="item.img">
              </div>
            </div>
          </div>
        </li>
      </ul>
    </scroll>
    <router-view :data_inte_detail="data_inte_detail" @back_show="back_show_s()"></router-view>
  </div>
</template>

<script>
  import {mapMutations, mapState} from 'vuex'
  import Scroll from '../../base/scroll/scroll'

  export default {
    name: "interlocution",
    data() {
      return {
        pulldown: true,
        data_inte: [],
        inte_flag: false,
        data_inte_detail: []
      }
    },
    created() {
      this.set_head('问答');
      this.back_show(false);
      this.$http.get('/inte').then((response) => {
        this.data_inte = response.body;
        this.data_inte.reverse();
        // console.log(this.data_inte);
      }, error => {
        console.log('false');
      })
    },
    methods: {
      ...mapMutations([
        'back_show',
        'set_head'
      ]),
      set_detail(data) {
        this.data_inte_detail = [];
        this.data_inte_detail.push(data);
        // console.log(this.data_inte_detail)
        this.$router.push({
          path: `/Interlocution/${data.id}`
        })
        this.back_show(true);
      },
      back_show_s() {
        this.back_show(false);
      }
    },
    computed: {
      ...mapState([
        'header_text',
        'user_img',
        'back_flag'
      ])
    },
    components: {
      Scroll
    }
  }
</script>

<style scoped lang="stylus">
  .interlocution
    position: absolute
    width: 100%
    height: auto
    top: 2.75rem
    bottom: 3rem
    overflow: hidden
    background: #ffffff
    ul
      z-index: 10
      li
        .info_p
          display: flex
          .info_message
            width: 3rem
            display: flex
            justify-content: center
            align-items: center
          .info_detail
            flex: 1
            display: flex
            border-bottom: 1px solid rgba(102, 102, 102, 0.2)
            .detail_left
              flex: 1
            .detail_title
              height: 3rem
              line-height: 1.5rem
              font-size: 1rem
              text-align: left
              margin: .5rem 0
              overflow: hidden
            .detail_user
              float: left
              margin-right: 1rem
              line-height: 1rem
              margin-bottom: .5rem
              .user_img
                width: 1rem
                float: left
                img
                  width: 100%
              .user_name
                float: left
                margin-left: .5rem
            .detail_time
              float: left
              line-height: 1rem
              margin-bottom: .6rem
            .detail_right
              width: 6rem
              display: flex;
              justify-content: center;
              align-items: center;
              img
                width: 80%
        &:last-child
          .info_detail
            border-bottom: none
</style>
