import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'

import Course from 'components/course/course'
import Deliver from 'components/deliver/deliver'
import Information from 'components/information/information'
import Interlocution from 'components/interlocution/interlocution'
import CourseWrapper from 'base/course_wrapper/course_wrapper'
import Mine from 'components/mine/mine'
import Login from 'components/login/login'
import InteWrapper from 'base/inte_wrapper/inte_wrapper'
import Person from 'base/person/person'
import Collection from 'base/collection/collection'
import Question from 'base/question/question'
import About from 'base/about/about'
import Setting from 'base/setting/setting'
import Password from 'base/password/password'
import NewUser from 'base/new_user/new_user'
import UserImg from 'base/user_img/user_img'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/Information'
    },
    {
      path: '/Course',
      component: Course,
      children: [
        {
          path: ':id',
          component: CourseWrapper
        }
      ]
    },
    {
      path: '/Deliver',
      component: Deliver
    },
    {
      path: '/Information',
      component: Information
    },
    {
      path: '/Interlocution',
      component: Interlocution,
      children: [
        {
          path: ':id',
          component: InteWrapper
        }
      ]
    },
    {
      path: '/Mine',
      component: Mine
    },
    {
      path: '/Login',
      component: Login
    },
    {
      path: '/Person',
      component: Person
    },
    {
      path: '/Collection',
      component: Collection,
      children: [
        {
          path: ':name',
          component: CourseWrapper
        }
      ]
    },
    {
      path: '/Question',
      component: Question,
      children: [
        {
          path: ':id',
          component: InteWrapper
        }
      ]
    },
    {
      path: "/About",
      component: About
    },
    {
      path: '/Setting',
      component: Setting
    },
    {
      path: '/Password',
      component: Password
    },
    {
      path: '/NewUser',
      component: NewUser
    },
    {
      path: '/UserImg',
      component: UserImg
    }
  ]
})
