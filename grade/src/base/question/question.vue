<template>
  <div class="question">
    <div class="header">
      <div class="back" @click="back()">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-fanhui"></use>
        </svg>
      </div>
      <div class="title">我的问答</div>
    </div>
    <scroll class="question_list" :data="question_list" :pulldown="pulldown">
      <swipeout>
        <swipeout-item class="item" v-for="item in question_list" :key="item.id" >
          <div slot="right-menu">
            <swipeout-button background-color="#0f9cff" @click.native="update_question(item)">编辑</swipeout-button>
            <swipeout-button background-color="#D23934" @click.native="delete_question(item.id)">删除</swipeout-button>
          </div>
          <div slot="content" class="content" @click="show_question(item)">
            {{item.title}}
          </div>
        </swipeout-item>
      </swipeout>
      <div v-show="question_list == ''">暂未发表帖子</div>
    </scroll>
    <router-view :data_inte_detail="data_inte_detail" @back_show="back_show_s()"></router-view>
  </div>
</template>

<script>
  import {mapMutations, mapState} from 'vuex'
  import {Swipeout, SwipeoutItem, SwipeoutButton} from 'vux'
  import Scroll from '../scroll/scroll'

  export default {
    name: "question",
    data() {
      return {
        question_list: [],
        pulldown: true,
        data_inte_detail: []
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
      show_question(data) {
        this.data_inte_detail = [];
        this.data_inte_detail.push(data);
        console.log(this.data_inte_detail);
        this.$router.push({
          path: `/question/${data.id}`
        })
      },
      delete_question(id) {
        console.log(id);
        this.$dialog.confirm({
          title: '',
          mes: '确定删除？',
          opts: () => {
            this.$http.post('/delete_question', {
              id: id
            }).then( response => {
              if(response.body.flag == true) {
                this.$dialog.toast({mes: '删除成功', timeout: 1000});
              } else {
                this.$dialog.toast({mes: '删除失败', timeout: 1000});
              }
            }, err => {
              this.$dialog.toast({mes: '未知错误', timeout: 1000});
              console.log(err);
            })
            this.$http.post('/question', {
              user: this.user
            }).then( response => {
              this.question_list = response.body;
            }, error => {
              console.log(error);
            })
          }
        });
      },
      update_question(value) {
        this.$router.push({
          path: '/Deliver',
          query: {content: value.detail, title: value.title, id: value.id}
        })
      },
      back_show_s() {
        this.back_show(true);
      }
    },
    created() {
      this.$http.post('/question', {
        user: this.user
      }).then( response => {
        this.question_list = response.body;
        // console.log(response);
      }, error => {
        console.log(error);
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
  .question
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
    .question_list
      position: absolute
      width: 100%
      height: calc(100% - 2.75rem)
      top: 2.75rem
      overflow: hidden
      background: #ffffff
      .item
        height: 3rem
        line-height: 3rem
        font-size: .9rem
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
