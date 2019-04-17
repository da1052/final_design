<template>
  <keep-alive>
    <div>
      <div class="loading" v-show="data_inte == ''">
        <inline-loading></inline-loading>
        <span>加载中</span>
      </div>
      <transition name="slide_s">
        <scroll
          class="interlocution"
          :pulldown="pulldown"
          v-show="back_flag == false"
          @pulldown="pulldown_s"
        >
          <ul>
            <load-more tip="正在刷新" v-show="refresh"></load-more>
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
                    <div class="detail_title">{{item.title}}</div>
                    <div class="detail_user">
                      <div class="user_img">
                        <img :src="item.user_img">
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
      </transition>
      <transition name="slide">
        <router-view :data_inte_detail="data_inte_detail" @back_show="back_show_s()"></router-view>
      </transition>
    </div>
  </keep-alive>
</template>

<script>
import { mapMutations, mapState } from "vuex";
import { InlineLoading, LoadMore } from "vux";
import Scroll from "../../base/scroll/scroll";
import { setTimeout } from "timers";

export default {
  name: "interlocution",
  data() {
    return {
      pulldown: true,
      data_inte: [],
      inte_flag: false,
      data_inte_detail: [],
      refresh: false
    };
  },
  created() {
    this.set_head("问答");
    this.back_show(false);
    this.$http.get("/inte").then(
      response => {
        this.data_inte = response.body;
        this.data_inte.reverse();
        // console.log(this.data_inte);
      },
      error => {
        console.log("false");
      }
    );
  },
  methods: {
    ...mapMutations(["back_show", "set_head"]),
    set_detail(data) {
      this.data_inte_detail = [];
      this.data_inte_detail.push(data);
      // console.log(this.data_inte_detail)
      this.$router.push({
        path: `/Interlocution/${data.id}`
      });
      this.back_show(true);
    },
    back_show_s() {
      this.back_show(false);
      this.$http.get("/inte").then(
        response => {
          this.data_inte = response.body;
          this.data_inte.reverse();
          // console.log(this.data_inte);
        },
        error => {
          console.log("false");
        }
      );
    },
    pulldown_s() {
      this.refresh = true;
      setTimeout(() => {
        this.$http.get("/inte").then(
          response => {
            this.data_inte = response.body;
            this.data_inte.reverse();
            this.refresh = false;
            this.$dialog.toast({
              mes: "刷新成功！",
              timeout: 1500
            });
          },
          error => {
            console.log("false");
          }
        );
      }, 800);
    }
  },
  computed: {
    ...mapState(["header_text", "user_img", "back_flag"])
  },
  components: {
    Scroll,
    InlineLoading,
    LoadMore
  }
};
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
            height: 5.5rem
          .detail_title
            height: 3rem
            line-height: 1.5rem
            font-size: 1rem
            text-align: left
            margin: 0.5rem 0
            overflow: hidden
          .detail_user
            float: left
            margin-right: 1rem
            line-height: 1rem
            margin-bottom: 0.5rem
            .user_img
              width: 1rem
              float: left
              img
                width: 100%
            .user_name
              float: left
              margin-left: 0.5rem
          .detail_time
            float: left
            line-height: 1rem
            margin-bottom: 0.5rem
          .detail_right
            width: 6rem
            height: 5.5rem
            display: flex
            justify-content: center
            align-items: center
            padding: 0.5rem 0
            img
              width: 80%
              max-height: 4.5rem
      &:last-child
        .info_detail
          border-bottom: none
.slide-enter-active
  transition: all 0.25s linear
.slide-leave-active
  transition: all 0.25s linear
.slide-enter
  transform: translateX(100%)
.slide-leave-to
  transform: translateX(100%)
.slide_s-enter-active
  transition: all 0.25s linear
.slide_s-leave-active
  transition: all 0.25s linear
.slide_s-enter
  transform: translateX(-100%)
.slide_s-leave-to
  transform: translateX(-100%)
.loading
  position: absolute
  left: 0
  right: 0
  bottom: 0
  top: 0
  width: 50%
  height: 5%
  margin: auto
  z-index: 10
</style>
