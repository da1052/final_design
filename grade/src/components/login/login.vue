<template>
  <div class="login">
    <div class="login_img">
      <img src="../../assets/default.png" v-show="this.user_img == undefined">
      <img :src="this.user_img" v-show="this.user_img"/>
    </div>
    <div class="login_wrapper">
      <div class="login_item">
        账号<input type="text" maxlength="20" v-model="name"/>
        <div class="hide" v-show="name" @click="clear(0)">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-guanbi"></use>
          </svg>
        </div>
      </div>
      <div class="login_item">
        密码<input type="password" maxlength="16" v-model="password" ref="password"/>
        <div class="hide" v-show="password" @click="show_pas()">
          <svg class="icon" aria-hidden="true" v-show="pas_flag">
            <use xlink:href="#icon-miwen"></use>
          </svg>
          <svg class="icon" aria-hidden="true" v-show="pas_flag == false">
            <use xlink:href="#icon-zitiyulan"></use>
          </svg>
        </div>
        <div class="hide" v-show="password" @click="clear(1)">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-guanbi"></use>
          </svg>
        </div>
      </div>
      <div class="login_btn" @click="check_login()">登录</div>
      <div class="login_text">
        <div class="text_left" @click="re_password()">忘记密码？</div>
        <div class="text_right" @click="add_user()">新用户注册</div>
      </div>
    </div>
    <div class="not_login" @click="back()">暂不登陆</div>
  </div>
</template>

<script>
  import {mapMutations, mapState} from 'vuex'

  export default {
    name: "login",
    data() {
      return {
        name: '',
        password: '',
        pas_flag: true,
        from: null
      }
    },
    methods: {
      ...mapMutations([
        'back_show',
        'set_user',
        'set_login'
      ]),
      clear(item) {
        if(item == 0) {
          this.name = '';
        } else if(item == 1) {
          this.password = '';
        }
      },
      show_pas() {
        this.pas_flag == false ? this.pas_flag = true : this.pas_flag = false;
        this.$refs.password.type == 'text' ? this.$refs.password.type = 'password' : this.$refs.password.type = 'text';
      },
      back() {
        this.$router.back();
      },
      check_login() {
        if(this.name == '') {
          this.$dialog.toast({
            mes: '用户名不能为空！',
            timeout: 1500
          });
        } else if(this.password == '') {
          this.$dialog.toast({
            mes: '密码不能为空！',
            timeout: 1500
          });
        } else {
          this.$http.post('/login',{
            user: this.name,
            password: this.password
          }).then(response => {
            console.log(response);
            if (response.body.length == 0) {
              this.$dialog.toast({
                mes: '用户名或密码错误！',
                timeout: 1500
              });
            } else if(response.body[0].login == true) {
              this.set_user({
                user: response.body[0].user,
                password: response.body[0].password,
                img: response.body[0].img
              });
              this.set_login({
                login_flag: response.body[0].login,
                is_admin: response.body[0].admin
              });
              this.$router.push({
                path: '/'
              });
            }
          }, error => {
            console.log('false');
          })
        }
      },
      re_password() {
        this.$router.replace({
          path: '/Password'
        });
        this.back_show(true);
      },
      add_user() {
        this.$router.replace({
          path: '/NewUser'
        });
        this.back_show(true);
      }
    },
    created() {
      this.back_show(true)
    },
    computed: {
      ...mapState([
        'user',
        'user_password',
        'user_img'
      ])
    }
  }
</script>

<style scoped lang="stylus">
  .login
    position: absolute
    width: 100%
    height: 100%
    background: #ffffff
    /*display: flex*/
    /*justify-content: center*/
    /*align-items: center*/
    .login_img
      height: 20%
      display: flex
      justify-content: center
      align-items: flex-end
      margin-bottom: 2rem
      img
        width: 4rem
        height: 4rem
    .login_wrapper
      width: 100%
      .login_item
        width: 90%
        margin-left: 5%
        border-bottom: 1px solid rgba(102, 102, 102, 0.2)
        height: 2.8rem
        line-height: 3rem
        font-size: 1rem
        text-align: left
        display: flex
        input
          border: none
          height: 100%
          flex: 1
          margin-left: 1rem
        .hide
          font-size: .6rem
          padding: 0 .6rem
      .login_btn
        width: 90%
        margin:1.8rem 5% 1rem 5%
        /*padding-left: 5%*/
        font-size: .9rem
        color: #ffffff
        background-color: #0f9cff
        line-height: 2rem
        border: none
      .login_text
        width: 94%
        padding-left: 6%
        overflow: hidden
        font-size: .8rem
        color: #00bfff
        line-height: 1rem
        .text_left
          float: left
        .text_right
          float: right
    .not_login
      position: absolute
      top: 1rem
      left: 1rem
      font-size: .8rem
      color: #00bfff
</style>
