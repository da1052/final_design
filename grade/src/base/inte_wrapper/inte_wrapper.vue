<template>
  <div class="inte_wrapper">
    <div class="header">
      <div class="back" @click="back()">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-fanhui"></use>
        </svg>
      </div>
      <div class="title">{{data_inte_detail[0].title}}</div>
    </div>
    <scroll :data="data_inte_detail" :pulldown="pulldown" class="content_p" ref="contentp">
      <div class="content" ref="content">
        <div class="title">{{data_inte_detail[0].title}}</div>
        <div class="sub_info">
          <div class="info i_img">
            <img :src="data_inte_detail[0].user_img">
          </div>
          <div class="info">{{data_inte_detail[0].user}}</div>
          <div class="info">{{data_inte_detail[0].time.substr(0, 10)}}</div>
        </div>
        <div class="sub" v-html="data_inte_detail[0].detail" ref="sub"></div>
        <div class="comment">
          <div class="comment_sub">
            <yd-tab v-model="tab">
              <yd-tab-panel label="评论列表" style="font-size: .9rem">
                <ul>
                  <li v-for="item in comment_list" :key="item.comment_id">
                    <div class="csub">
                      <div class="sub_left">
                        <div>
                          <img :src="item.user_img">
                        </div>
                      </div>
                      <div class="sub_right">
                        <div class="csub_info">
                          <div class="info_nt">
                            <div class="info_name">{{item.commenter}}</div>
                            <div class="info_time">{{item.time.substring(0, 10)}}</div>
                          </div>
                          <div
                            class="info_reply"
                            v-show="item.reply_user != ''"
                          >回复&nbsp;&nbsp;{{item.reply_user}}：</div>
                          <div class="reply_text" v-show="item.reply_detail">{{item.reply_detail}}</div>
                          <div class="info_text">{{item.comment_detail}}</div>
                        </div>
                        <div class="sub_icon">
                          <svg
                            class="icon"
                            aria-hidden="true"
                            @click="set_reply(item.commenter, item.comment_detail, item.comment_id)"
                          >
                            <use xlink:href="#icon-huifu"></use>
                          </svg>
                        </div>
                      </div>
                    </div>
                  </li>
                </ul>
              </yd-tab-panel>
              <yd-tab-panel label="回复" style="font-size: .9rem">
                <div class="reply">
                  <!--<div class="reply_name" v-show="reply_user">回复  {{reply_user}}：</div>-->
                  <div class="reply_detail">
                    <textarea rows="6" style="width: 100%;" v-model="comment"></textarea>
                  </div>
                  <div class="reply_btn" @click="send_comment()">确定</div>
                </div>
              </yd-tab-panel>
            </yd-tab>
          </div>
        </div>
      </div>
    </scroll>
    <yd-popup v-model="popup_flag" position="bottom" height="50%">
      <div class="reply">
        <div class="reply_name">回复 {{reply_user}}：</div>
        <div class="reply_text">{{reply_detail}}</div>
        <div class="reply_detail">
          <textarea rows="6" style="width: 100%;" v-model="comment"></textarea>
        </div>
        <div class="reply_btn" @click="send_comment()">确定</div>
      </div>
    </yd-popup>
  </div>
</template>

<script>
import Scroll from "../scroll/scroll";
import { mapState, mapMutations } from "vuex";

export default {
  components: {
    Scroll
  },
  name: "inte_wrapper",
  data() {
    return {
      pulldown: true,
      comment: null,
      tab: 0,
      l_flag: false,
      reply_user: null,
      comment_list: [],
      reply_detail: null,
      popup_flag: false,
      comment_id: null
    };
  },
  props: {
    data_inte_detail: Array
  },
  methods: {
    back() {
      this.$router.back();
      this.$emit("back_show");
      // this.back_show(false);
    },
    ...mapMutations(["back_show"]),
    send_comment() {
      if (this.comment == null) {
        this.$dialog.toast({
          mes: "内容不能为空！",
          timeout: 1500
        });
      } else {
        this.$http
          .post("comment", {
            id: this.data_inte_detail[0].id,
            commenter: this.user,
            time: new Date().toLocaleDateString(),
            detail: this.comment,
            user_img: this.user_img,
            reply_user: this.reply_user == null ? null : this.reply_user,
            reply_detail: this.reply_detail == null ? null : this.reply_detail
          })
          .then(
            response => {
              if (response.body.flag == true) {
                this.$dialog.toast({
                  mes: "回复成功！",
                  timeout: 1500
                });
                this.comment = null;
                this.popup_flag = false;
                this.$http.get("/inte/" + this.data_inte_detail[0].id).then(
                  response => {
                    this.comment_list = response.body;
                  },
                  error => {
                    console.log("false");
                  }
                );
              }
            },
            error => {
              console.log("false");
            }
          );
      }
    },
    set_reply(user, detail, c_id) {
      if (user == this.user) {
        this.$dialog.toast({
          mes: "不能回复自己！",
          timeout: 1500
        });
      } else {
        this.reply_user = user;
        this.reply_detail = detail;
        this.popup_flag = true;
        // this.tab = 1;
      }
      this.comment_id = c_id;
    }
  },
  computed: {
    ...mapState(["login_flag", "user", "user_img"])
  },
  mounted() {
    // console.log(this.data_inte_detail);
    if (this.login_flag) {
      setTimeout(() => {
        this.$refs.content.style.height =
          this.$refs.content.offsetHeight > this.$refs.contentp.$el.offsetHeight
            ? this.$refs.content.offsetHeight
            : this.$refs.contentp.$el.offsetHeight + 5 + "px";
      }, 100);
    }
  },
  created() {
    if (this.login_flag == false) {
      this.$router.replace({
        path: "/Login"
      });
    }
    this.$http.get("/inte/" + this.data_inte_detail[0].id).then(
      response => {
        this.comment_list = response.body;
      },
      error => {
        console.log("false");
      }
    );
  },
  watch: {
    tab() {
      this.comment = null;
      this.reply_detail = null;
    },
    comment_id() {
      this.comment = null;
    }
  }
};
</script>

<style scoped lang="stylus">
.inte_wrapper
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
      left: 0.5rem
      -webkit-tap-highlight-color: rgba(0,0,0,0)
      -webkit-tap-highlight-color: transparent
    .title
      font-size: 1rem
      line-height: 2.75rem
      margin: 0 25%
      overflow: hidden
      text-overflow: ellipsis
      white-space: nowrap
  .content_p
    position: absolute
    top: 2.75rem
    background: #FFFF
    z-index: 140
    width: 100%
    height: calc(100% - 2.75rem)
    .content
      position: absolute
      /* top: 2.75rem */
      width: 100%
      height: auto
      padding: 0 1rem
      font-size: 0.95rem
      line-height: 2.2rem
      text-align: left
      .title
        font-size: 1.3rem
        line-height: 2rem
        font-weight: 600
      .sub_info
        height: 2rem
        line-height: 2rem
        font-size: 0.8rem
        overflow: hidden
        margin: 0.5rem 0
        .info
          float: left
          margin-right: 1rem
        .i_img
          width: 2rem
          margin-right: 0.5rem
          img
            width: 100%
            // border-radius: 50%
      .sub
        margin-bottom: 1rem
      .sub
        >>>img
          width: 100%
      .comment
        width: 100%
        position: -webkit-sticky
        position: sticky
        top: 3rem
        .comment_title
          background-color: #fff
        .comment_sub
          width: 100%
          ul
            min-height: 15rem
            .csub
              overflow: hidden
              display: flex
              padding-top: 0.5rem
              .sub_left
                width: 3rem
                display: flex
                align-items: top !important
                justify-content: center !important
                img
                  width: 1.3rem
                  line-height: 1rem
                  text-align: center
                  padding-top: 0.5rem
              .sub_right
                flex: 1
                display: flex
                overflow: hidden
                padding-bottom: 0.4rem
                border-bottom: 1px solid rgba(102, 102, 102, 0.2)
                .csub_info
                  flex: 1
                  .info_nt
                    overflow: hidden
                    margin-bottom: 0.2rem
                    .info_name
                      width: 4rem
                      line-height: 1.3rem
                      font-size: 0.9rem
                      float: left
                      margin-right: 1rem
                    .info_time
                      line-height: 1rem
                      font-size: 0.7rem
                      margin-top: 0.2rem
                  .info_reply
                    color: deepskyblue
                  .reply_text
                    height: 1.2rem
                    line-height: 1.2rem
                    background: rgba(0, 0, 0, 0.3)
                    color: #0000 0
                    text-overflow: ellipsis
                    overflow: hidden
                    /* white-space: nowrap */
                    margin-bottom: 0.5rem
                    font-size: 0.8rem
                    margin-left: 0.7rem
                  .info_text
                    line-height: 1.3rem
                    font-size: 0.9rem
                .sub_icon
                  width: 2.5rem
                  float: right
                  display: flex
                  justify-content: center
                  align-items: top
                  padding-top: 0.3rem
            li
              &:last-child
                .sub_right
                  border-bottom: none
          .reply
            padding: 0
            .reply_detail
              margin-top: 1rem
            .reply_btn
              width: 5rem
              float: right
              text-align: center
          .not_reply
            min-height: 15rem
            width: 100%
            display: flex
            justify-content: center
            align-items: center
            letter-spacing: 0.2rem
            span
              text-decoration: underline
              color: #0f9cff
          .yd-tab
            position: -webkit-sticky
            position: sticky
            top: 3rem
      .comment
        >>>.yd-tab-nav-item
          line-height: 2rem !important
          font-size: 0.9rem
  .reply
    padding: 1rem
    font-size: 0.9rem
    line-height: 2rem
    text-align: left
    .reply_text
      height: 2rem
      background: rgba(0, 0, 0, 0.3)
      color: #0000 0
      text-overflow: ellipsis
      overflow: hidden
      white-space: nowrap
      margin-bottom: 0.5rem
    .reply_btn
      width: 5rem
      float: right
      text-align: center
      line-height: 2rem
      font-size: 1rem
</style>
