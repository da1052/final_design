<template>
  <div class="password">
    <div class="header">
      <yd-step :current="cur_index">
        <yd-step-item>
          <span slot="bottom">注册用户</span>
        </yd-step-item>
        <yd-step-item>
          <span slot="bottom">绑定手机/邮箱</span>
        </yd-step-item>
        <yd-step-item>
          <span slot="bottom">设置密保</span>
        </yd-step-item>
        <yd-step-item>
          <span slot="bottom">注册完成</span>
        </yd-step-item>
      </yd-step>
    </div>
    <div class="content">
      <div class="content_s" v-show="cur_index == 1">
        <div class="left">请输入用户名：</div>
        <div class="right"><input type="text" v-model="user"></div>
        <div class="left">请输入密码：</div>
        <div class="right"><input type="password" v-model="password"></div>
        <div class="left">确认密码：</div>
        <div class="right"><input type="password" v-model="password_again"></div>
      </div>
      <div class="content_s" v-show="cur_index == 2">
        <div class="left">请输入绑定的手机号：</div>
        <div class="right"><input type="tel" v-model="phone"></div>
        <div class="left">请输入绑定的邮箱：</div>
        <div class="right"><input type="email" v-model="email"></div>
      </div>
      <div class="content_s" v-show="cur_index == 3">
        <div class="left">请输入密保问题：</div>
        <div class="right"><input type="text" v-model="question"></div>
        <div class="left">请输入答案：</div>
        <div class="right"><input type="text" v-model="answer"></div>
      </div>
      <div class="content_s" v-show="cur_index == 4">
        <div class="left">注册成功！</div>
      </div>
    </div>
    <div class="btn" @click="next()">{{btn_text}}</div>
    <span class="btn_forward" v-show="cur_index != 1 " @click="forward()">上一步</span>
    <span class="btn_forward" v-show="cur_index == 1" @click="go_login()">返回登录</span>
  </div>
</template>

<script>
  export default {
    name: "new_user",
    data() {
      return {
        cur_index: 1,
        btn_text: '下一步',
        user: '',
        password: '',
        password_again: '',
        phone: '',
        email: '',
        question: '',
        answer: ''
      }
    },
    methods: {
      next() {
        switch (this.cur_index) {
          case 1:
            if(this.password.length < 6) {
              this.$dialog.toast({
                mes: '密码长度不能小于6位！',
                timeout: 1500
              });
              return ;
            } else if (this.password != this.password_again){
              this.$dialog.toast({
                mes: '两次密码不相同！',
                timeout: 1500
              });
              return ;
            } else {
              this.$http.post('/repeat_user', {
                user: this.user
              }).then( response => {
                console.log(response);
              }, err => {
                console.log(err);
              })
            }
            break;
          case 2:
            let email_re = /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/;
            let phone_re = /^[1][3,4,5,7,8][0-9]{9}$/;
            if (phone_re.test(this.phone) == false) {
              this.$dialog.toast({
                mes: '手机号码格式错误！',
                timeout: 1500
              });
              return;
            } else if(email_re.test(this.email) == false) {
              this.$dialog.toast({
                mes: '邮箱格式错误！',
                timeout: 1500
              });
              return ;
            } else {
              this.$http.post('/repeat_phone_email', {
                phone: this.phone,
                email: this.email
              }).then( response => {
                console.log(response);
              }, err => {
                console.log(err);
              })
            }
            break;
          case 3:
            if(this.question.trim() == '') {
              this.$dialog.toast({
                mes: '密保问题不能为空！',
                timeout: 1500
              });
              return ;
            } else if(this.answer.trim() == '') {
              this.$dialog.toast({
                mes: '答案不能为空！',
                timeout: 1500
              });
              return ;
            } else {
              this.$http.post('/add_user', {
                user: this.user,
                password: this.password,
                phone: this.phone,
                email: this.email,
                question: this.question,
                answer: this.answer
              }).then( response => {
                console.log(response);
              }, err => {
                console.log(err);
              })
            }
            break;
          case 4:
            break;
        }
        this.cur_index += 1;
      },
      forward() {
        this.cur_index -= 1;
      },
      go_login() {
        this.$router.push({
          path: '/Login'
        });
      }
    },
    watch: {
      cur_index() {
        this.btn_text = this.cur_index == 4 ? '返回登录' : '下一步';
      }
    }
  }
</script>

<style scoped lang="stylus">
  .password
    .header
      margin: 1.5rem 0 1rem 0
    .content
      font-size: .9rem
      .content_s
        /*padding-left: 2rem*/
        line-height: 2rem
        text-align: left
        .left
          padding: 0 2rem
        .right
          height: 2rem
          padding: 0 2rem
          background: #ffffff
          input
            border: none
            width: 100%
            height: 100%
    .btn
      margin: 1.5rem 2rem .5rem
      width: calc(100% - 4rem)
      line-height: 2rem
      color: #ffffff
      background: #0f9cff
    .btn_forward
      color: #0f9cff
</style>
