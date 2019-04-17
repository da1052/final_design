<template>
  <keep-alive>
    <div>
      <div class="loading" v-show="data_classify == ''">
        <inline-loading></inline-loading>
        <span>加载中</span>
      </div>
      <transition name="slide_s">
        <scroll
          class="course"
          :data="data_classify"
          :pulldown="pulldown"
          v-show="back_flag == false"
          @pulldown="pulldown_s"
        >
          <ul>
            <load-more tip="正在刷新" v-show="refresh"></load-more>
            <li v-for="(item, index) in data_classify" :key="index">
              <h3>{{item.category}}</h3>
              <ul>
                <li
                  v-for="(item_s, index) in item.detail" :key="index"
                  class="course_detail_p"
                  @click="setDetail(item_s)"
                >
                  <div class="course_detail">
                    <div class="course_img">
                      <img :src="item_s.photo">
                    </div>
                    <div class="course_n_s">
                      <div class="course_name">{{item_s.name}}</div>
                      <div class="course_summary">{{item_s.summary}}</div>
                    </div>
                    <div class="course_next">
                      <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-next"></use>
                      </svg>
                    </div>
                  </div>
                </li>
              </ul>
            </li>
          </ul>
        </scroll>
      </transition>
      <transition name="slide">
        <router-view :data_course="data_course_detail" @back_show="back_show_s()"></router-view>
      </transition>
    </div>
  </keep-alive>
</template>

<script>
import Scroll from "../../base/scroll/scroll";
import CourseWrapper from "../../base/course_wrapper/course_wrapper";
import { InlineLoading, LoadMore } from "vux";
import { mapState, mapMutations } from "vuex";
import { setTimeout } from "timers";

export default {
  components: {
    Scroll,
    CourseWrapper,
    InlineLoading,
    LoadMore
  },
  name: "course",
  data() {
    return {
      data_course: [],
      data_classify: [],
      pulldown: true,
      data_course_detail: {},
      refresh: false
    };
  },
  computed: {
    ...mapState(["back_flag", "header_text"])
  },
  created() {
    this.set_head("教程");
    this.back_show(false);
    this.$http.get("/classify").then(
      response => {
        this.data_classify = response.data;
      },
      error => {
        console.log("false");
      }
    );
    // this.$http.get("/course").then(
    //   response => {
    //     console.log(response);
    //     this.data_course = response.data;
    //   },
    //   error => {
    //     console.log("false");
    //   }
    // );
  },
  methods: {
    ...mapMutations(["back_show", "set_head"]),
    setDetail(data) {
      this.data_course_detail = data;
      this.$router.push({
        path: `/Course/${data.name}`
      });
      this.back_show(true);
    },
    back_show_s() {
      // console.log('1');
      this.back_show(false);
    },
    pulldown_s() {
      this.refresh = true;
      setTimeout(() => {
        this.$http.get("/classify").then(
          response => {
            this.data_classify = response.data;
            this.refresh = false;
            this.$dialog.toast({
              mes: "刷新成功！",
              timeout: 500
            });
          },
          error => {
            console.log("false");
          }
        );
      }, 800);
    }
  }
};
</script>

<style scoped lang="stylus">
.course
  position: absolute
  width: 100%
  height: auto
  top: 2.75rem
  bottom: 3rem
  overflow: hidden
  background: #ffffff
  h3
    background: rgba(230, 230, 230, 1)
    text-align: left
    padding-left: 1rem
    font-size: 1.2rem
    font-weight: 400
    height: 1.8rem
    line-height: 2rem
  ul
    .course_detail_p
      width: 100%
      border-bottom: 1px solid rgba(102, 102, 102, 0.2)
      &:last-child
        border-bottom: none
      .course_detail
        width: 100%
        display: flex
        padding: 0.5rem
        .course_img
          width: 2.5rem
          height: 2.5rem
          margin-right: 0.5rem
          img
            width: 100%
            height: 100%
        .course_n_s
          flex: 1
          overflow: hidden
          text-overflow: ellipsis
          white-space: nowrap
          text-align: left
          line-height: 1.25rem
        .course_next
          float: right
          line-height: 2.5rem
          margin-left: 0.5rem
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
