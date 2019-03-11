var http = require('http');
var cherrio = require('cheerio');
var express = require('express');

var app = express();
// var xlsx = require('node-xlsx');
// var fs = require('fs');

var url  = 'http://128.23.79.180:8080/info/03/03.html';

http.get(url, function (res) {
    var html = '';
    res.on('data', function (data) {
        html += data;
    })
    res.on('end', function () {
        var listData = getListData(html);
        printInfo(listData);
    });
}).on('error', function () {
    console.log('数据出错');
})

function getListData(html) {
    if (html) {
        var $ = cherrio.load(html);
        var list = $('#articleContent');
        var listData = [];

        list.children().each(function (item) {
            var pic = $(this);
            var pic_html = pic.text() == undefined ? '' : pic.text();
            // var pic_html = pic.children('img').attr('src') == undefined ? pic.text().trim() : pic.children('img').attr('src');
            // var pic_child_h = pic.children('h4').text() == undefined ? '' : pic.children('h4').text().trim();
            // var pic_child_s = pic.children('strong').text() == undefined ? '' : pic.children('strong').text().trim();
            // var pic_href = pic.attr('href') == undefined ? '\n' : pic.attr('href');
            // var pic_text = pic.text() == undefined ? '' : pic.text().trim();

            listData.push({
                pic_html: pic
            });
        });
        // var v_html = list.html();
        // listData.push({
        //     pic_html: v_html
        // })
        return listData;
    } else {
        console.log('无数据');
    }
}

function printInfo(listData) {
    listData.forEach(function (item) {
        var p = item;
        var pic_html = item.pic_html;
    //     app.get('/test', function (req, res) {
    //         listData.forEach(function (item) {
    //             var p = item;
    //             var pic_html = item.pic_html;
    //             console.log(pic_html);
    //             res.status(200),
    //                 res.send(pic_html);
    //         })
    //
    //         // return listData;
    //     })
    //     var server = app.listen(4000, '127.0.0.1',function () {
    //         var host = server.address().address;
    //         var port = server.address().port;
    //         console.log('server is listening at http://%s:%s', host, port);
    //     })
        // console.log(pic_html);
        // setTimeout(function () {
        //     console.log(pic_child_s);
        // }, 1000);
        // var buffer = xlsx.build([
        //     {
        //         name: 'sheet',
        //         pic_text: pic_text
        //     }
        // ])
        // fs.writeFileSync('test01.xlsx',buffer, {'flag': 'w'});
        // console.log(pic_href);
        // console.log('\n');
    })
}
