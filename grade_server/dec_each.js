var http = require('http');
var cherrio = require('cheerio');
// var xlsx = require('node-xlsx');
// var fs = require('fs');

var url  = 'E:\\CodeBase\\Node project\\grade_server\\public\\info\\01\\01.html';

http.get(url, function (res) {
    var html = '';
    res.on('data', function (data) {
        html += data;
    })
    res.on('end', function () {
        console.log(html);
        // var listData = getListData(html);
        // printInfo(listData);
    });
}).on('error', function () {
    console.log('数据出错');
})

function getListData(html) {
    if (html) {
        console.log(html);
        var $ = cherrio.load(html);
        var list = $('meta[name="description"]');
        var listData = [];

        // list.children().each(function (item) {
        //     var pic = $(this);
        //     // var pic_href = pic.attr('href') == undefined ? '\n' : pic.attr('href');
        //     var pic_text = pic.attr('content') == undefined ? '' : pic.attr('content').trim();
        //
        //     listData.push({
        //         // pic_href: pic_href,
        //         pic_text: pic_text
        //     });
        // });
        return listData;
    } else {
        console.log('无数据');
    }
}

function printInfo(listData) {
    listData.forEach(function (item) {
        var p = item;
        // var pic_href = item.pic_href;
        // var pic_text = item.pic_text;
        // console.log( pic_text);
        // setTimeout(function () {
        //     console.log(pic_href);
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