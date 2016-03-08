'use strict';

import Base from './base.js';

export default class extends Base {
    /**
     * index action
     * @return {Promise} []
     */
    async indexAction() {
        let self = this;
        let subjectid = self.get('id');
        if (!subjectid) {
            self.fail();
        }
        let subjectModel = self.model('subject');
        let subjectOne = await subjectModel.getSubjectById(subjectid);
        let printData = JSON.parse(subjectOne[0].text);
        self.assign({
            data: {
                subjectList: printData,
                pagetype: 1,
                httphost: 'http://' + self.http.host
            }
        });
        return self.display('index');
    }

    /**
     * 微信jssdk
     */
    async getsharecfAction() {
        var wechatMiddleware = require('think-wechat');
        think.middleware('parse_wechat', wechatMiddleware({
            pathname: 'wechat',    //默认，可配置为其他路径，与公众号对应的服务器URL设置一致
            route: {
                text: 'wechat/text', //文字转发
                image: 'wechat/image', //图片转发
                voice: 'wechat/voice', //语音转发
                video: 'wechat/video', //视频转发
                shortvideo: 'wechat/shortvideo', //小视频转发
                location: 'wechat/location', //地理位置转发
                link: 'wechat/link', //链接转发
                event: 'wechat/event', //推送事件转发
            },
            wechat: {
                token: '微信公众号token',
                appid: '微信公众号ID',
                encodingAESKey: '消息安全加密串'
            },
        }));
    }

    /**
     * 输出html文件
     */
    async releaseAction() {
        let self = this;
        let subjectid = self.post('subjectId');
        if (!subjectid) {
            self.fail();
        }
        let request = require('request');
        let fs = require('fs-extra');
        let getfile = 'http://' + self.http.host + '/wap?id=' + subjectid;
        let outfile = 'output/html/outfile' + subjectid + '.html';
        let getFileString = function (getfile) {
            let deferred = think.defer();
            request(getfile, function (err, res, body) {
                deferred.resolve(body);
            });
            return deferred.promise;
        };

        let outputFile = function (outfile, htmlstr) {
            let deferred = think.defer();
            fs.outputFile(outfile, htmlstr, function (err) {
                deferred.resolve(err);
            });
            return deferred.promise;
        }


        getFileString(getfile).done(function (reponse) {
            if (!reponse) {
                self.success({
                    err: 'getFileStringerr'
                })
            }
            outputFile(outfile, reponse).done(function (err) {
                self.success({
                    status: err,
                    message: reponse,
                    pageurl: outfile
                });
            });
        });
    }

}