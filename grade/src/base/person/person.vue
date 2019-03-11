<template>
  <div class="person">
    <div class="header">
      <div class="back" @click="back()">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-fanhui"></use>
        </svg>
      </div>
      <div class="title">个人资料</div>
    </div>
    <scroll class="person_s" :pulldown="pulldown" :data="data_person">
      <div class="person_g">
        <div class="person_detail">
          <div class="p_left">年龄</div>
          <div class="p_right"><input type="tel" v-bind:readonly="isReadOnly" maxlength="3" v-model="age"></div>
        </div>
        <div class="person_detail">
          <div class="p_left">性别</div>
          <div class="p_right">
            <select name="" id="" v-model="sex" v-bind:disabled="isReadOnly">
              <option>男</option>
              <option>女</option>
              <option>保密</option>
            </select>
          </div>
        </div>
        <div class="person_detail">
          <div class="p_left">邮箱</div>
          <div class="p_right"><input type="email" v-bind:readonly="isReadOnly" v-model="email"></div>
        </div>
        <div class="person_detail">
          <div class="p_left">手机号</div>
          <div class="p_right"><input type="number" v-bind:readonly="isReadOnly" v-model="phone"></div>
        </div>
        <div class="person_btn">
          <div class="btn" @click="set_readonly()">{{btn}}</div>
        </div>
      </div>
    </scroll>
  </div>
</template>

<script>
  import {mapMutations, mapState} from 'vuex'
  import Scroll from '../scroll/scroll'

  export default {
    name: "person",
    data() {
      return {
        pulldown: false,
        data_person: [],
        isReadOnly: true,
        btn: '编辑',
        age: null,
        sex: null,
        email: null,
        phone: null
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
      set_readonly() {
        if(this.btn == '确定') {
          this.$dialog.confirm({
            title: '',
            mes: '修改后的手机号码和邮箱将作为您的联系方式，是否确定修改？',
            opts: [
              {
                txt: '否',
                color: false,
                callback: () => {
                  this.isReadOnly = false;
                  this.btn = '确定';
                  this.set_readonly();
                }
              },
              {
                txt: '是',
                color: true,
                callback: () => {
                  let email_re = /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/;
                  let phone_re = /^[1][3,4,5,7,8][0-9]{9}$/;
                  if(email_re.test(this.email) == false) {
                    this.$dialog.toast({
                      mes: '邮箱格式错误！',
                      timeout: 1500
                    });
                  } else if (phone_re.test(this.phone) == false) {
                    this.$dialog.toast({
                      mes: '手机号码格式错误！',
                      timeout: 1500
                    });
                  } else if(this.age == '') {
                    this.$dialog.toast({
                      mes: '年龄不能为空！',
                      timeout: 1500
                    });
                  } else {
                    this.$http.post('/personUpdate', {
                      user: this.user,
                      age: this.age,
                      sex: this.sex,
                      email: this.email,
                      phone: this.phone
                    }).then( response => {
                      if(response.body.flag == true) {
                        this.$dialog.toast({
                          mes: '修改成功！',
                          timeout: 1500
                        });
                        this.isReadOnly = true;
                        this.btn = '编辑';
                      }
                    }, error => {
                      console.log(error)
                    })
                  }
                }
              }
            ]
          })
        } else {
          this.isReadOnly = !this.isReadOnly;
          this.btn = this.isReadOnly == true ? '编辑' : '确定';
        }
      }
    },
    components: {
      Scroll
    },
    computed: {
      ...mapState([
        'user'
      ])
    },
    created() {
      this.$http.post('person', {
        user: this.user
      }).then(response => {
        this.data_person = response.body;
        this.age = response.body[0].age;
        this.sex = response.body[0].sex;
        this.email = response.body[0].email;
        this.phone = response.body[0].phone;
        // console.log(response);
      }, error => {
        console.log('false');
      })
    }
  }
</script>

<style scoped lang="stylus">
  .person
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
      .title
        font-size: 1rem
        line-height: 2.75rem
        margin: 0 25%
        overflow: hidden
        text-overflow: ellipsis
        white-space: nowrap
    .person_s
      position: absolute
      width: 100%
      height: 100%
      top: 2.75rem
      overflow: hidden
      background: #ffffff
      .person_g
        padding: 0 1rem
        .person_detail
          overflow: hidden
          height: 2.5rem
          line-height: 2.5rem
          font-size: .9rem
          border-bottom: 1px solid rgba(102,102,102,0.2)
          .p_left
            float: left
          .p_right
            float: right
            width: 50%
            text-align: left
            /*text-indent: 1rem*/
            input
              border: none
              text-align: left
            select
              width: 80%
              border: none
        .person_btn
          margin-top: 1rem
          display: flex
          justify-content: center
          align-items: center
          .btn
            background: #0f9cff
            line-height: 2.5rem
            width: 80%
            font-size: .9rem
            color: #ffffff
</style>
