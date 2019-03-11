<template>
  <div class="user_img">
    <div class="header">
      <div class="back" @click="back()">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-fanhui"></use>
        </svg>
      </div>
      <div class="title">更换头像</div>
    </div>
    <div class="content">
      <fileupload target="http://localhost:3000/user_img" action="POST"  v-on:finish="finishUpload"></fileupload>
    </div>
  </div>
</template>

<script>
  import {mapMutations} from 'vuex'
  import FileUpload from 'vue-simple-upload/dist/FileUpload'

  export default {
    name: "user_img",
    methods: {
      ...mapMutations([
        'back_show'
      ]),
      back() {
        this.back_show(false);
        this.$router.back();
      },
      startUpload(e) {
        // file upload start event
        console.log(e);
      },
      finishUpload(e) {
        // file upload finish event
        console.log(e);
      },
      progress(e) {
        // file upload progress
        // returns false if progress is not computable
        console.log(e);
      }
    },
    components: {
      'fileupload': FileUpload
    },
    created() {
      this.back_show(true);
    }
  }
</script>

<style scoped lang="stylus">
  .user_img
    width: 100%;
    .header
      width: 100%
      height: 2.75rem
      position: fixed
      line-height: 2.75rem
      font-size: 1.2rem
      top: 0
      background-color: #0f9cff
      color: #ffffff

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
    .content
      position: absolute
      top: 2.75rem
</style>
