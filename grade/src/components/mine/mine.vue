<template>
  <div class="mine">
    <div class="m_p">
      <div class="m_photo">
        <div class="photo" v-if="login_flag">
          <img src="../../assets/logo.png" alt="" v-show="this.user_img == null">
          <img :src="user_img" alt="" v-show="user_img" @click="upload_UserImg()">
          <div v-show="user">欢迎，{{user}}</div>
          <fileupload target="http://localhost:3000/user_img" action="POST"  v-on:finish="finishUpload"
            style="width: 5rem; height: 5rem;position: relative;top: -6.3rem;opacity: 0;"></fileupload>
        </div>
        <router-link to="/Login" class="login" v-if="login_flag == false || login_flag == 'false'" tag="div">登录/注册</router-link>
      </div>
      <div class="m_info" @click="show_info('Person', true)">
        <div class="info_left">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-zhanghao"></use>
          </svg>
        </div>
        <div class="info_center">个人资料</div>
        <div class="info_right">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-next"></use>
          </svg>
        </div>
      </div>
      <div class="m_info" @click="show_info('Collection', true)">
        <div class="info_left">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-aixin"></use>
          </svg>
        </div>
        <div class="info_center">我的收藏</div>
        <div class="info_right">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-next"></use>
          </svg>
        </div>
      </div>
      <div class="m_info" @click="show_info('Question', true)">
        <div class="info_left">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-xiaoxi"></use>
          </svg>
        </div>
        <div class="info_center">我的问答</div>
        <div class="info_right">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-next"></use>
          </svg>
        </div>
      </div>
      <div class="m_info" @click="show_info('About', false)">
        <div class="info_left">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-guanyu"></use>
          </svg>
        </div>
        <div class="info_center">关于App</div>
        <div class="info_right">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-next"></use>
          </svg>
        </div>
      </div>
      <div class="m_info" @click="show_info('Setting', false)">
        <div class="info_left">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-shezhi"></use>
          </svg>
        </div>
        <div class="info_center">设置</div>
        <div class="info_right">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-next"></use>
          </svg>
        </div>
      </div>

      <div class="m_btn" v-if="login_flag" @click="logout()">退出登录</div>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
  import {mapMutations, mapState} from 'vuex'
  import Scroll from "../../base/scroll/scroll"
  import FileUpload from 'vue-simple-upload/dist/FileUpload'

  export default {
    components: {
      Scroll
    },
    name: "mine",
    data() {
      return {
        pulldown: true
      }
    },
    created() {
      this.set_head('个人中心');
      this.back_show(false);
      // console.log(this.login_flag);
      // console.log(localStorage.user_img);
      // console.log(localStorage.user);
      // console.log('islogin:'+ localStorage.login_flag);
    },
    methods: {
      ...mapMutations([
        'back_show',
        'set_head',
        'set_user',
        'set_login',
        'set_userImg'
      ]),
      logout() {
        this.set_user({
          user: null,
          password: null,
          img: null});
        this.set_login({
          login_flag: false,
          is_admin: false});
        this.$router.push({
          path: '/login'
        })
      },
      show_info(index, flag) {
        if(flag == false) {
          this.back_show(true);
          this.$router.push({
            path: `${index}`
          })
        } else {
          if(this.login_flag) {
            this.back_show(true);
            this.$router.push({
              path: `${index}`
            })
          } else {
            this.$dialog.toast({
              mes: '您尚未登录！',
              timeout: 1500
            });
          }
        }
      },
      finishUpload(e) {
        var resobj = JSON.parse(e.currentTarget.response);
        let reg=  /^(\s|\S)+(jpg|png|JPG|PNG)+$/;
        let flag = reg.test(resobj.file[0].originalFilename);
        // console.log(resobj);
        if(flag == true) {
          this.$http.post('/user_img_update', {
            imgPath: resobj.file[0].path,
            user: this.user
          }).then(response => {
            if(response.body.flag == true) {
              this.$dialog.toast({
                mes: '头像修改成功！',
                timeout: 1500
              });
              this.set_userImg(resobj.file[0].path);
            } else {
              this.$dialog.toast({
                mes: '修改失败！',
                timeout: 1500
              });
            }
          }, err => {
            console.log(err);
          })
        } else {
          this.$dialog.toast({
            mes: '请选择图片上传（仅支持png/jpg）！',
            timeout: 1500
          });
        }
      }
    },
    computed: {
      ...mapState([
        'login_flag',
        'header_text',
        'user_img',
        'user'
      ])
    },
    components: {
      'fileupload': FileUpload
    }
  }
</script>

<style scoped lang="stylus">
  .mine
    position: absolute
    width: 100%
    height: auto
    top: 2.75rem
    bottom: 3rem
    overflow: hidden
    .m_p
      width: 100%
      height: 100%
      .m_photo
        width: 100%
        height: 40%
        background-color: #fff
        margin-bottom: .8rem
        display: flex
        justify-content: center
        align-items: center
        .photo
          width: 5rem
          height: 5rem
          border: 1px solid rgba(102, 102, 102, 0.2)
          img
            width: 100%
            height: 100%
        .login
          font-size: 1rem
          text-decoration: underline
          letter-spacing: 5px
      .m_info
        position: relative;
        display: flex
        width: 100%
        /*border-bottom: solid 1px rgba(102,102,102,0.2)*/
        background: #ffffff
        font-size: .9rem
        line-height: 2.8rem
        text-align: left
        text-indent: 1rem
        padding-left: .5rem
        &:after
          margin-left: .5rem;
          height: 1px;
          position: absolute;
          z-index: 0;
          bottom: 0;
          left: 0;
          content: "";
          width: 100%;
          background-image: -webkit-linear-gradient(bottom, #ececec 50%, transparent 0);
          background-image: linear-gradient(0deg, #ececec 50%, transparent 0);
        &:last-child:after
          height: 0
        .info_left
          float: left
        .info_center
          flex: 1
        .info_right
          float: right
          padding-right: .5rem
      .m_btn
        margin: .8rem 1rem 0 1rem
        background-color: #08f
        /*opacity: .8*/
        line-height: 3rem
        font-size: .9rem
        color: #ffffff
        -webkit-border-radius: 5px
        -moz-border-radius: 5px
        border-radius: 5px
</style>
