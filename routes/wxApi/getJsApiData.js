'use strict';
const fs = require('fs');
const request = require('request');
const getToken = require('getWebToken');
const sha1 = require('sha1');
const db = require('radis');

function getJsApiTicket() {
    return new Promise(function (resolve, reject) {
        getToken().then(function (body) {
            body = JSON.parse(body);
            var token = body.access_token;
            var reqUrl = 'https://api.weixin.qq.com/cgi-bin/ticket/getticket?access_token=' + token + '&type=jsapi';
            var options = {
                method: 'get',
                url: reqUrl
            };
            request(options, function (err, res, body) {
                if (res) {
                    resolve(body);
                } else {
                    reject(err);
                }
            })
        }).catch(function (err) {
            throw (err)
        });
    })
}
//noncestr
function getNonceStr() {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (var i = 0; i < 16; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
}
//timestamp
function getTimestamp() {
    var time = String(new Date().valueOf());
    return time.substr(0, time.length - 3);
}

function getSign(jsApiTicket, noncestr, timestamp, url) {
    console.log("******************");
    console.log(jsApiTicket);
    var sortData = "jsapi_ticket=" + jsApiTicket + "&noncestr=" + noncestr + "×tamp=" + timestamp + "&url=" + url;

    return sha1(sortData);
}

//返回数据分别为sign, timestamp, noncestr
function getJsApiData(clientUrl) {
    var noncestr = getNonceStr();
    var timestamp = getTimestamp();
    return getJsApiTicket().then(function (data) {
        return [getSign(JSON.parse(data).ticket, noncestr, timestamp, clientUrl), timestamp, noncestr];
    })
}

module.exports = getJsApiData;