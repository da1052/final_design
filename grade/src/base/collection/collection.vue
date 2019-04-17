<template>
  <div class="collection">
    <div v-show="collection_flag">
      <div class="header">
        <div class="back" @click="back()">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-fanhui"></use>
          </svg>
        </div>
        <div class="title">我的收藏</div>
      </div>
      <scroll class="collection_list" :data="collection_list" :pulldown="pulldown">
        <swipeout>
          <swipeout-item class="item" v-for="item in collection_list" :key="item.name" >
            <div slot="right-menu">
              <swipeout-button background-color="#D23934" @click.native="delete_collection(item.name, item.user)">取消收藏</swipeout-button>
            </div>
            <div slot="content" class="content" @click="set_detail(item.name)">
              {{item.name}}
            </div>
          </swipeout-item>
        </swipeout>
        <div v-show="collection_list == ''">暂无收藏</div>
      </scroll>
    </div>
    <router-view :data_course="collection_detail" @back_show="back_show_s()"></router-view>
  </div>
</template>

<script>
  import {mapMutations, mapState} from 'vuex'
  import {Swipeout, SwipeoutItem, SwipeoutButton} from 'vux'
  import Scroll from '../scroll/scroll'

  export default {
    name: "connection",
    data() {
      return {
        collection_list: [],
        pulldown: true,
        collection_detail: {},
        collection_flag: true
      }
    },
    methods: {
      back() {
        this.$router.back();
        this.back_show(false);
      },
      ...mapMutations([
        'back_show'
      ]),
      set_detail(name) {
        this.$http.post('/collection_course', {
          name: name
        }).then(response => {
          this.collection_flag = false;
          this.collection_detail = response.body[0];
          this.$router.push({
            path: `/Collection/${name}`
          })
        }, err => {
          console.log(err);
        })
      },
      back_show_s() {
        this.back_show(true);
        this.collection_flag = true;
      },
      delete_collection(name, user) {
        this.$dialog.confirm({
          title: '',
          mes: '确定取消收藏？',
          opts: () => {
            this.$http.post('/delete_collection', {
              name: name,
              user: user
            }).then(response => {
              if(response.body.flag == true) {
                this.$dialog.toast({mes: '取消收藏成功', timeout: 1000});
              } else {
                this.$dialog.toast({mes: '取消收藏失败', timeout: 1000});
              }
              this.$http.post('/collection', {
                user: this.user
              }).then(response => {
                this.collection_list = response.body;
              }, err => {
                console.log(err);
              })
            }, err => {
              this.$dialog.toast({mes: '未知错误', timeout: 1000});
            })
          }
        });
      }
    },
    created() {
      this.$http.post('/collection', {
        user: this.user
      }).then(response => {
        this.collection_list = response.body;
        // console.log(response);
      }, err => {
        console.log(err);
      })
    },
    computed: {
      ...mapState([
        'user'
      ])
    },
    components: {
      Swipeout,
      SwipeoutItem,
      SwipeoutButton,
      Scroll
    }
  }
</script>

<style scoped lang="stylus">
  .collection
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
    .collection_list
      position: absolute
      width: 100%
      height: calc(100% - 2.75rem)
      top: 2.75rem
      overflow: hidden
      background: #ffffff
      .item
        height: 3rem
        line-height: 3rem
        text-align: left
        text-indent: 1rem
        margin-left: .5rem
        -ms-text-overflow: ellipsis
        text-overflow: ellipsis
        overflow: hidden
        border-bottom: 1px solid rgba(102,102,102,0.2)
        .content
          height: 3rem
          border-bottom: 1px solid rgba(102,102,102,0.2)
        &:last-child
          border-bottom: none
          .content
            border-bottom: none
</style>
