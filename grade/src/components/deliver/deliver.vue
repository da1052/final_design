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
  // import 'https://cdn.bootcss.com/font-awesome/4.6.3/css/font-awesome.min.css'

  const editor = new VueHtml5Editor({
    showModuleName: true,
    language: "zh-cn",
    i18n: {
      "zh-cn": {
        "align": "对齐方式",
        "image": "图片",
        "list": "列表",
        "link": "链接",
        "unlink": "去除链接",
        "table": "表格",
        "font": "文字",
        "full screen": "全屏",
        "text": "排版",
        "eraser": "格式清除",
        "info": "关于",
        "color": "颜色",
        "please enter a url": "请输入地址",
        "create link": "创建链接",
        "bold": "加粗",
        "italic": "倾斜",
        "underline": "下划线",
        "strike through": "删除线",
        "subscript": "上标",
        "superscript": "下标",
        "heading": "标题",
        "font name": "字体",
        "font size": "文字大小",
        "left justify": "左对齐",
        "center justify": "居中",
        "right justify": "右对齐",
        "ordered list": "有序列表",
        "unordered list": "无序列表",
        "fore color": "前景色",
        "background color": "背景色",
        "row count": "行数",
        "column count": "列数",
        "save": "确定",
        "upload": "上传",
        "progress": "进度",
        "unknown": "未知",
        "please wait": "请稍等",
        "error": "错误",
        "abort": "中断",
        "reset": "重置"
      }
    },
    image:{
      sizeLimit: 512 * 1024,
      upload: {
        url: 'http://127.0.0.1:3000/img',
        headers: {},
        params: {},
        fieldName: 'file'
      },
      uploadHandler(res) {
        var json = JSON.parse(res);
        // console.log(json.file[0].path);
        if(!json) {
          console.log(json.error);
        } else {
          // console.log(json);
          return json.file[0].path;
        }
        // return json;
      }
    },
    visibleModules: [
      "link",
      "unlink",
      "image",
      "undo"
    ],
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
        this.editor_height = this.$refs.deliver.offsetHeight - 180;  //228
      },
      methods: {
        ...mapMutations([
          'back_show'
        ]),
        back() {
          this.back_show(false);
          this.$router.back();
        },
        updateData(data = '') {
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
          if(this.title == '') {
            this.$dialog.toast({
              mes: '标题不能为空！',
              timeout: 1500
            });
          } else if(content_temp == '') {
            this.$dialog.toast({
              mes: '内容不能为空！',
              timeout: 1500
            });
          } else {
            if(!this.content.startsWith('<div>')) {
              this.content = `<div>${this.content}</div>`
            }
            this.$http.post('/issue', {
              title: this.title,
              content: this.content,
              user: this.user,
              img: img,
              time: time,
              user_img: this.user_img
            }).then(response => {
              console.log(response)
              if(response.body.upload == true) {
                this.$dialog.toast({
                  mes: '发表成功！',
                  timeout: 1500
                });
                setTimeout(() => {
                  this.$router.push({
                    path: '/Interlocution'
                  })
                }, 2000)
              }
            }, error => {
              console.log('false');
            })
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
    position: fixed
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
    height: calc(100%-2.75rem)
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
