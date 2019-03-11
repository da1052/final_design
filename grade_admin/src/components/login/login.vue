<template>
  <div class="login_p">
    <div class="login">
      <el-form label-position="right" label-width="5rem" :model="login">
        <el-form-item label="用户名">
          <el-input v-model="login.name"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="login.password" type="password"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="setlogin()">登录</el-button>
          <el-button>取消</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
  export default {
    name: "login",
    data() {
      return {
        login: {
          name: '',
          password: ''
        }
      }
    },
    methods: {
      setlogin() {
        this.$http.post('/admin_login', {
          user: this.login.name,
          password: this.login.password
        }).then(response => {
          if(response.body.flag == true) {
            this.$router.push({
              path: '/Admin'
            })
          } else {
            this.$message({
              message: '用户名或密码错误',
              type: 'error',
              center: true
            });
          }
        }, err => {
          console.log(err);
        })
      }
    }
  }
</script>

<style scoped lang="stylus">
  .login_p
    position: absolute
    display: flex
    width: calc(100% - 8px)
    height: calc(100% - 8px)
    justify-content: center
    align-items:  center
    .login
      width: 32rem
      padding: 1.5rem 1.5rem 0rem 0rem
      border: solid 1px #ebebeb
      &:hover
        box-shadow: 0 0 8px 0 rgba(232, 237, 250, .6),0 2px 4px 0 rgba(232, 237, 250, .5)
</style>
