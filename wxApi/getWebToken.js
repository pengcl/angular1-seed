'use strict';
const request = require('request');
const qs = require('querystring');
const config = require('wechatConfig');

function getToken() {

    var reqUrl = 'https://api.weixin.qq.com/cgi-bin/token?';
    var params = {
        grant_type: 'client_credential',
        appid: config.appid,
        secret: config.appsecret
    };

    var options = {
        method: 'get',
        url: reqUrl + qs.stringify(params)
    };
    console.log(options.url);

    return new Promise(function (resolve, reject) {
        request(options, function (err, res, body) {
                if (res) {
                    console.log(body);
                    resolve(body);
                } else {

                    reject(err);
                }
            }
        )
    })
}

module.exports = getToken;