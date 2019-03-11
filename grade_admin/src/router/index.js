import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Login from '@/components/login/login'
import Admin  from '@/components/admin/admin'
import Test from '@/components/test/test'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/Login'
    },
    {
      path: '/Login',
      component: Login
    },
    {
      path: '/Admin',
      component: Admin
    },
    {
      path: '/Test',
      component: Test
    }
  ]
})
