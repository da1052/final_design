<template>
    <div  v-if="back_flag">
      <div class="header">
        <div class="back" @click="back()">取消</div>
      </div>
      <div class="deliver" ref="deliver">
        <div class="header_edit">
          <input type="text" placeholder="标题（限制字数50字）" v-model="title">
        </div>
        <editor :content="content" :height="editor_height" :auto-height="false" @change="updateData"></editor> 
        <div class="btn_ok" @click="issue()">确定发布</div>
      </div>
    </div>

</template>

<script>
  import {mapMutations, mapState} from 'vuex'
  import VueHtml5Editor from 'vue-html5-editor'

  const editor = new VueHtml5Editor({
    showModuleName: true,
    language: "zh-cn",
    // image:{
    //   sizeLimit: 512 * 1024,
    //   upload: {
    //     url: '127.0.0.1:3000/img',
    //     headers: {},
    //     params: {},
    //     fieldName: 'file'
    //   },
    //   uploadHandler(res) {
    //     var json = JSON.parse(res);
    //     // console.log(json.file[0].path);
    //     if(!json) {
    //       console.log(json.error);
    //     } else {
    //       // console.log(json);
    //       return json.file[0].path;
    //     }
    //     // return json;
    //   }
    // },
    visibleModules: [
        "link",
        "unlink",
        "image",
        "undo"
    ]
  })

    export default {
      name: "deliver",
      data() {
        return {
          title: '',
          content: '',
          editor_height: 400
        }
      },
      created() {
        this.back_show(true);
        if(this.login_flag == false) {
          this.$router.replace({
            path: '/Login'
          })
        }
      },
      mounted() {
        // console.log(this.$route.query.content);
        this.editor_height = this.$refs.deliver.offsetHeight - 180;  //228
        this.content = this.$route.query.content == '' ? this.content : this.$route.query.content;
        this.title = this.$route.query.title == '' ? this.title : this.$route.query.title;
      },
      methods: {
        ...mapMutations([
          'back_show'
        ]),
        back() {
          this.back_show(false);
          this.$router.back();
          this.$route.params.content = '';
          this.$route.params.title = '';
        },
        updateData(data = '') {
          // console.log(data);
          let c1 = data.replace(/<img width="100%"/g, "<img");
          let c2 = c1.replace(/<img/g, '<img width="100%"');
          this.content = c2;
        },
        get_img(str){
          var imgReg = /<img.*?(?:>|\/>)/gi;
          var srcReg = /src=[\'\"]?([^\'\"]*)[\'\"]?/i;
          var arr = str.match(imgReg);
          // console.log(arr[0].match(srcReg)[1]);
          return arr == undefined ? '' : arr[0].match(srcReg)[1];
          // for (var i = 0; i < arr.length; i++) {
          //   var src = arr[i].match(srcReg);
          //   //获取图片地址
          //   console.log('图片地址'+(i+1)+'：'+src[1]);
          // }
        },
        issue() {
          let content_temp = this.content;
          content_temp = this.content.startsWith('<img') ? this.content : content_temp.replace(/<.*?>/ig,""); //判断是否开头便是图片（因图片无法识别为文字）
          let img = this.get_img(this.content);
          let time = new Date().toLocaleDateString();
          // console.log(this.title);
          // console.log(content_temp);
          if(this.title == '' || this.title == undefined) {
            this.$dialog.toast({
              mes: '标题不能为空！',
              timeout: 1500
            });
            return;
          } else if(content_temp == '' || content_temp == undefined) {
            this.$dialog.toast({
              mes: '内容不能为空！',
              timeout: 1500
            });
            return;
          } else {
            if(!this.content.startsWith('<div>')) {
              this.content = `<div>${this.content}</div>`
            }
            console.log(this.$route.query.content);
            if((this.$route.query.content == '' || this.$route.query.content == undefined) && (this.$route.title == '' || this.$route.title == undefined)) {
              this.$http.post('/issue', {
                title: this.title,
                content: this.content,
                user: this.user,
                img: img,
                time: time,
                user_img: this.user_img
              }).then(response => {
                // console.log(response)
                if(response.body.upload == true) {
                  this.$dialog.toast({
                    mes: '发表成功！',
                    timeout: 1500
                  });
                  this.$route.params.content = '';
                  this.$route.params.title = '';
                  setTimeout(() => {
                    this.$router.push({
                      path: '/Interlocution'
                    })
                  }, 2000)
                }
              }, error => {
                console.log(error);
              })
            } else {
              this.$http.post('/admin_updateInte', {
                title: this.title,
                detail: this.content,
                user: this.user,
                img: img,
                id: this.$route.query.id
              }).then(response => {
                // console.log(response)
                if(response.body.flag == true) {
                  this.$dialog.toast({
                    mes: '修改成功！',
                    timeout: 1500
                  });
                  this.$route.params.content = '';
                  this.$route.params.title = '';
                  setTimeout(() => {
                    this.$router.push({
                      path: '/Interlocution'
                    })
                  }, 2000)
                }
              }, error => {
                console.log(error);
              })
            }
          }
        }
      },
      computed: {
        ...mapState([
          'back_flag',
          'login_flag',
          'user',
          'password',
          'user_img'
        ])
      },
      components: {
        editor
      }
    }
</script>

<style scoped lang="stylus">
  .header
    width: 100%
    height: 2.75rem
    position: absolute
    line-height: 2.75rem
    font-size: .9rem
    top: 0
    background-color: #0f9cff
    color: #ffffff
    z-index: 150
    .back
      float: left
      position: absolute
      left: 1rem
  .deliver
    position: absolute
    width: 100%
    height: 100%
    top: 2.75rem
    overflow: hidden
    padding: 1rem
    background-color: #fff
    .header_edit
      background: #FFFFFF
      border-radius: 5px
      height: 2.5rem
      line-height: 2.5rem
      font-size: 1.4rem
      border: 1px solid #ddd
      border-bottom: none
      padding:0 10px
      input
        width: 100%
        height: 100%
        border: none
    .btn_ok
      position: fixed
      bottom: 1rem
      left: 0
      right: 0
      margin: 0 1rem
      line-height: 3rem
      color: #ffffff
      font-size: 1rem
      background-color: #08f
      border-radius: 5px
</style>
