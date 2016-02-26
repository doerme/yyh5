'use strict';

import Base from './base.js';

export default class extends Base {
    /**
     * index action
     * @return {Promise} []
     */
    async indexAction() {
        //auto render template file index_index.html
        //return this.display();
        let templateModel = this.model('template');
        let templateList = await templateModel.getTemplateList(1);
        this.assign({
            templateList: templateList
        });
        return this.display('index');
    }
}