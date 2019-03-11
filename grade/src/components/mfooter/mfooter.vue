<template>
  <div class="footer" v-show="back_flag == false">
    <ul>
      <!--资讯-->
      <router-link tag="li" to="/Information" active-class="active" active >
        <div>
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-zixun"></use>
          </svg>
        </div>
        <div class="footer-text">资讯</div>
      </router-link>
      <!--教程-->
      <router-link tag="li" to="/Course" active-class="active" >
        <div>
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-jiaocheng"></use>
          </svg>
        </div>
        <div class="footer-text">教程</div>
      </router-link>
      <!--加号-->
      <router-link tag="li" to="/Deliver" style="font-size: 3.43rem; margin-top: -1.02rem" >
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-comiisjiahao"></use>
        </svg>
      </router-link>
      <!--问答-->
      <router-link tag="li" to="/Interlocution" active-class="active" >
        <div>
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-wenda"></use>
          </svg>
        </div>
        <div class="footer-text">问答</div>
      </router-link>
      <!--我的-->
      <router-link tag="li" to="/Mine" active-class="active" >
        <div>
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-wode"></use>
          </svg>
        </div>
        <div class="footer-text">我的</div>
      </router-link>
    </ul>
  </div>
</template>

<script>
  import {mapState} from 'vuex'

  export default {
    name: "mfooter",
    computed: {
      ...mapState([
        'back_flag'
      ])
    }
  }
</script>

<style scoped lang="stylus">
  ul
    width: 100%
  /*height: 44px*/
  /*padding-top: 6px*/

  li
    float: left
    width: 20%
    height: 3rem
    /*margin-top: 5px*/
    font-size: 1.3rem
    -webkit-tap-highlight-color:transparent;
  .footer-text
    font-size: 0.5rem

  .footer
    position: fixed
    /*top: 0*/
    left: 0
    right: 0
    bottom: 0
    width: 100%
    height: 3rem
    z-index: 150
    box-shadow: 0px -1px 1px gray
    background-color: #fff
    .active
      background-color: none
      color: deepskyblue

  .m_icon
    height: 25px
</style>
