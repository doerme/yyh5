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
        let subject_id = this.get('id');
        let subjectModel = this.model('subject');
        let subjectOne = await subjectModel.getSubjectPersonal(user_id, subject_id);
        let printData = {};
        //console.log('before', subjectOne);
        printData = JSON.parse(subjectOne[0].text);
        //console.log('after', printData);
        this.assign({
            data: {
                subjectList: printData,
                pagetype: 1
            }
        });
        return this.display('index');
    }
}