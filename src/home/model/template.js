'use strict';
/**
 * model
 */
export default class extends think.model.base {
    getTemplateList(currentPage) {
        return this.getTemplateListByPage(currentPage, 10);
    }

    getTemplateListByPage(currentPage, everyPage) {
        return this.page(currentPage, everyPage).select();
    }

    getTemplateDetail(tid) {
        return this.where({'id': tid}).select();
    }
}