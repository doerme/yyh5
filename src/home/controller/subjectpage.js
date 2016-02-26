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
}