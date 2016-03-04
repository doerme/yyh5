'use strict';

import Base from './base.js';

export default class extends Base {
    /**
     * build action
     * @return {Promise} []
     */
    async indexAction() {
        //auto render template file index_index.html
        //return this.display();
        let user_id = this.cookie('username');
        let subjectModel = this.model('subject');
        let templateModel = this.model('template');
        let subjectOne;
        let printData = {};
        if (this.get('tid')) {
            /*从模板拿数据*/
            subjectOne = await templateModel.getTemplateDetail(this.get('tid'));
            printData = JSON.parse(subjectOne[0].text);
        } else if (this.get('id')) {
            /*从用户应用中拿数据*/
            subjectOne = await subjectModel.getSubjectPersonal(user_id, this.get('id'));
            printData = JSON.parse(subjectOne[0].text);
        } else {
            /*新建默认数据*/
            let _tmp_date = new Date();
            let _tmp_page_id = _tmp_date.getTime();
            printData = {
                "name": '新应用',
                "bgColor": 'rgb(255,255,255)',
                "pagePosition": 'auto',
                "pageAnimation": 'flow',
                "loop": true,
                "designSolutionWidth": 414,
                "designSolutionHeight": 608,
                "buttonColor": 'rgba(255,255,255,0.9)',
                "bgm": {
                    "url": '',
                    "autoPlay": 0,
                    "loop": 0
                },
                "weixin": {
                    "appId": '',
                    "imgUrl": '',
                    "link": '',
                    "title": '',
                    "desc": ''
                },
                "pages": [{
                    "bgImage": "",
                    "bgColor": "rgb(255,255,255)",
                    "bgColorLink": 0,
                    "isStretch": 1,
                    "id": _tmp_page_id,
                    "elements": []
                }]
            };
        }
        console.log(printData);

        this.assign({
            data: {
                subjectList: printData,
                pagetype: 1
            }
        });
        return this.display('index');
    }
}