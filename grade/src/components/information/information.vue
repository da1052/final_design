<template>
  <keep-alive>
    <div>
      <div class="loading" v-show="datalist == ''">
        <inline-loading></inline-loading>
        <span>加载中</span>
      </div>
      <transition name="slide_s">
        <scroll
          class="information"
          :data="datalist"
          :pulldown="pulldown"
          v-show="back_flag == false"
          @pulldown="pulldown_s"
        >
          <ul v-show="back_flag == false">
            <load-more tip="正在刷新" v-show="refresh"></load-more>
            <li v-for="(item, index) in datalist" :key="index" @click="show_iframe(item)">
              <div class="info_p">
                <div class="info_title">{{item.title}}</div>
                <div class="info_synopsis">{{item.synopsis}}</div>
                <div class="info_a_t">
                  <div class="info_author">{{item.author}}</div>
                  <div class="info_time">{{item.time | timeSubstr}}</div>
                </div>
              </div>
              <!--</a>-->
            </li>
          </ul>
        </scroll>
      </transition>
      <transition name="slide">
        <wrapper :data="i_data" v-if="back_flag"></wrapper>
      </transition>
    </div>
  </keep-alive>
</template>

<script>
import Scroll from "../../base/scroll/scroll";
import Wrapper from "../../base/wrapper/wrapper";
import { mapMutations, mapState } from "vuex";
import { InlineLoading, LoadMore } from "vux";
import { setTimeout } from "timers";
export default {
  name: "information",
  data() {
    return {
      pulldown: true,
      datalist: [],
      // show_flag: false,
      i_data: [],
      refresh: false
    };
  },
  methods: {
    show_iframe(data) {
      // data.prev = data.prev.replace(/\r\n/g,"<br>");
      // data.prev = data.prev.replace(/\n/g,"");
      this.i_data = [];
      this.i_data.push(data);
      this.show_flag = true;
      this.back_show(true);
      // console.log(data);
    },
    ...mapMutations(["back_show", "set_head"]),
    pulldown_s() {
      this.refresh = true;
      setTimeout(() => {
        this.$http.get("/info").then(
          response => {
            this.datalist = response.data;
            this.$dialog.toast({
              mes: "刷新成功！",
              timeout: 1500
            });
            this.refresh = false;
          },
          error => {
            console.log("false");
          }
        );
      }, 800);
    }
  },
  components: {
    Scroll,
    Wrapper,
    InlineLoading,
    LoadMore
  },
  created() {
    this.set_head("资讯");
    this.back_show(false);
    this.$http.get("/info").then(
      response => {
        this.datalist = response.data;
      },
      error => {
        console.log("false");
      }
    );
  },
  filters: {
    timeSubstr: function(value) {
      return value.substr(0, 10);
    }
  },
  computed: {
    ...mapState(["back_flag", "header_text"])
  }
};
</script>

<style scoped lang="stylus">
.information
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
      margin: 0 0 0 0.9rem
      padding-right: 0.9rem
      text-align: left
      border-bottom: 1px solid rgba(102, 102, 102, 0.2)
      &:last-child
        border-bottom: none
      .info_p
        /* margin-right: 1rem */
        .info_title
          font-size: 1.1rem
          font-weight: 600
        .info_synopsis
          margin-top: 0.3rem
          font-size: 0.8rem
          height: 2.4rem
          line-height: 1.2rem
          overflow: hidden
          text-overflow: ellipsis
          color: #666666
          opacity: 0.9
        .info_a_t
          overflow: hidden
          line-height: 2rem
          .info_author
            float: left
            margin-right: 1.5rem
          .info_time
            float: left
.iframe_info
  width: 100%
  height: 100%
  border: none
  overflow-y: scroll
  overflow-x: hidden
  position: absolute
  left: 0
  top: 2.75rem
.pre
  width: 100%
  height: 100%
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
.loading_s
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