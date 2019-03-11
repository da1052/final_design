var mysql = require('mysql');
var express = require('express');
var bodyParser = require('body-parser');
var multiparty = require('multiparty');
var util = require('util');
var fs = require('fs');
var router = express.Router();

var app = express();
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));

// 数据库连接
var data = new Array();
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '1532112',
    database: 'design',
    dateStrings: true
})
connection.connect();
//获取分类
var sql_category = 'SELECT category from classify GROUP BY category';
connection.query(sql_category, function (err, result) {
    if (err) {
        console.log('false', err.message);
        return;
    }
    data['category'] = result;
    // console.log(data['category'])
})

var sql_class = 'SELECT * FROM classify';  //SELECT category,GROUP_CONCAT(name,photo,summary) FROM classify GROUP BY category'
connection.query(sql_class, function (err, result) {
    if(err) {
        console.log('false', err.message);
        return;
    }
    // data['classify'] = result;
    data['category'].forEach(function (item, index) {
        item.detail = new Array();
        result.forEach(function (item_s, index_s) {
            if(item.category == item_s.category) {
                item.detail.push(item_s);
            }
        })
    })
    data['classify'] = data['category'];
});

//获取教程
var sql_course = 'SELECT * FROM course';
connection.query(sql_course, function (err, result) {
    if (err) {
        console.log('false', err.message);
        return ;
    }
    result.forEach(function(item, index) {
        item.address = '/course' + item.address;
    })
    data['course'] = result;
})

var sql_course_title = 'SELECT title, name from course GROUP BY name, title ORDER BY name,title DESC';
connection.query(sql_course_title, function (err, result) {
    if (err) {
        console.log('false', err.message);
        return ;
    }
    data['course_title'] = result;
    // console.log(data['course_title']);
})

var sql_course_name = 'SELECT name from course GROUP BY name';
connection.query(sql_course_name, function (err, result) {
    if (err) {
        console.log('false', err.message);
        return ;
    }
    result.forEach(function(item, index) {
        item.detail = [];
        data['course_title'].forEach(function (item_s, index_s) {
            if(item.name == item_s.name) {
                item.detail.push(item_s);
            }
        })
    })
    data['course_n_t'] = result;
    // console.log(data['course_n_t']);
})

var sql_user = 'SELECT * from user';
connection.query(sql_user, function (err, result) {
    if(err) {
        console.log('false', err.message);
        return ;
    }
    data['user'] = result;
    // console.log(data['user']);
})

// var sql_course_name = 'SELECT name FROM course GROUP BY name';
// connection.query(sql_course_name, function(err, result) {
//     if (err) {
//         console.log('false', err.message);
//         return ;
//     }
//     result.forEach(function (item, index) {
//         item.detail = new Array();
//         data['course_all'].forEach(function (item_s, index_s) {
//             if(item.name == item_s.name) {
//                 item.detail.push(item_s);
//             }
//         })
//     })
//     data['course'] = result;
// })

//获取资讯
var sql_info = 'SELECT * FROM info';
connection.query(sql_info, function (err, result) {
    if(err) {
        console.log('false', err.message);
        return ;
    }
    data['info'] = result;
})

//获取问答
// var sql_inte = 'SELECT * FROM q_a';
// connection.query(sql_inte, function (err, result) {
//     if(err) {
//         console.log('false', err.message);
//         return ;
//     }
//     data['inte'] = result;
// })

connection.end();

// 数据库连接

//设置跨域访问
app.all('*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, OPTIONS");
    res.header("X-Powered-By", "3.2.1");
    res.header("Content-Type", "application/json; charset=utf-8");
    next();
})

//接口
//根
app.get('/', function (req, res, next) {
    // console.log(req.headers.host);
    res.status(200),
        res.json();
});

//分类接口
app.get('/classify', function (req, res) {
    var mysql = require('mysql');
    var connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '1532112',
        database: 'design',
        dateStrings: true
    });
    connection.connect();
    var sql_category = 'SELECT category from classify GROUP BY category';
    connection.query(sql_category, function (err, result) {
        if (err) {
            console.log('false', err.message);
            return;
        }
        data['category_s'] = result;
        // console.log(data['category'])
    })
    var sql_class = 'SELECT * FROM classify';  //SELECT category,GROUP_CONCAT(name,photo,summary) FROM classify GROUP BY category'
    connection.query(sql_class, function (err, result) {
        if(err) {
            console.log('false', err.message);
            return;
        }
        data['category_s'].forEach(function (item, index) {
            item.detail = new Array();
            result.forEach(function (item_s, index_s) {
                if(item.category == item_s.category) {
                    item.detail.push(item_s);
                }
            })
        })
        data['classify'] = data['category_s'];
        res.send(data['classify']);
    });
    connection.end();
    // res.status(200),
    //     res.json(data['classify'])

    // res.status(200),
    //     res.json(data['classify'])
});

//教程接口
app.get('/course', function (req, res) {
    var mysql = require('mysql');
    var connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '1532112',
        database: 'design',
        dateStrings: true
    });
    connection.connect();
    var sql_course = 'SELECT * FROM course';
    connection.query(sql_course, function (err, result) {
        if (err) {
            console.log('false', err.message);
            return ;
        }
        result.forEach(function(item, index) {
            item.address = '/course' + item.address;
        })
        res.send(result);
    })
    connection.end();
    // res.status(200),
    //     res.json(data['course'])
})

//资讯接口
app.get('/info', function (req, res) {
    var mysql = require('mysql');
    var connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '1532112',
        database: 'design',
        dateStrings: true
    });
    connection.connect();
    var sql_info = 'SELECT * FROM info';
    connection.query(sql_info, function (err, result) {
        if(err) {
            console.log('false', err.message);
            return ;
        }
        // data['info'] = result;
        result.forEach(function (item, index) {
            item.prev = item.prev.replace(/\\n/g, '');
        })
        res.send(result);
    })
    connection.end();

    // res.status(200),
    //     res.json(data['info'])
})
app.get('/classify/:name', function(req, res) {
    var mysql = require('mysql');
    var connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '1532112',
        database: 'design',
        dateStrings: true
    });
    connection.connect();
    data['course_details'] = [];
    var sql_course = 'SELECT * FROM course';
    connection.query(sql_course, function (err, result) {
        if (err) {
            console.log('false', err.message);
            return ;
        }
        result.forEach(function(item, index) {
            item.address = '/course' + item.address;
            if(item.name == req.params.name) {
                data['course_details'].push(item);
            }
        })
    })
    // data['course'].forEach(function (item, index) {
    //     if(item.name == req.params.name) {
    //         data['course_detail'].push(item);
    //     }
    // })
    data['detail'] = data['course_details'];
    // console.log(data['detail']);

    var sql_course_title = 'SELECT title, name from course GROUP BY name, title ORDER BY name,title DESC';
    connection.query(sql_course_title, function (err, result) {
        if (err) {
            console.log('false', err.message);
            return ;
        }
        data['course_titles'] = result;
        // console.log(data['course_title']);
    })

    var sql_course_name = 'SELECT name from course GROUP BY name';
    connection.query(sql_course_name, function (err, result) {
        if (err) {
            console.log('false', err.message);
            return ;
        }
        result.forEach(function(item, index) {
            item.detail = [];
            data['course_titles'].forEach(function (item_s, index_s) {
                if(item.name == item_s.name) {
                    item.detail.push(item_s);
                }
            })
        })
        // data['course_n_ts'] = result;
        result.forEach(function (item, index) {
            if(item.name == req.params.name) {
                item.detail.forEach(function (item_t, index_t) {
                    item_t.detail = [];
                    data['course_details'].forEach(function (item_s, index_s) {
                        if(item_t.title == item_s.title) {
                            item_t.detail.push(item_s);
                        }
                    })
                })
                data['course_details'] = item;
            }
        })
        // console.log(data['course_n_t']);
        res.send(data['course_details']);
    })
    connection.end();

})

//教程详细页接口
app.get('/detail', function (req, res) {
    var mysql = require('mysql');
    var connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '1532112',
        database: 'design',
        dateStrings: true
    });
    connection.connect();
    var temp = [];
    data['course_details'] = [];
    var sql_course = 'SELECT * FROM course WHERE name=(SELECT name FROM course WHERE catanum=?)';
    connection.query(sql_course, req.query.catanum, function (err, result) {
        if (err) {
            console.log('false', err.message);
            return ;
        }
        data['temp'] = result;
    })
    var select_sql = 'SELECT * FROM course WHERE catanum=?';
    connection.query(select_sql, req.query.catanum, function (err, result) {
        if(err) {
            console.log('err', err.message);
            return ;
        }
        data['temp'].forEach(function (item, index) {
            if(item.catanum == req.query.catanum) {
                temp.push({
                    'catalog': item.catalog,
                    'prev': item.prev,
                    'forward': data['temp'][index - 1] == undefined ? '' : data['temp'][index - 1],
                    'next': data['temp'][index + 1] == undefined ? '' : data['temp'][index + 1]
                })
            }
        })
        res.send(temp);
    })
    connection.end();
})

//图片上传接口
app.post('/img', function(req, res, next) {
    console.log(req.headers.host)

    /* 生成multiparty对象，并配置上传目标路径 */
    var form = new multiparty.Form();
    /* 设置编辑 */
    form.encoding = 'utf-8';
    //设置文件存储路劲
    form.uploadDir = './public/upload';
    //设置文件大小限制
    form.maxFilesSize = 2 * 1024 * 1024;
    // form.maxFields = 1000;   //设置所有文件的大小总和
    //上传后处理
    form.parse(req, function(err, fields, files) {
        var filesTemp = JSON.stringify(files, null, 2);
        var filesTemp_s = JSON.parse(filesTemp);
        filesTemp_s.file[0].path = filesTemp_s.file[0].path.substr(6);
        filesTemp = JSON.stringify(filesTemp_s);
        if(err) {
            console.log('parse error:' + err);
        }else {

        }
        res.writeHead(200, {'content-type': 'text/plain;charset=utf-8'});
        res.end(filesTemp)
    })
})

//用户头像上传接口
app.post('/user_img', function(req, res) {
    /* 生成multiparty对象，并配置上传目标路径 */
    var form = new multiparty.Form();
    /* 设置编辑 */
    form.encoding = 'utf-8';
    //设置文件存储路劲
    form.uploadDir = './public/user_img';
    //设置文件大小限制
    form.maxFilesSize = 2 * 1024 * 1024;
    // form.maxFields = 1000;   //设置所有文件的大小总和
    //上传后处理
    form.parse(req, function(err, fields, files) {
        var filesTemp = JSON.stringify(files, null, 2);
        var filesTemp_s = JSON.parse(filesTemp);
        filesTemp_s.file[0].path = filesTemp_s.file[0].path.substr(6);
        filesTemp = JSON.stringify(filesTemp_s);
        if(err) {
            console.log('parse error:' + err);
        }else {

        }
        res.writeHead(200, {'content-type': 'text/plain;charset=utf-8'});
        res.end(filesTemp)
    })
})

//用户头像修改接口
app.post('/user_img_update', function (req, res) {
    var mysql = require('mysql');
    var connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '1532112',
        database: 'design',
        dateStrings: true
    });
    connection.connect();
    var update_sql = 'UPDATE user SET user_img=? WHERE user=?';
    var update_params = [req.body.imgPath, req.body.user];
    connection.query(update_sql, update_params, function (err, result) {
        if(err) {
            console.log(err.message);
            return ;
        }
        res.send({flag: true});
    })
    connection.end();
})

//登录接口
app.post('/login', function (req, res) {
    var mysql = require('mysql');
    var connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '1532112',
        database: 'design',
        dateStrings: true
    });
    connection.connect();
    var admin = false;
    data['login'] = [];
    var sql_user = 'SELECT * from user';
    connection.query(sql_user, function (err, result) {
        if(err) {
            console.log('false', err.message);
            return ;
        }
        data['user'] = result;
        result.forEach(function (item, index) {
            if(req.body.user == item.user && req.body.password == item.password) {
                if(req.body.user == 'admin') {
                    data['login'].push({
                        'admin': true,
                        'login': true,
                        'user': item.user,
                        'password': item.password,
                        'img' : item.user_img,
                        'age': item.age,
                        'email': item.email,
                        'phone': item.phone
                    })
                } else {
                    data['login'].push({
                        'admin': false,
                        'login': true,
                        'user': item.user,
                        'password': item.password,
                        'img': item.user_img,
                        'age': item.age,
                        'email': item.email,
                        'phone': item.phone
                    })
                }
            }
        })
        res.send(data['login']);
        // console.log(data['user']);
    })
    connection.end();
    // data['user'].forEach(function (item, index) {
    //     if(req.body.user == item.user && req.body.password == item.password) {
    //         if(req.body.user == 'admin') {
    //             data['login'].push({
    //                 'admin': true,
    //                 'login': true,
    //                 'user': item.user,
    //                 'password': item.password,
    //                 'img' : item.user_img,
    //                 'age': item.age,
    //                 'email': item.email,
    //                 'phone': item.phone
    //             })
    //         } else {
    //             data['login'].push({
    //                 'admin': false,
    //                 'login': true,
    //                 'user': item.user,
    //                 'password': item.password,
    //                 'img': item.user_img,
    //                 'age': item.age,
    //                 'email': item.email,
    //                 'phone': item.phone
    //             })
    //         }
    //     }
    // })
    // res.status(200),
    //     res.json(data['login']);
})

//发布问答接口
app.post('/issue', function (req, res) {
    var mysql = require('mysql');
    var connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '1532112',
        database: 'design',
        dateStrings: true
    })
    connection.connect();
    var response = {
        'user': req.body.user,
        'title': req.body.title,
        'content': req.body.content,
        'img': req.body.img,
        'time': req.body.time,
        'user_img': req.body.user_img
    }
    var add_sql = 'INSERT INTO q_a(user,title,detail,img,time,user_img) VALUES (?,?,?,?,?,?)';
    var addSqlParams = [response.user, response.title, response.content, response.img, response.time, response.user_img];
    connection.query(add_sql, addSqlParams, function (err, result) {
        if(err) {
            console.log('INSERT ERROR-', err.message);
            res.send('执行sql出错');
            return ;
        }
        // res.send('Welcome~ SingUp Success ^_^');
        res.send({upload: true});
    });
    connection.end();
})

//问答页面接口
app.get('/inte', function (req, res) {
    var mysql = require('mysql');
    var connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '1532112',
        database: 'design',
        dateStrings: true
    });
    connection.connect();
    var sql_inte = 'SELECT * FROM q_a';
    connection.query(sql_inte, function (err, result) {
        if(err) {
            console.log('false', err.message);
            res.send(err.message);
            return ;
        }
        res.send(result);
    });
    connection.end();
})

//问答页面评论获取接口
app.get('/inte/:id', function (req, res) {
    var mysql = require('mysql');
    var connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '1532112',
        database: 'design',
        dateStrings: true
    });
    connection.connect();
    var select_sql = 'SELECT * from comment WHERE id=?';
    var sqlParams = [req.params.id];
    // console.log(req.params.id);
    connection.query(select_sql, sqlParams, function(err, result) {
        if(err) {
            console.log('false:', err.message);
        }
        // console.log(result);
        res.send(result);
    })
})

//问答页面评论发表接口
app.post('/comment', function (req, res) {
    var mysql = require('mysql');
    var connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '1532112',
        database: 'design',
        dateStrings: true
    })
    connection.connect();
    var comment_id = req.body.id;  //记录评论所在帖子的id
    /*往评论表插入内容*/
    var response = {
        'id': req.body.id,
        'commenter': req.body.commenter,
        'time': req.body.time,
        'detail': req.body.detail,
        'user_img': req.body.user_img,
        'reply_user': req.body.reply_user,
        'reply_detail': req.body.reply_detail
    }
    var comment_sql = 'INSERT INTO comment(id,commenter,time,comment_detail,user_img,reply_user,reply_detail) VALUES (?,?,?,?,?,?,?)';
    var commentParams = [response.id, response.commenter, response.time, response.detail, response.user_img, response.reply_user, response.reply_detail];
    connection.query(comment_sql, commentParams, function (err, result) {
        if(err) {
            console.log('INSERT ERROR-', err.message);
            res.send('执行sql出错');
            return ;
        }
    });
    /*往问答表里插入评论数量*/
    var add_sql = 'UPDATE q_a SET comment_num = (SELECT COUNT(*) FROM comment WHERE id=?) WHERE id = ?';
    var addParams = [comment_id, comment_id];
    connection.query(add_sql, addParams, function (err, result) {
        if(err) {
            console.log('false:', err.message);
            return ;
        }
        res.send({flag: true});
    })
    connection.end();
})

//个人资料接口
app.post('/person', function (req, res) {
    var mysql = require('mysql');
    var connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '1532112',
        database: 'design',
        dateStrings: true
    });
    connection.connect();
    var person_user = req.body.user;   //获取登录的用户
    var person_sql = 'SELECT sex,age,email,phone from user WHERE user=?';
    connection.query(person_sql,person_user, function (err, result) {
        if(err) {
            console.log('false:', err.message);
            return ;
        }
        res.send(result);
    })
    connection.end();
})

//个人资料修改接口
app.post('/personUpdate', function (req, res) {
    var mysql = require('mysql');
    var connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '1532112',
        database: 'design',
        dateStrings: true
    });
    connection.connect();
    var response = {
        'user': req.body.user,
        'age': req.body.age,
        'sex': req.body.sex,
        'email': req.body.email,
        'phone': req.body.phone
    };
    var update_params = [response.age, response.sex, response.email, response.phone, response.user];
    var update_sql = 'UPDATE user SET age=?,sex=?,email=?,phone=? WHERE user=?';
    connection.query(update_sql, update_params, function (err, result) {
        if(err) {
            console.log('false', err.message);
            return ;
        }
        res.send({flag: true});
    })
    connection.end();
})

//收藏接口
app.post('/add_collection', function (req, res) {
    var mysql = require('mysql');
    var connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '1532112',
        database: 'design',
        dateStrings: true
    });
    connection.connect();
    var add_sql = 'INSERT INTO collection(name,user) VALUES (?,?)';
    var add_params = [req.body.name, req.body.user];
    connection.query(add_sql, add_params, function (err, result) {
        if(err) {
            console.log(err.message);
            res.send({flag: false});
            return ;
        }
        res.send({flag: true});
    })
    connection.end();
})

//删除收藏接口
app.post('/delete_collection', function (req, res) {
    var mysql = require('mysql');
    var connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '1532112',
        database: 'design',
        dateStrings: true
    });
    connection.connect();
    var delete_sql = 'DELETE FROM collection WHERE name=? and user=?';
    var delete_params = [req.body.name, req.body.user];
    connection.query(delete_sql, delete_params, function (err, result) {
        if(err) {
            console.log(err.message);
            res.send({flag: false});
            return ;
        }
        res.send({flag: true});
    })
    connection.end();
})

//收藏查询接口
app.post('/select_collection', function (req, res) {
    var mysql = require('mysql');
    var connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '1532112',
        database: 'design',
        dateStrings: true
    });
    connection.connect();
    var select_sql = 'SELECT name FROM collection WHERE user=? and name=?';
    var select_params = [req.body.user, req.body.name];
    connection.query(select_sql, select_params, function (err, result) {
        if(err) {
            console.log(err.message);
            res.send({flag: false});
            return ;
        }
        if(result == '') {
            res.send({flag: false});
            return ;
        }
        res.send({flag: true});
    })
    connection.end();
})

//个人资料页面收藏查询接口
app.post('/collection', function (req, res) {
    var mysql = require('mysql');
    var connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '1532112',
        database: 'design',
        dateStrings: true
    });
    connection.connect();
    var select_sql = 'SELECT * FROM collection WHERE user=?';
    connection.query(select_sql, req.body.user, function (err, result) {
        if(err) {
            console.log(err);
            return ;
        }
        res.send(result);
    })
    connection.end();
})

//个人资料页面收藏页面教程分类信息查询接口
app.post('/collection_course', function (req, res) {
    var mysql = require('mysql');
    var connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '1532112',
        database: 'design',
        dateStrings: true
    });
    connection.connect();
    var select_sql = 'SELECT * FROM classify WHERE name=?';
    connection.query(select_sql, req.body.name, function (err, result) {
        if(err) {
            console.log(err);
            return ;
        }
        res.send(result);
    })
    connection.end();
})

//个人问答接口
app.post('/question', function (req, res) {
    var mysql = require('mysql');
    var connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '1532112',
        database: 'design',
        dateStrings: true
    });
    connection.connect();
    var sql_inte = 'SELECT * FROM q_a WHERE user=?';
    connection.query(sql_inte, req.body.user,function (err, result) {
        if(err) {
            console.log('false', err.message);
            res.send(err.message);
            return ;
        }
        res.send(result);
    });
    connection.end();
})

//个人问答删除接口
app.post('/delete_question', function (req, res) {
    var mysql = require('mysql');
    var connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '1532112',
        database: 'design',
        dateStrings: true
    })
    connection.connect();
    var delete_id = req.body.id;
    var delete_sql = 'DELETE FROM q_a WHERE id=?';
    connection.query(delete_sql, delete_id, function(err, result) {
        if(err) {
            console.log('false', err.message);
            res.send(err.message);
            return ;
        }
        res.send({flag: true});
    })
    connection.end();
})

//找回密码接口
app.post('/password', function (req, res) {
    var mysql = require('mysql');
    var connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '1532112',
        database: 'design',
        dateStrings: true
    })
    connection.connect();
    var select_sql = 'SELECT * FROM user WHERE phone=?';
    connection.query(select_sql, req.body.phone, function (err, result) {
        if(err) {
            console.log('false', err.message);
            res.send(err.message);
            return ;
        }
        res.send(result);
    })
    connection.end();
})

//修改密码接口
app.post('/new_password', function (req, res) {
    var mysql = require('mysql');
    var connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '1532112',
        database: 'design',
        dateStrings: true
    })
    connection.connect();
    var update_sql = 'UPDATE user SET password=? WHERE phone=?';
    var update_params = [req.body.password, req.body.phone];
    connection.query(update_sql, update_params, function (err, result) {
        if(err) {
            console.log('false', err.message);
            res.send(err.message);
            return ;
        }
        res.send({flag: true});
    })
    connection.end();
})

//新用户注册查询用户名是否重复接口
app.post('/repeat_user', function (req, res) {
    var mysql = require('mysql');
    var connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '1532112',
        database: 'design',
        dateStrings: true
    })
    connection.connect();
    var user_flag;
    var phone_flag;
    var email_flag;
    var select_user_sql  = 'SELECT * from user WHERE user=?';
    var select_phone_sql = 'SELECT * FROM user WHERE phone=?';
    var select_email_sql = 'SELECT * FROM user WHERE email=?';
    connection.query(select_user_sql, req.body.user, function (err, result) {
        if(err) {
            console.log('false', err.message);
            res.send(err.message);
            return ;
        }
        // console.log('user:'+ result);
        if(result == '') {
            user_flag = true;
        }
    })
    connection.query(select_phone_sql, req.body.user, function (err, result) {
        if(err) {
            console.log('false', err.message);
            res.send(err.message);
            return ;
        }
        // console.log('phone:'+ result);
        if(result == '') {
            phone_flag = true;
        }
    })
    connection.query(select_email_sql, req.body.user, function (err, result) {
        if(err) {
            console.log('false', err.message);
            res.send(err.message);
            return ;
        }
        // console.log('email:'+ result);
        if(result == '') {
            email_flag = true;
        }
        // res.send({flag: true});
        if(user_flag && phone_flag && email_flag) {
            res.send({flag: true});
        } else {
            res.send({flag: false});
        }
    })
    connection.end();
})

//新用户查询手机邮箱是否重复接口
app.post('/repeat_phone_email', function (req, res) {
    var mysql = require('mysql');
    var connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '1532112',
        database: 'design',
        dateStrings: true
    })
    connection.connect();
    var phone_flag;
    var email_flag;
    var phone_sql = 'SELECT * FROM user WHERE phone=?';
    var email_sql = 'SELECT * FROM user WHERE email=?';
    connection.query(phone_sql, req.body.phone, function (err, result) {
        if(err) {
            console.log('false', err.message);
            res.send(err.message);
            return ;
        }
        // console.log('user:'+ result);
        if(result == '') {
            phone_flag = true;
        }
    })
    connection.query(email_sql, req.body.email, function (err, result) {
        if(err) {
            console.log('false', err.message);
            res.send(err.message);
            return ;
        }
        // console.log('user:'+ result);
        if(result == '') {
            email_flag = true;
        }
        if(phone_flag && email_flag) {
            res.send({flag: true});
        } else {
            res.send({flag: false});
        }
    })
    connection.end();
})

//新用户注册接口
app.post('/add_user', function (req, res) {
    var mysql = require('mysql');
    var connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '1532112',
        database: 'design',
        dateStrings: true
    })
    connection.connect();
    var response = {
        'user': req.body.user,
        'password': req.body.password,
        'phone': req.body.phone,
        'email': req.body.email,
        'question': req.body.question,
        'answer': req.body.answer
    };
    var add_sql = 'INSERT INTO user(user,password,email,phone,question,answer) VALUES (?,?,?,?,?,?)';
    var add_params = [response.user, response.password, response.email, response.phone, response.question, response.answer];
    connection.query(add_sql, add_params, function (err, result) {
        if(err) {
            console.log('INSERT ERROR-', err.message);
            res.send('执行sql出错');
            return ;
        }
        // res.send('Welcome~ SingUp Success ^_^');
        res.send({flag: true});
    })
    connection.end();
})


//后台接口
//管理员登陆接口
app.post('/admin_login', function (req, res) {
    var mysql = require('mysql');
    var connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '1532112',
        database: 'design',
        dateStrings: true
    })
    connection.connect();
    var response = {
        'user': req.body.user,
        'password': req.body.password
    }
    var select_sql = 'SELECT password FROM user WHERE user=?';
    connection.query(select_sql, req.body.user, function (err, result) {
        if(err) {
            console.log('false:', err.message);
            return ;
        }
        if(result[0].password == req.body.password) {
            res.send({flag: true});
        } else {
            res.send({flag: false})
        }
    })
    connection.end();
})

//资讯查询接口
app.get('/admin_info', function (req, res) {
    var mysql = require('mysql');
    var connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '1532112',
        database: 'design',
        dateStrings: true
    })
    connection.connect();
    var select_sql = 'SELECT * FROM info';
    connection.query(select_sql, function (err, result) {
        if(err) {
            console.log('false:', err.message);
            return ;
        }
        res.send(result);
    })
    connection.end();
})

//教程总分类查询接口
app.get('/admin_classifyAll', function (req, res) {
    var mysql = require('mysql');
    var connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '1532112',
        database: 'design',
        dateStrings: true
    })
    connection.connect();
    var select_sql = 'SELECT category FROM classify_all';
    connection.query(select_sql, function (err, result) {
        if(err) {
            console.log('false', err.message);
            return ;
        }
        res.send(result);
    })
    connection.end();
})

//教程子分类查询接口
app.get('/admin_classifyS', function (req, res) {
    var mysql = require('mysql');
    var connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '1532112',
        database: 'design',
        dateStrings: true
    })
    connection.connect();
    var select_sql = 'SELECT name,category FROM classify';
    connection.query(select_sql, function (err, result) {
        if(err) {
            console.log('false', err.message);
            return ;
        }
        res.send(result);
    })
    connection.end();
})

//教程分类查询接口
app.get('/admin_classify', function (req, res) {
    var mysql = require('mysql');
    var connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '1532112',
        database: 'design',
        dateStrings: true
    })
    connection.connect();
    var select_sql = 'SELECT * FROM classify';
    connection.query(select_sql, function (err, result) {
        if(err) {
            console.log('false:', err.message);
            return ;
        }
        res.send(result);
    })
    connection.end();
})

//教程查询接口
app.post('/admin_course', function (req, res) {
    var mysql = require('mysql');
    var connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '1532112',
        database: 'design',
        dateStrings: true
    })
    connection.connect();
    var select_sql = 'SELECT * FROM course WHERE name=?';
    connection.query(select_sql, req.body.name,function (err, result) {
        if(err) {
            console.log('false:', err.message);
            return ;
        }
        res.send(result);
    })
    connection.end();
})

//问答查询接口
app.get('/admin_inte', function (req, res) {
    var mysql = require('mysql');
    var connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '1532112',
        database: 'design',
        dateStrings: true
    })
    connection.connect();
    var select_sql = 'SELECT * FROM q_a';
    connection.query(select_sql, function (err, result) {
        if(err) {
            console.log('false:', err.message);
            return ;
        }
        res.send(result);
    })
    connection.end();
})

//资讯发布接口
app.post('/admin_addInfo', function (req, res) {
    var mysql = require('mysql');
    var connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '1532112',
        database: 'design',
        dateStrings: true
    })
    connection.connect();
    var response = {
        'title': req.body.title,
        'author': req.body.author,
        'synopsis': req.body.synopsis,
        'time': req.body.time,
        'content': req.body.content
    };
    var add_sql = 'INSERT INTO info(title,author,synopsis,time,prev) VALUES(?,?,?,?,?)';
    var add_params = [response.title, response.author, response.synopsis, response.time, response.content];
    connection.query(add_sql, add_params, function (err, result) {
        if(err) {
            console.log('false', err.message);
            res.send({flag: false});
            return ;
        }
        res.send({flag: true});
    })
    connection.end();
})

//资讯修改接口
app.post('/admin_updateInfo', function (req, res) {
    var mysql = require('mysql');
    var connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '1532112',
        database: 'design',
        dateStrings: true
    })
    connection.connect();
    var response = {
        'title': req.body.title,
        'author': req.body.author,
        'synopsis': req.body.synopsis,
        'time': req.body.time,
        'content': req.body.content,
        'id': req.body.id
    };
    // var select_sql = 'SELECT * FROM user WHERE user=?';
    // connection.query(select_sql, response.author, function (err, result) {
    //     if(err) {
    //         console.log('false', err.message);
    //         return ;
    //     } else if(result == '') {
    //         res.send({user_flag: false});
    //         return ;
    //     }
    // })
    var update_sql = 'UPDATE info SET title=?,author=?,synopsis=?,prev=? WHERE id=?';
    var update_params = [response.title, response.author, response.synopsis, response.content, response.id];
    connection.query(update_sql, update_params, function (err, result) {
        if(err) {
            console.log('false', err.message);
            res.send({flag: false});
            return ;
        }
        res.send({flag: true});
    })
    connection.end();
})

//资讯删除接口
app.post('/admin_deleteInfo', function (req, res) {
    var mysql = require('mysql');
    var connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '1532112',
        database: 'design',
        dateStrings: true
    })
    connection.connect();
    var delete_sql = 'DELETE FROM info WHERE id=?';
    connection.query(delete_sql, req.body.id, function (err, result) {
        if(err) {
            console.log('false', err.message);
            res.send({flag: false});
            return ;
        }
        res.send({flag: true});
    })
    connection.end();
})

//教程新增总类接口
app.post('/admin_addClassifyAll', function (req, res) {
    var mysql = require('mysql');
    var connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '1532112',
        database: 'design',
        dateStrings: true,
        useConnectionPooling: true
    })
    connection.connect();
    var add_sql = 'INSERT INTO classify_all (category) VALUES (?)';
    connection.query(add_sql, req.body.classifyAll, function (err, result) {
        if(err) {
            console.log('false:', err.message);
            res.send({flag: false});
            return ;
        }
        res.send({flag: true});
    })
    connection.end();
})

//教程总类删除接口
app.post('/admin_deleteClassifyAll', function (req, res) {
    var mysql = require('mysql');
    var connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '1532112',
        database: 'design',
        dateStrings: true,
        useConnectionPooling: true
    })
    connection.connect();
    var add_sql = 'DELETE FROM classify_all WHERE category=?';
    connection.query(add_sql, req.body.classifyAll, function (err, result) {
        if(err) {
            console.log('false:', err.message);
            res.send({flag: false});
            return ;
        }
        res.send({flag: true});
    })
    connection.end();
})

//教程总类编辑接口
app.post('/admin_updateClassifyAll', function (req, res) {
    var mysql = require('mysql');
    var connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '1532112',
        database: 'design',
        dateStrings: true,
        useConnectionPooling: true
    })
    connection.connect();
    var update_sql = 'UPDATE classify_all SET category=? WHERE category=?';
    var update_params = [req.body.newValue, req.body.category];
    connection.query(update_sql, update_params, function (err, result) {
        if(err) {
            console.log('false:', err.message);
            res.send({flag: false});
            return ;
        }
        res.send({flag: true});
    })
    connection.end();
})

//教程子类新增接口
app.post('/admin_addClassifyS', function (req, res) {
    var mysql = require('mysql');
    var connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '1532112',
        database: 'design',
        dateStrings: true,
        useConnectionPooling: true
    })
    connection.connect();
    var add_sql = 'INSERT INTO classify(name,category,photo,summary) VALUES (?,?,?,?)';
    var add_params = [req.body.name, req.body.category, req.body.photo, req.body.synopsis];
    connection.query(add_sql, add_params, function (err, result) {
        if(err) {
            console.log('false:', err.message);
            return;
        }
        res.send({flag: true});
    })
    connection.end();
})

//教程子类删除接口
app.post('/admin_deleteClassifyS', function (req, res) {
    var mysql = require('mysql');
    var connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '1532112',
        database: 'design',
        dateStrings: true,
        useConnectionPooling: true
    })
    connection.connect();
    var add_sql = 'DELETE FROM classify WHERE name=?';
    connection.query(add_sql, req.body.name, function (err, result) {
        if(err) {
            console.log('false:', err.message);
            res.send({flag: false});
            return ;
        }
        res.send({flag: true});
    })
    connection.end();
})

//教程子类编辑接口
app.post('/admin_updateClassifyS', function (req, res) {
    var mysql = require('mysql');
    var connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '1532112',
        database: 'design',
        dateStrings: true,
        useConnectionPooling: true
    })
    connection.connect();
    var update_sql = 'UPDATE classify SET name=? WHERE name=?';
    var update_params = [req.body.newValue, req.body.name];
    connection.query(update_sql, update_params, function (err, result) {
        if(err) {
            console.log('false:', err.message);
            res.send({flag: false});
            return ;
        }
        res.send({flag: true});
    })
    connection.end();
})

//教程子类图片上传接口
app.post('/admin_img', function(req, res, next) {
    // console.log(req.headers.host)

    /* 生成multiparty对象，并配置上传目标路径 */
    var form = new multiparty.Form();
    /* 设置编辑 */
    form.encoding = 'utf-8';
    //设置文件存储路劲
    form.uploadDir = './public/img';
    //设置文件大小限制
    form.maxFilesSize = 2 * 1024 * 1024;
    // form.maxFields = 1000;   //设置所有文件的大小总和
    //上传后处理
    form.parse(req, function(err, fields, files) {
        var filesTemp = JSON.stringify(files, null, 2);
        var filesTemp_s = JSON.parse(filesTemp);
        filesTemp_s.file[0].path = filesTemp_s.file[0].path.substr(6);
        filesTemp = JSON.stringify(filesTemp_s);
        if(err) {
            console.log('parse error:' + err);
        }else {

        }
        res.writeHead(200, {'content-type': 'text/plain;charset=utf-8'});
        res.end(filesTemp)
    })
})

//教程发布目录查询接口
app.post('/admin_catalog', function (req, res) {
    var mysql = require('mysql');
    var connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '1532112',
        database: 'design',
        dateStrings: true
    })
    connection.connect();
    var select_sql = 'SELECT DISTINCT title FROM course WHERE name=?';
    connection.query(select_sql, req.body.name, function (err, result) {
        if(err) {
            console.log('false', err.message);
            return ;
        }
        res.send(result);
    })
    connection.end();
})

//教程发布所属分类查询接口
app.post('/admin_category', function (req, res) {
    var mysql = require('mysql');
    var connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '1532112',
        database: 'design',
        dateStrings: true
    })
    connection.connect();
    var select_sql = 'SELECT category FROM classify WHERE name=?';
    connection.query(select_sql, req.body.name, function (err, result) {
        if(err) {
            console.log('false', err.message);
            return ;
        }
        res.send(result);
    })
    connection.end();
})

//教程发布接口
app.post('/admin_addCourse', function (req, res) {
    var mysql = require('mysql');
    var connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '1532112',
        database: 'design',
        dateStrings: true
    })
    connection.connect();
    var add_sql = 'INSERT INTO course(name,category,catalog,title,prev) VALUES(?,?,?,?,?)';
    var add_params = [req.body.name, req.body.category, req.body.catalog, req.body.title, req.body.prev];
    connection.query(add_sql, add_params, function (err, resut) {
        if(err) {
            console.log('false', err.message);
            res.send({flag: false});
            return ;
        }
        res.send({flag: true});
    })
    connection.end();
})

//教程修改接口
app.post('/admin_updateCourse', function (req, res) {
    var mysql = require('mysql');
    var connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '1532112',
        database: 'design',
        dateStrings: true
    })
    connection.connect();
    var update_sql = 'UPDATE course SET name=?,category=?,catalog=?,title=?,prev=? WHERE catanum=?';
    var update_params = [req.body.name, req.body.category, req.body.catalog, req.body.title, req.body.prev, req.body.catanum];
    connection.query(update_sql, update_params, function (err, resut) {
        if(err) {
            console.log('false', err.message);
            res.send({flag: false});
            return ;
        }
        res.send({flag: true});
    })
    connection.end();
})

//教程删除接口
app.post('/admin_deleteCourse', function (req, res) {
    var mysql = require('mysql');
    var connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '1532112',
        database: 'design',
        dateStrings: true
    })
    connection.connect();
    var delete_sql = 'DELETE FROM course WHERE catanum=?';
    connection.query(delete_sql, req.body.catanum, function (err, resut) {
        if(err) {
            console.log('false', err.message);
            res.send({flag: false});
            return ;
        }
        res.send({flag: true});
    })
    connection.end();
})

//问答发布用户查询接口
app.get('/admin_selectUser', function (req, res) {
    var mysql = require('mysql');
    var connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '1532112',
        database: 'design',
        dateStrings: true
    })
    connection.connect();
    var select_sql = 'SELECT * FROM user';
    connection.query(select_sql, function (err, result) {
        if(err) {
            console.log('false:', err.message);
            return ;
        }
        res.send(result);
    })
    connection.end();
})

//问答发布接口
app.post('/admin_addInte', function (req, res) {
    var mysql = require('mysql');
    var connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '1532112',
        database: 'design',
        dateStrings: true
    })
    connection.connect();
    var add_sql = 'INSERT INTO q_a(title,user,detail,time,img,user_img) VALUES(?,?,?,?,?,(SELECT user_img FROM user WHERE user=?))';
    var add_params = [req.body.title, req.body.user, req.body.detail, req.body.time, req.body.img, req.body.user];
    connection.query(add_sql, add_params, function (err, resut) {
        if(err) {
            console.log('false', err.message);
            res.send({flag: false});
            return ;
        }
        res.send({flag: true});
    })
    connection.end();
})

//问答修改接口
app.post('/admin_updateInte', function (req, res) {
    var mysql = require('mysql');
    var connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '1532112',
        database: 'design',
        dateStrings: true
    })
    connection.connect();
    var update_sql = 'UPDATE q_a SET title=?,user=?,detail=?,img=? WHERE id=?';
    var update_params = [req.body.title, req.body.user, req.body.detail, req.body.img, req.body.id];
    connection.query(update_sql, update_params, function (err, resut) {
        if(err) {
            console.log('false', err.message);
            res.send({flag: false});
            return ;
        }
        res.send({flag: true});
    })
    connection.end();
})

//问答删除接口
app.post('/admin_deleteInte', function (req, res) {
    var mysql = require('mysql');
    var connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '1532112',
        database: 'design',
        dateStrings: true
    })
    connection.connect();
    var delete_sql = 'DELETE FROM q_a WHERE id=?';
    connection.query(delete_sql, req.body.id, function (err, result) {
        if(err) {
            console.log('false', err.message);
            res.send({flag: false});
            return ;
        }
        res.send({flag: true});
    })
    connection.end();
})

//配置服务端口
var server = app.listen(3000, '127.0.0.1',function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log('server is listening at http://%s:%s', host, port);
})