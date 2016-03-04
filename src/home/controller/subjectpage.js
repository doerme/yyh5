'use strict';

import Base from './base.js';

export default class extends Base {
    /**
     * subject action
     * @return {Promise} []
     */
    async indexAction() {
        //auto render template file index_index.html
        let user_id = this.cookie('username');
        let subjectModel = this.model('subject');
        let subjectList = await subjectModel.getSubjectList(user_id, 1);
        this.assign({
            subjectList: subjectList
        });
        return this.display('index');
    }

    async updateAction() {
        let user_id = this.cookie('username');
        let subjectModel = this.model('subject');
        let subjectId = this.post('updateid');
        let affectedRows = await subjectModel.where({
            subject_id: subjectId,
            user_id: user_id
        }).update({
            name: this.post('appName'),
            text: this.post('pages'),
            updateTime: new Date()
        });
        this.success({
            affectedRows: affectedRows,
            subjectId: subjectId,
            message: '更新成功'
        });
    }

    async addAction() {
        let user_id = this.cookie('username');
        let subjectId = think.md5((new Date().getTime()) + "");
        let subjectModel = this.model('subject');
        let addData = {
            name: this.post('appName'),
            text: this.post('pages'),
            updateTime: this.formatTime(new Date()),
            createTime: this.formatTime(new Date()),
            user_id: user_id,
            subject_id: subjectId
        };
        let result = await subjectModel.add(addData);
        this.success({
            subjectId: subjectId,
            message: '保存成功'
        });
    }

    async deleteAction() {
        let subjectModel = this.model('subject');
        let user_id = this.cookie('username');
        let subjectId = this.post('subjectId');
        let result = await subjectModel.where({
            subject_id: subjectId,
            user_id: user_id
        }).delete();
        this.success({
            subjectId: subjectId,
            message: '删除成功'
        });
    }

}