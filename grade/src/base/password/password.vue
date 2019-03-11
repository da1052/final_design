<template>
  <div class="password">
    <div class="header">
      <yd-step :current="cur_index">
        <yd-step-item>
          <span slot="bottom">手机验证</span>
        </yd-step-item>
        <yd-step-item>
          <span slot="bottom">密保验证</span>
        </yd-step-item>
        <yd-step-item>
          <span slot="bottom">修改密码</span>
        </yd-step-item>
        <yd-step-item>
          <span slot="bottom">修改完成</span>
        </yd-step-item>
      </yd-step>
    </div>
    <div class="content">
      <div class="content_s" v-show="cur_index == 1">
        <div class="left">请输入绑定的手机号：</div>
        <div class="right"><input type="tel" v-model="phone"></div>
      </div>
      <div class="content_s" v-show="cur_index == 2">
        <div class="left">{{question}}</div>
        <div class="right"><input type="text" v-model="answer"></div>
      </div>
      <div class="content_s" v-show="cur_index == 3">
        <div class="left">新密码：</div>
        <div class="right"><input type="password" v-model="new_password"></div>
      </div>
      <div class="content_s" v-show="cur_index == 4">
        <div class="left">密码修改成功！</div>
      </div>
    </div>
    <div class="btn" @click="next()">{{btn_text}}</div>
    <span class="btn_forward" v-show="cur_index != 1" @click="forward()">上一步</span>
    <span class="btn_forward" v-show="cur_index == 1" @click="go_login()">返回登录</span>
  </div>
</template>

<script>
  export default {
    name: "password",
    data() {
      return {
        cur_index: 1,
        btn_text: '下一步',
        phone: '',
        question: '',
        answer: '',
        new_password: '',
        p_answer: '',
        password: ''
      }
    },
    methods: {
      next() {
        switch (this.cur_index) {
          case 1:
            let phone_re = /^[1][3,4,5,7,8][0-9]{9}$/;
            if (phone_re.test(this.phone) == false) {
              this.$dialog.toast({
                mes: '手机号码格式错误！',
                timeout: 1500
              });
              return ;
            } else {
              this.$http.post('/password', {
                phone: this.phone
              }).then( response => {
                console.log(response);
                this.question = response.body[0].question;
                this.p_answer = response.body[0].answer;
                this.password = response.body[0].password;
              }, err => {
                console.log(err);
              })
            }
            break ;
          case 2:
            if(this.answer.trim() != this.p_answer) {
              this.$dialog.toast({
                mes: '答案错误！',
                timeout: 1500
              });
              return ;
            }
            break;
          case 3:
            if(this.new_password.trim() == '') {
              this.$dialog.toast({
                mes: '密码不能为空！',
                timeout: 1500
              });
              return ;
            } else if(this.new_password.length < 6){
              this.$dialog.toast({
                mes: '密码长度不能小于6！',
                timeout: 1500
              });
              return ;
            } else if(this.new_password == this.password) {
              this.$dialog.toast({
                mes: '新密码与旧密码相同！',
                timeout: 1500
              });
              return ;
            } else {
              this.$http.post('/new_password', {
                password: this.new_password,
                phone: this.phone
              }).then(response => {
                console.log(response);
              }, err=> {
                console.log(err);
              })
            }
            break;
          case 4:
            this.$router.replace({
              path: '/Login'
            })
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
