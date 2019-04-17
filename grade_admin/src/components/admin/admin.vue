<template>
  <div class="admin">
    <el-container style="height: 100%;">
      <el-aside width="14rem" style="background-color: rgb(238, 241, 246); height: 100%;">
        <el-menu default-active="1-2" @open="get_classify">
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-news"></i>
              <span>资讯管理</span>
            </template>
            <el-menu-item-group>
              <template slot="title">选项</template>
              <el-menu-item index="1-1" @click="add_info()">发布</el-menu-item>
              <el-menu-item index="1-2" @click="get_info()">查看/编辑</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-document"></i>
              <span>教程管理</span>
            </template>
            <el-menu-item-group>
              <template slot="title">选项</template>
              <el-menu-item index="2-1" @click="add_course()">发布</el-menu-item>
            </el-menu-item-group>
            <!--<el-menu-item index="2-2" @click="get_course()">查看/编辑分类</el-menu-item>-->
            <el-submenu index="2-2">
              <template slot="title">查看/编辑分类</template>
              <el-menu-item index="2-2-1" @click="get_classifyAll()">查看/编辑总类别</el-menu-item>
              <el-menu-item index="2-2-2" @click="get_classifyS()">查看/编辑子分类</el-menu-item>
              <el-menu-item index="2-2-3" @click="add_classifyAll()">新增总类别</el-menu-item>
              <el-menu-item index="2-2-4" @click="add_classifyS()">新增子类别</el-menu-item>
            </el-submenu>
            <el-submenu index="2-3">
              <template slot="title">查看/编辑教程</template>
              <el-menu-item v-for="(item, index) in course_list" :key="item.id" :index="classify_index(index)"
                            @click="get_course(item.name)">{{item.name}}
              </el-menu-item>
            </el-submenu>
          </el-submenu>
          <el-submenu index="3">
            <template slot="title">
              <i class="el-icon-message"></i>
              <span>问答管理</span>
            </template>
            <el-menu-item-group>
              <template slot="title">选项</template>
              <el-menu-item index="3-1" @click="add_inte()">发布</el-menu-item>
              <el-menu-item index="3-2" @click="get_inte()">查看/编辑</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-container ref="main">
        <el-header style="background-color: rgb(238, 241, 246);text-align: right; height: 40px;">
          <i class="el-icon-setting" style="margin-right: 15px;padding-top: 10px;"></i>
          <span>admin</span>
          <el-button style="float: left; margin-top: 5px" size="mini" plain v-show="main_flag"
                     @click="back()">返回
          </el-button>
          <el-button style="float: left; margin-top: 5px" type="primary" size="mini" plain
                     v-show="editor_flag && main_flag"
                     @click="release()">确定发布
          </el-button>
        </el-header>
        <el-main>
          <!--表格-->
          <el-table :data="c_tableData" v-show="main_flag == false"
                    style="width: 100%;" :height="main_height" v-loading="loading">
            <el-table-column prop="time" label="日期" width="180" v-if="mtype == 'info'" fixed="left"></el-table-column>
            <el-table-column prop="author" label="姓名" width="180" v-if="mtype == 'info'"></el-table-column>
            <el-table-column prop="title" label="标题" v-if="mtype == 'info'" fixed="right"></el-table-column>
            <el-table-column prop="category" label="分类" fixed="left" v-if="mtype == 'classifyAll'"></el-table-column>
            <el-table-column prop="category" label="分类" fixed="left" v-if="mtype == 'classifyS'"></el-table-column>
            <el-table-column prop="name" label="子分类" width="180" v-if="mtype == 'classifyS'"></el-table-column>
            <el-table-column prop="category" label="所属分类" width="180" fixed="left"
                             v-if="mtype == 'classify'"></el-table-column>
            <el-table-column prop="title" label="子分类" width="180" v-if="mtype == 'classify'"></el-table-column>
            <el-table-column prop="catalog" label="教程名称" v-if="mtype == 'classify'" fixed="right"></el-table-column>
            <el-table-column prop="category" label="所属分类" width="180" v-if="mtype == 'course'"
                             fixed="left"></el-table-column>
            <el-table-column prop="title" label="所属目录" width="180" v-if="mtype == 'course'"></el-table-column>
            <el-table-column prop="catalog" label="标题" v-if="mtype == 'course'" fixed="right"></el-table-column>
            <el-table-column prop="time" label="日期" width="180" v-if="mtype == 'inte'" fixed="left"></el-table-column>
            <el-table-column prop="user" label="作者" width="180" v-if="mtype == 'inte'"></el-table-column>
            <el-table-column prop="title" label="标题" v-if="mtype == 'inte'" fixed="right"></el-table-column>
            <el-table-column fixed="right" label="操作" width="150">
              <template slot-scope="scope">
                <el-button @click="read_detail(scope.row)" type="text" size="small"
                           v-show="mtype != 'classifyAll' && mtype != 'classifyS'">查看
                </el-button>
                <el-button type="text" size="small" @click="write_detail(scope.row)"
                           v-show="mtype != 'classifyAll' && mtype != 'classifyS'">编辑
                </el-button>
                <el-button type="text" size="small" v-show="mtype == 'classifyAll' || mtype == 'classifyS'"
                           @click="set_classifyAS(scope.row)">编辑
                </el-button>
                <el-button type="text" size="small"
                           @click="delete_classifyAS(scope.row)">删除
                </el-button>
              </template>
            </el-table-column>
          </el-table>
          <!--查看教程/资讯/问答-->
          <div class="main_text" v-show="main_flag && editor_flag == false && classifyAll_flag == false && classifyS_flag == false"
               v-html="main_text"></div>  <!--main_flag && editor_flag == false-->
          <!--编辑教程/资讯/问答-->
          <div class="editor" v-show="editor_flag">
            <el-row :gutter="20" ref="row0" v-show="editor_type == 'course'">
              <el-col :span="6">
                <div class="grid-content">
                  <el-select v-model="classify_text" placeholder="请选择类别" @change="change">
                    <el-option
                      v-for="item in classify_list"
                      :key="item.name"
                      :label="item.name"
                      :value="item.name">
                    </el-option>
                  </el-select>
                </div>
              </el-col>
              <el-col :span="8">
                <div class="grid-content">
                  <el-select v-model="classify_title" placeholder="请选择/添加目录" filterable allow-create>
                    <el-option
                      v-for="item in title_list"
                      :key="item.title"
                      :label="item.title"
                      :value="item.title">
                    </el-option>
                  </el-select>
                </div>
              </el-col>
            </el-row>
            <el-row :gutter="20" ref="row1">
              <el-col :span="16">
                <div class="grid-content">
                  <el-input placeholder="请输入内容" v-model="title">
                    <template slot="prepend">标题：</template>
                  </el-input>
                </div>
              </el-col>
              <el-col :span="8" v-show="editor_type != 'course' && this.mtype != 'course'">
                <el-select v-model="author" placeholder="请选择作者">
                  <el-option
                    v-for="item in user_list"
                    :key="item.id"
                    :label="item.user"
                    :value="item.user">
                  </el-option>
                </el-select>
              </el-col>
            </el-row>
            <el-row ref="row2">
              <el-col :span="24" v-show="editor_type != 'course'">
                <div class="grid-content bg-purple-dark">
                  <el-input placeholder="请输入内容" v-model="synopsis" :disabled="synopsis_flag">
                    <template slot="prepend">{{synopsis_text}}：</template>
                  </el-input>
                </div>
              </el-col>
            </el-row>
            <editor :content="content" :height="editor_height" :auto-height="false" @change="updateData" class="editor_s"></editor>
          </div>  <!--editor_flag-->
          <!--新增总分类-->
          <div class="classifyAll" v-show="classifyAll_flag">
            <el-row :gutter="20">
              <el-col :span="20">
                <el-input placeholder="请输入内容" v-model="classifyAll_text">
                  <template slot="prepend">新增分类:</template>
                </el-input>
              </el-col>
              <el-col :span="4">
                <el-button @click="admin_addClassifyAll()">确定</el-button>
              </el-col>
            </el-row>
          </div>
          <!--新增子分类-->
          <div class="classifyS" v-show="classifyS_flag">
            <el-row :gutter="20">
              <el-col :span="5">
                <el-select v-model="classifyAll_select" placeholder="请选择总类别">
                  <el-option
                    v-for="item in classifyAll_selectList"
                    :key="item.category"
                    :label="item.category"
                    :value="item.category">
                  </el-option>
                </el-select>
              </el-col>
              <el-col :span="12">
                <el-input v-model="classifyS_newText" placeholder="请输入新的子分类"></el-input>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="24">
                <el-input v-model="classifyS_newSynopsis" placeholder="请输入简介"></el-input>
              </el-col>
            </el-row>
            <el-tag type="info">上传子类图片:</el-tag>
            <el-upload ref="upload" :on-success="handleSuccess"
                       class="upload-demo" list-type="picture" action="http://127.0.0.1:3000/admin_img"
                       :file-list="classifyS_fileList" :limit="1">
              <el-button size="small" type="primary">选取图片</el-button>
              <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过2MB</div>
            </el-upload>
            <el-button @click="admin_addClassifyS()" type="primary">确定添加</el-button>
          </div>
        </el-main>
        <el-footer style="height: 35px;" v-show="main_flag == false">
          <el-pagination :current-page="1" :page-sizes="page_sizes" :page-size="page_size"
                         layout="total, sizes, prev, pager, next, jumper"
                         :total="tableData.length" @current-change="current_change" @size-change="set_pagesize">
          </el-pagination>
        </el-footer>
      </el-container>
    </el-container>
  </div>
</template>

<script>
  import VueHtml5Editor from 'vue-html5-editor'

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
    hiddenModules: [
      "full-screen",
      "info"
    ],
    image: {
      sizeLimit: 10*1024 * 1024,
      upload: {
        url: '/img',
        headers: {},
        params: {},
        fieldName: 'img'
      },
      uploadHandler(res) {
        var json = JSON.parse(res);
        console.log(json.img[0].path);
        if (!json) {
          console.log(json.error);
        } else {
          // console.log(json);
          return json.img[0].path;
        }
        // return json;
      }
    }
  })
  export default {
    name: "admin",
    data() {
      return {
        main_height: null,
        tableData: [],
        mtype: 'info',
        classify_list: [],
        title_list: [],
        classify_text: '',   //发布教程选择的类别名
        classify_title: '',  //发布教程时选择的目录名
        course_list: [],
        loading: false,
        page_sizes: [10, 20, 30, 40],
        page_size: 20,
        currentPage: 1,
        main_flag: false,
        main_text: '',
        editor_flag: false,
        content: '',
        editor_height: 400,
        title: '',
        author: '',
        synopsis: '',
        author_flag: false,
        synopsis_flag: false,
        classifyAll_flag: false,
        classifyS_flag: false,
        classifyAll_text: '',
        classifyS_text: '',
        classifyAll_selectList: [],
        classifyAll_select: '',
        classifyS_newText: '',
        classifyS_newSynopsis: '',
        classifyS_imgPath: '',
        classifyS_fileList: [],
        editor_type: 'info',
        release_classify: '',
        user_list: [],
        update_flag: false,
        update_params: null
      }
    },
    created() {
      this.$http.get('admin_info').then(response => {
        // console.log(response);
        this.tableData = response.body;
      }, err => {
        console.log(err);
      })
    },
    mounted() {
      // console.log(this.$refs.main.$el.offsetHeight)
      this.main_height = this.$refs.main.$el.offsetHeight - 115
      // console.log(this.main_height)
    },
    methods: {
      get_classify(index, indexPath) {
        this.$http.get('/admin_classify').then(response => {
          if (index == '2-3') {
            this.course_list = response.body;
          }
        }, err => {
          console.log(err);
        })
      },
      classify_index(index) {
        return "2-" + "3-" + (index + 1).toString();
      },
      get_course(name) {
        this.loading = true;
        this.mtype = 'course';
        this.editor_type = 'course';
        this.main_flag = false;
        this.editor_flag = false;
        this.classifyAll_flag = false;
        this.classifyS_flag = false;
        this.$http.post('/admin_course', {
          name: name
        }).then(response => {
          this.tableData = response.body;
          this.loading = false;
          // console.log(response);
        }, err => {
          console.log(err);
        })
      },
      get_inte() {
        this.loading = true;
        this.mtype = 'inte';
        this.main_flag = false;
        this.editor_flag = false;
        this.classifyAll_flag = false;
        this.classifyS_flag = false;
        this.editor_type = 'inte';
        this.$http.get('/admin_inte').then(response => {
          this.tableData = response.body;
          this.loading = false;
          // console.log(response);
        }, err => {
          console.log(err);
        })
      },
      get_info() {
        this.loading = true;
        this.mtype = 'info';
        this.main_flag = false;
        this.editor_flag = false;
        this.classifyAll_flag = false;
        this.classifyS_flag = false;
        this.editor_type = 'info';
        this.$http.get('admin_info').then(response => {
          // console.log(response);
          this.tableData = response.body;
          this.loading = false;
        }, err => {
          console.log(err);
        })
      },
      get_classifyAll() {
        this.main_flag = false;
        this.editor_flag = false;
        this.classifyAll_flag = false;
        this.classifyS_flag = false;
        this.$http.get('/admin_classifyAll').then(response => {
          // console.log(response)
          this.mtype = 'classifyAll';
          this.tableData = response.body;
        }, err => {
          console.log(err);
        })
      },
      get_classifyS() {
        this.main_flag = false;
        this.editor_flag = false;
        this.classifyAll_flag = false;
        this.classifyS_flag = false;
        this.$http.get('/admin_classifyS').then(response => {
          // console.log(response);
          this.mtype = 'classifyS';
          this.tableData = response.body;
        }, err => {
          console.log(err);
        })
      },
      current_change (currentPage) {
        this.currentPage = currentPage;
      },
      set_pagesize(pagesize) {
        this.page_size = pagesize;
      },
      read_detail(row) {
        this.main_flag = true;
        // this.editor_flag = false;
        if (this.mtype == 'info' || this.mtype == 'course') {
          this.main_text = row.prev == null ? '' : row.prev;
        } else if (this.mtype == 'inte') {
          this.main_text = row.detail == null ? '' : row.detail;
        }
        let c1 = this.main_text.replace(/<img width="100%"/g, "<img");
        this.main_text = c1.replace(/<img/g, '<img width="100%"');
      },
      write_detail(row) {
        // console.log(row);
        // console.log(this.editor_type);
        this.author_flag = false;
        this.synopsis_flag = false;
        this.editor_height = this.$refs.main.$el.offsetHeight - 246
        this.editor_flag = true;
        this.main_flag = true;
        this.update_flag = true;
        if (this.mtype == 'info') {
          this.content = row.prev == null ? '' : row.prev;
          this.title = row.title;
          this.author = row.author;
          this.synopsis = row.synopsis;
          this.update_params = row.id;
        } else if (this.mtype == 'course') {
          this.content = row.prev == null ? '' : row.prev;
          this.author = '';
          this.title = row.catalog;
          this.synopsis = row.title;
          this.classify_text = row.name;
          this.classify_title = row.title;
          this.update_params = row.catanum;
          this.release_classify = row.category;
          this.author_flag = true;
        } else if (this.mtype == 'inte') {
          this.content = row.detail == null ? '' : row.detail;
          this.author = row.user;
          this.title = row.title;
          this.synopsis = '';
          this.update_params = row.id;
          this.synopsis_flag = true;
        }
        let c1 = this.content.replace(/<img width="100%"/g, "<img");
        this.content = c1.replace(/<img/g, '<img width="100%"');
      },
      back() {
        this.main_flag = false;
        this.editor_flag = false;
      },
      set_classifyAS(row) {
        // console.log(row);
        if (this.mtype == 'classifyAll') {
          this.$prompt('请输入新分类名称', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消'
          }).then(({value}) => {
            this.$http.post('/admin_updateClassifyAll', {
              newValue: value,
              category: row.category
            }).then(response => {
              if (response.body.flag == true) {
                this.$message({
                  type: 'success',
                  message: '新的分类是: ' + value
                });
              }
              this.get_classifyAll();
            }, err => {
              console.log(err);
              this.$message({
                type: 'err',
                message: '修改失败 ！'
              });
            })
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '取消输入'
            });
          })
        } else if (this.mtype == 'classifyS') {
          this.$prompt('请输入新的子分类名称', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消'
          }).then(({value}) => {
            this.$http.post('/admin_updateClassifyS', {
              newValue: value,
              name: row.name
            }).then(response => {
              if (response.body.flag == true) {
                this.$message({
                  type: 'success',
                  message: '新的子分类是: ' + value
                });
              }
              this.get_classifyS();
            }, err => {
              console.log(err);
              this.$message({
                type: 'err',
                message: '修改失败 ！'
              });
            })
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '取消输入'
            });
          })
        }
      },
      add_classifyAll() {
        this.classifyAll_flag = true;
        this.classifyS_flag = false;
        this.main_flag = true;
        this.editor_flag = false;
      },
      add_classifyS() {
        this.classifyS_flag = true;
        this.classifyAll_flag = false;
        this.main_flag = true;
        this.editor_flag = false;
        this.editor_type = 'classifyS';
        this.$http.get('/admin_classifyAll').then(response => {
          // console.log(response)
          this.classifyAll_selectList = response.body;
        }, err => {
          console.log(err);
        })
      },
      admin_addClassifyAll() {
        this.$http.post('/admin_addClassifyAll', {
          classifyAll: this.classifyAll_text
        }).then(response => {
          // console.log(response);
          if (response.body.flag == true) {
            this.$message({
              message: '添加成功!',
              type: 'success'
            });
          } else {
            this.$message({
              message: '类别已存在!',
              type: 'error'
            });
          }
          this.classifyAll_text = '';
        }, err => {
          console.log(err);
        })
      },
      admin_addClassifyS() {
        // this.$refs.upload.submit();
        if (this.classifyAll_select != '' && this.classifyS_newText != '' && this.classifyS_newSynopsis != '' && this.classifyS_imgPath != '') {
          this.$http.post('/admin_addClassifyS', {
            name: this.classifyS_newText,
            category: this.classifyAll_select,
            photo: this.classifyS_imgPath,
            synopsis: this.classifyS_newSynopsis
          }).then(response => {
            if (response.body.flag == true) {
              this.$message({
                type: 'success',
                message: '添加成功！'
              });
              this.classifyAll_select = this.classifyS_newText = this.classifyS_newSynopsis = this.classifyS_imgPath = '';
              this.classifyS_fileList = [];
            } else {
              this.$message({
                type: 'error',
                message: '添加失败！'
              });
            }
          }, err => {
            console.log(err);
          })
        }
      },
      delete_classifyAS(row) {
        console.log(row);
        if (this.mtype == 'classifyAll') {
          this.$confirm('此操作将永久删除该类别, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.$http.post('/admin_deleteClassifyAll', {
                classifyAll: row.category
              }).then(response => {
                if(response.body.flag == true) {
                  this.$message({
                    type: 'success',
                    message: '删除成功!'
                  });
                } else {
                  this.$message({
                    type: 'error',
                    message: '删除失败!'
                  });
                }
            })
            this.get_classifyS();
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消删除'
            });
          });
        } else if (this.mtype == 'classifyS') {
          this.$confirm('此操作将永久删除该类别, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.$http.post('/admin_deleteClassifyS', {
              name: row.name
            }).then(response => {
              if(response.body.flag == true) {
                this.$message({
                  type: 'success',
                  message: '删除成功!'
                });
              } else {
                this.$message({
                  type: 'error',
                  message: '删除失败!'
                });
              }
            })
            this.get_classifyS();
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消删除'
            });
          });
        } else if (this.mtype == 'info') {
          this.$confirm('此操作将永久删除该信息, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.$http.post('/admin_deleteInfo', {
              id: row.id
            }).then(response => {
              if(response.body.flag == true) {
                this.$message({
                  type: 'success',
                  message: '删除成功!'
                });
              } else {
                this.$message({
                  type: 'error',
                  message: '删除失败!'
                });
              }
            })
            this.get_info();
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消删除'
            });
          });
        } else if (this.mtype == 'course') {
          this.$confirm('此操作将永久删除该信息, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.$http.post('/admin_deleteCourse', {
              catanum: row.catanum
            }).then(response => {
              if(response.body.flag == true) {
                this.$message({
                  type: 'success',
                  message: '删除成功!'
                });
              } else {
                this.$message({
                  type: 'error',
                  message: '删除失败!'
                });
              }
            })
            this.get_course(row.name);
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消删除'
            });
          });
        } else if (this.mtype == 'inte') {
          this.$confirm('此操作将永久删除该信息, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.$http.post('/admin_deleteInte', {
              id: row.id
            }).then(response => {
              if(response.body.flag == true) {
                this.$message({
                  type: 'success',
                  message: '删除成功!'
                });
              } else {
                this.$message({
                  type: 'error',
                  message: '删除失败!'
                });
              }
            })
            this.get_inte();
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消删除'
            });
          });
        }
      },
      handleSuccess(response, file, fileList) {
        // console.log(response);
        // console.log(file);
        // console.log(fileList);
        // console.log(this.classifyS_fileList);
        if (response.file[0].path) {
          this.classifyS_imgPath = response.file[0].path;
        }
        // console.log(this.classifyS_imgPath);
      },
      add_info() {
        this.add_New('info', false, false);
        this.$http.get('/admin_selectUser').then(response => {
          // console.log(response);
          this.user_list = response.body;
        }, err => {
          console.log(err);
        })
      },
      add_course() {
        this.add_New('course', true, false);
        this.$http.get('/admin_classifyS').then(response => {
          // console.log(response);
          this.classify_list = response.body;
        }, err => {
          console.log(err);
        })
      },
      add_inte() {
        this.add_New('inte', false, true);
        this.$http.get('/admin_selectUser').then(response => {
          // console.log(response);
          this.user_list = response.body;
        }, err => {
          console.log(err);
        })
      },
      add_New(type, auto_flag, synopsis_flag) {
        this.update_flag = false;
        this.editor_flag = true;
        this.main_flag = true;
        this.title = this.author = this.synopsis = this.content = '';
        this.editor_type = type;
        this.mtype = type;
        this.author_flag = auto_flag;
        this.synopsis_flag = synopsis_flag;
      },
      upload_New(url, res) {
        this.$http.post(url, res).then(response => {
          if(response.body.flag == true) {
            this.$message({
              type: 'success',
              message: '发布成功!'
            });
            if(this.editor_type == 'info') {
              this.get_info();
            } else if(this.editor_type = 'course') {
              this.get_course(this.classify_text);
            } else if(this.editor_type == 'inte') {
              this.get_inte();
            }
            this.title = '';
            this.author = '';
            this.synopsis = '';
            this.classify_text = '';
            this.release_classify = '';
            this.classify_title = '';
            this.content = '';
            this.main_flag = this.update_flag == true ? false : true;
            this.editor_flag = this.update_flag = true ? false : true;
            this.update_flag = false;
            this.currentPage = 1;
          } else {
            this.$message({
              type: 'error',
              message: '发布失败!'
            });
          }
        }, err => {
          console.log(err);
        })
      },
      release() {
        let content_temp = this.content;
        content_temp = this.content.startsWith('<img') ? this.content : content_temp.replace(/<.*?>/ig,""); //判断是否开头便是图片（因图片无法识别为文字）
        if(content_temp == '') {
          this.$message({
            type: 'error',
            message: '内容不能为空!'
          });
          return;
        }
        if(!this.content.startsWith('<div>')) {
          this.content = `<div>${this.content}</div>`
        }
        if(this.editor_type == 'info') {
          let res = {
            title: this.title,
            author: this.author,
            synopsis: this.synopsis,
            time: new Date().toLocaleDateString(),
            content: this.content
          }
          let res_update = {
            title: this.title,
            author: this.author,
            synopsis: this.synopsis,
            time: new Date().toLocaleDateString(),
            content: this.content,
            id: this.update_params
          }
          if(this.title == '' || this.author == '' || this.synopsis == '') {
            this.$message({
              type: 'error',
              message: '请完善信息!'
            });
            return ;
          }
          if(this.update_flag == true) {
            this.upload_New('/admin_updateInfo', res_update);
          } else {
            this.upload_New('/admin_addInfo', res);
          }
        } else if(this.editor_type == 'course') {
          let res = {
            name: this.classify_text,
            category: this.release_classify,
            catalog: this.title,
            title: this.classify_title,
            prev: this.content
          }
          let res_update = {
            name: this.classify_text,
            category: this.release_classify,
            catalog: this.title,
            title: this.classify_title,
            prev: this.content,
            catanum: this.update_params
          }
          if(this.classify_text == '' || this.release_classify == '' || this.title == '' || this.classify_title == '') {
            this.$message({
              type: 'error',
              message: '请完善信息!'
            });
            return ;
          }
          if(this.update_flag == true) {
            this.upload_New('/admin_updateCourse', res_update);
          } else {
            this.upload_New('/admin_addCourse', res);
          }
        } else if(this.editor_type == 'inte') {
          let res = {
            title: this.title,
            user: this.author,
            detail: this.content,
            time: new Date().toLocaleDateString(),
            img: this.get_img(this.content)
          }
          let res_update = {
            title: this.title,
            user: this.author,
            detail: this.content,
            id: this.update_params,
            img: this.get_img(this.content)
          }
          if(this.title == '' || this.author == '') {
            this.$message({
              type: 'error',
              message: '请完善信息!'
            });
            return ;
          }
          if(this.update_flag == true) {
            this.upload_New('/admin_updateInte', res_update);
          } else {
            this.upload_New('/admin_addInte', res);
          }
        }
        // console.log(this.content);
      },
      change(value) {
        this.title_list = [];
        this.classify_title = '';
        this.$http.post('/admin_catalog', {
          name: value
        }).then(response => {
          // console.log(response);
          this.title_list = response.body;
        }, err => {
          console.log(err);
        });
        this.$http.post('admin_category', {
          name: value
        }).then(response => {
          console.log(response);
          this.release_classify = response.body[0].category;
        }, err => {
          console.log(err);
        });
      },
      updateData(data) {
        let c1 = data.replace(/<img width="100%"/g, "<img");
        this.content = c1.replace(/<img/g, '<img width="100%"');
      },
      get_img(str){
        var imgReg = /<img.*?(?:>|\/>)/gi;
        var srcReg = /src=[\'\"]?([^\'\"]*)[\'\"]?/i;
        var arr = str.match(imgReg);
        return arr == undefined ? '' : arr[0].match(srcReg)[1];
      }
    },
    computed: {
      c_tableData() {
        // this.page_size = pagesize;
        return this.tableData.slice((this.currentPage - 1) * this.page_size, this.currentPage * this.page_size);
      },
      current_page() {
        return this.tableData.length / this.page_size;
      },
      synopsis_text() {
        return this.editor_type == 'course' ? '所属目录' : '简介';
      },
      btn_text() {
        return this.editor_type == 'info' || this.editor_type == 'course' || this.editor_type == 'inte' ? '确定发布' : '确定修改';
      }
    },
    components: {
      editor
    }
  }
</script>

<style scoped lang="stylus">
  .admin
    position: absolute
    width: 90%
    height: 90%
    padding: 2% 4%

    .main_text
      width: 100%
      height: 100%
      border: solid 1px #ebebeb
      text-align: left

    .main_text >>>
      p
        margin-top: 1rem
        margin-bottom: .875rem
        line-height: 1.75rem
        font-size: 1rem
        text-align: left
      img
        width: 100%
        height: 100%
      h1
        margin: 0 0 .625rem 0
        font-size: 1.5em
        text-indent: initial
        text-decoration: none
        color: #000
      span
        color: #64854c
      h2
        margin: 0
        padding-top: 5px
        font-size: 1.2rem
        border-top: 1px solid #d4d4d4
        clear: both
      p
        word-wrap: break-word
        word-break: break-all
        font-size: .825rem
        line-height: 2em
      blockquote
        background-color: #fff
        padding: .625rem
        margin: .625rem
        font-size: .813rem
        line-height: 2em
        p
          word-wrap: break-word
          background: #f3f7f0
          padding: .25rem
          font-size: .875rem
          font-style: italic
          line-height: 1.5em
          font-weight: 400!important
      .example
        /*width: 98%*/
        color: #000
        background-color: #e5eecc
        margin: 0 0 5px 0
        padding: 5px
        border: 1px solid #d4d4d4
        background-image: -webkit-linear-gradient(#fff,#e5eecc 100px)
        background-image: linear-gradient(#fff,#e5eecc 100px)
        h2
          color: #617f10
          background-color: transparent
          margin-top: 0
        .example_code
          line-height: 1.4em
          width: 96%
          background-color: #fff
          padding: .3125rem
          border: 1px solid #d4d4d4
          font-size: 100%
          font-family: Menlo,Monaco,Consolas,"Andale Mono","lucida console","Courier New",monospace
          word-break: break-all
          word-wrap: break-word
          white-space: pre-wrap
          .h1-main
            background-color: #fff
            font-family: Menlo,Monaco,Consolas,"Andale Mono","lucida console","Courier New",monospace
            white-space: pre-wrap
            word-break: break-all
            word-wrap: break-word
            .hl-brackets
              color: Olive
            .hl-code
              color: gray
            .h1-var
              color: #00008b
            .hl-reserved
              color: Green
      .hr
        background-color: #d4d4d4;
        color: #d4d4d4;
        height: 1px;
        border: 0;
        clear: both;
      ul
        margin-top: 1em;
        margin-bottom: 1em;
        list-style-type: none;
        line-height: 140%;
        li
          list-style-type: none;
          /*background-image: url(assets/img/bullet@2x.png);*/
          background-repeat: no-repeat;
          background-position: left .4em;
          padding: 0 0 0 1.2em;
          -webkit-background-size: auto .5rem;
          -moz-background-size: auto .5rem;
          background-size: auto .5rem;
          margin: 0 0 1em 1em;
          line-height: 1.5em;
          font-size: .8125rem;
          word-break: break-all;
      .reference
      .tecspec
        border-collapse: collapse;
        width: 100%;
        margin-bottom: 4px;
        margin-top: 4px;
        tbody
          display: table-row-group;
          vertical-align: middle;
          tr
            display: table-row;
            vertical-align: inherit ;
            th
              color: #fff;
              background-color: #555;
              border: 1px solid #555;
              font-size: 12px;
              padding: 3px;
              vertical-align: top;
              text-align: left;
            td
              line-height: 2em;
              min-width: 24px;
              border: 1px solid #d4d4d4;
              padding: 5px;
              padding-top: 7px;
              padding-bottom: 7px;
              vertical-align: top;
      .browserref
        border-collapse: collapse;
        width: 100%;
        tbody
          display: table-row-group;
          vertical-align: middle;
          tr
            display: table-row;
            vertical-align: inherit ;
            th
              color: #fff;
              background-color: #555;
              border: 1px solid #555;
              font-size: 12px;
              padding: 3px;
              vertical-align: top;
              text-align: left;
            td
              line-height: 2em;
              min-width: 24px;
              border: 1px solid #d4d4d4;
              padding: 5px;
              padding-top: 7px;
              padding-bottom: 7px;
              vertical-align: top;

    .editor_s >>>
      p
        margin-top: 1rem
        margin-bottom: .875rem
        line-height: 1.75rem
        font-size: 1rem
        text-align: left
      img
        width: 100%
        height: 100%
      h1
        margin: 0 0 .625rem 0
        font-size: 1.5em
        text-indent: initial
        text-decoration: none
        color: #000
      span
        color: #64854c
      h2
        margin: 0
        padding-top: 5px
        font-size: 1.2rem
        border-top: 1px solid #d4d4d4
        clear: both
      p
        word-wrap: break-word
        word-break: break-all
        font-size: .825rem
        line-height: 2em
      blockquote
        background-color: #fff
        padding: .625rem
        margin: .625rem
        font-size: .813rem
        line-height: 2em
        p
          word-wrap: break-word
          background: #f3f7f0
          padding: .25rem
          font-size: .875rem
          font-style: italic
          line-height: 1.5em
          font-weight: 400!important
      .example
        /*width: 98%*/
        color: #000
        background-color: #e5eecc
        margin: 0 0 5px 0
        padding: 5px
        border: 1px solid #d4d4d4
        background-image: -webkit-linear-gradient(#fff,#e5eecc 100px)
        background-image: linear-gradient(#fff,#e5eecc 100px)
        h2
          color: #617f10
          background-color: transparent
          margin-top: 0
        .example_code
          line-height: 1.4em
          width: 96%
          background-color: #fff
          padding: .3125rem
          border: 1px solid #d4d4d4
          font-size: 100%
          font-family: Menlo,Monaco,Consolas,"Andale Mono","lucida console","Courier New",monospace
          word-break: break-all
          word-wrap: break-word
          white-space: pre-wrap
          .h1-main
            background-color: #fff
            font-family: Menlo,Monaco,Consolas,"Andale Mono","lucida console","Courier New",monospace
            white-space: pre-wrap
            word-break: break-all
            word-wrap: break-word
            .hl-brackets
              color: Olive
            .hl-code
              color: gray
            .h1-var
              color: #00008b
            .hl-reserved
              color: Green
      .hr
        background-color: #d4d4d4;
        color: #d4d4d4;
        height: 1px;
        border: 0;
        clear: both;
      ul
        margin-top: 1em;
        margin-bottom: 1em;
        list-style-type: none;
        line-height: 140%;
        li
          list-style-type: none;
          /*background-image: url(assets/img/bullet@2x.png);*/
          background-repeat: no-repeat;
          background-position: left .4em;
          padding: 0 0 0 1.2em;
          -webkit-background-size: auto .5rem;
          -moz-background-size: auto .5rem;
          background-size: auto .5rem;
          margin: 0 0 1em 1em;
          line-height: 1.5em;
          font-size: .8125rem;
          word-break: break-all;
      .reference
      .tecspec
        border-collapse: collapse;
        width: 100%;
        margin-bottom: 4px;
        margin-top: 4px;
        tbody
          display: table-row-group;
          vertical-align: middle;
          tr
            display: table-row;
            vertical-align: inherit ;
            th
              color: #fff;
              background-color: #555;
              border: 1px solid #555;
              font-size: 12px;
              padding: 3px;
              vertical-align: top;
              text-align: left;
            td
              line-height: 2em;
              min-width: 24px;
              border: 1px solid #d4d4d4;
              padding: 5px;
              padding-top: 7px;
              padding-bottom: 7px;
              vertical-align: top;
      .browserref
        border-collapse: collapse;
        width: 100%;
        tbody
          display: table-row-group;
          vertical-align: middle;
          tr
            display: table-row;
            vertical-align: inherit ;
            th
              color: #fff;
              background-color: #555;
              border: 1px solid #555;
              font-size: 12px;
              padding: 3px;
              vertical-align: top;
              text-align: left;
            td
              line-height: 2em;
              min-width: 24px;
              border: 1px solid #d4d4d4;
              padding: 5px;
              padding-top: 7px;
              padding-bottom: 7px;
              vertical-align: top;
    .editor
      .grid-content
        min-height: 2.25rem
        /*border: solid 1px #ebebeb*/
        margin-bottom: .5rem

    .el-submenu
      .el-menu-item
        padding: 0 20px

    .classifyAll
      margin-top: 1rem

    .classifyS
      margin-top: 1rem
      position: relative

      .el-row
        margin-bottom: 1rem

      .el-tag
        position: absolute
        left: 0

      .upload-demo
        margin-top: 4rem
        text-align: left
        margin-bottom: 1rem
</style>
