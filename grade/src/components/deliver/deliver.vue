<template>
    <div v-if="back_flag">
      <div class="header">
        <div class="back" @click="back()">取消</div>
        <div class="issue" @click="issue()">发表</div>
      </div>
      <div class="deliver" ref="deliver">
        <div style="height: 100%">
          <div class="header_edit">
            <input type="text" placeholder="标题（限制字数50字）" v-model="title">
          </div>
          <!-- <editor :content="content" :height="500"></editor> -->
          <quill-editor v-model="content" :options="editorOption" @change="onEditorChange($event)"></quill-editor>
        </div>
      </div>
    </div>
  
</template>

<script>
import { mapMutations, mapState } from "vuex";
// import vueHtml5Editor from "vue-html5-editor";

import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";
import { quillEditor, Quill } from "vue-quill-editor";
import { container, ImageExtend, QuillWatch } from "quill-image-extend-module";

Quill.register("modules/ImageExtend", ImageExtend);

export default {
  name: "deliver",
  data() {
    return {
      title: "",
      content: "",
      content_temp: "",
      editor_height: 400,
      editorOption: {
        modules: {
          ImageExtend: {
            loading: true,
            name: "img",
            action: "/img",
            response: res => {
              console.log(res);
              return res.img[0].path;
            }
          },
          toolbar: {
            container: [["bold", "italic", "underline", "strike"], ["image"]],
            handlers: {
              image: function() {
                QuillWatch.emit(this.quill.id);
              }
            }
          }
        }
      }
    };
  },
  created() {
    this.back_show(true);
    if (this.login_flag == false) {
      this.$router.replace({
        path: "/Login"
      });
    }
  },
  mounted() {
    this.content_temp = this.content =
      this.$route.query.content == ""
        ? this.content
        : this.$route.query.content;
    this.title =
      this.$route.query.title == "" ? this.title : this.$route.query.title;
    this.content_flag = true;
  },
  methods: {
    ...mapMutations(["back_show"]),
    back() {
      this.back_show(false);
      this.$router.back();
      this.$route.params.content = "";
      this.$route.params.title = "";
    },
    updateData(data = "") {
      let c1 = data.replace(/<img width="100%"/g, "<img");
      let c2 = c1.replace(/<img/g, '<img width="100%"');
      this.content = c2;
    },
    get_img(str) {
      if (str) {
        var imgReg = /<img.*?(?:>|\/>)/gi;
        var srcReg = /src=[\'\"]?([^\'\"]*)[\'\"]?/i;
        var arr = str.match(imgReg);
        return arr == undefined ? "" : arr[0].match(srcReg)[1];
      } else {
        return;
      }
    },
    issue() {
      let img = this.get_img(this.content);
      let time = new Date().toLocaleDateString();
      if (this.title == "" || this.title == undefined) {
        this.$dialog.toast({
          mes: "标题不能为空！",
          timeout: 1500
        });
        return;
      } else if (this.content_temp == "" || this.content_temp == undefined) {
        this.$dialog.toast({
          mes: "内容不能为空！",
          timeout: 1500
        });
        return;
      } else {
        // if (!this.content.startsWith("<div>")) {
        //   this.content = `<div>${this.content}</div>`;
        // }
        // console.log(this.$route.query.content);
        if (
          (this.$route.query.content == "" ||
            this.$route.query.content == undefined) &&
          (this.$route.title == "" || this.$route.title == undefined)
        ) {
          this.$http
            .post("/issue", {
              title: this.title,
              content: this.content,
              user: this.user,
              img: img,
              time: time,
              user_img: this.user_img
            })
            .then(
              response => {
                if (response.body.upload == true) {
                  this.$dialog.toast({
                    mes: "发表成功！",
                    timeout: 1500
                  });
                  this.$route.params.content = "";
                  this.$route.params.title = "";
                  setTimeout(() => {
                    this.$router.push({
                      path: "/Interlocution"
                    });
                  }, 2000);
                }
              },
              error => {
                console.log(error);
              }
            );
        } else {
          this.$http
            .post("/admin_updateInte", {
              title: this.title,
              detail: this.content,
              user: this.user,
              img: img,
              id: this.$route.query.id
            })
            .then(
              response => {
                // console.log(response)
                if (response.body.flag == true) {
                  this.$dialog.toast({
                    mes: "修改成功！",
                    timeout: 1500
                  });
                  this.$route.params.content = "";
                  this.$route.params.title = "";
                  setTimeout(() => {
                    this.$router.push({
                      path: "/Interlocution"
                    });
                  }, 2000);
                }
              },
              error => {
                console.log(error);
              }
            );
        }
      }
    },
    onEditorChange({ quill, html, text }) {
      this.content = html;
      this.content_temp = text;
    }
  },
  computed: {
    ...mapState(["back_flag", "login_flag", "user", "password", "user_img"])
  },
  components: {
    quillEditor
  }
};
</script>

<style scoped lang="stylus">
.header
  width: 100%
  height: 2.75rem
  position: absolute
  line-height: 2.75rem
  font-size: 0.9rem
  top: 0
  background-color: #0f9cff
  color: #ffffff
  z-index: 150
  .back
    float: left
    position: absolute
    left: 1rem
  .issue
    float: right
    position: absolute
    right: 1rem
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
    border-radius: 2px
    height: 2.5rem
    line-height: 2.5rem
    font-size: 1.4rem
    border: 1px solid #ddd
    padding: 0 10px
    margin-bottom: 0.5rem
    input
      width: 100%
      height: 100%
      border: none
  .btn_ok
    position: absolute
    bottom: 1rem
    left: 0
    right: 0
    margin: 0 1rem
    line-height: 3rem
    color: #ffffff
    font-size: 1rem
    background-color: #08f
    border-radius: 5px
.deliver
  >>> .quill-editor
    height: 100%
  >>> .ql-container
    height: calc(100% - 9.35rem)
</style>