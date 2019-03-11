<template>
  <div>
    <scroll class="course" :data="data_classify" :pulldown="pulldown"  v-show="back_flag == false">
      <ul>
        <li v-for="item in data_classify">
          <h3>{{item.category}}</h3>
          <ul>
            <li v-for="item_s in item.detail" class="course_detail_p" @click="setDetail(item_s)">
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
    <!--<course-wrapper :data_course="data_course_detail" v-show="back_flag"></course-wrapper>-->
    <router-view :data_course="data_course_detail" @back_show="back_show_s()"></router-view>
  </div>
</template>

<script>
  import Scroll from '../../base/scroll/scroll'
  import CourseWrapper from '../../base/course_wrapper/course_wrapper'
  import {mapState, mapMutations} from 'vuex'

  export default {
    components: {
      Scroll,
      CourseWrapper
    },
    name: "course",
    data() {
      return {
        data_course: [],
        data_classify: [],
        pulldown: true,
        data_course_detail: {}
      }
    },
    computed: {
      ...mapState([
        'back_flag',
        'header_text'
      ])
    },
    created() {
      this.set_head('教程');
      this.back_show(false);
      this.$http.get('/classify').then(response => {
        // console.log(response);
        this.data_classify = response.data;
      }, error => {
        console.log('false');
      })
      this.$http.get('/course').then(response => {
        // console.log(response);
        this.data_course = response.data;
      }, error => {
        console.log('false');
      })

    },
    methods: {
      ...mapMutations([
        'back_show',
        'set_head'
      ]),
      setDetail(data) {
        // console.log(data);
        this.data_course_detail = data;
        this.$router.push({
          path: `/Course/${data.name}`
        })
        this.back_show(true);
      },
      back_show_s() {
        // console.log('1');
        this.back_show(false);
      }
    }
  }
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
      line-height: 2.0rem
    ul
      .course_detail_p
        width: 100%
        border-bottom: 1px solid rgba(102, 102, 102, 0.2)
        &:last-child
          border-bottom: none
        .course_detail
          width: 100%
          display: flex
          padding: .5rem
          .course_img
            width: 2.5rem
            height: 2.5rem
            margin-right: .5rem
            img
              width: 100%
              height: 100%
          .course_n_s
            flex: 1
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            text-align: left
            line-height: 1.25rem
          .course_next
            float: right
            line-height: 2.5rem
            margin-left: .5rem
</style>
