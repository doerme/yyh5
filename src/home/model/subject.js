'use strict';
/**
 * model
 */
export default class extends think.model.base {
    getSubjectList(userId, currentPage) {
        return this.getSubjectListByPage(userId, currentPage, 30);
    }

    getSubjectListByPage(userId, currentPage, everyPage) {
        return this.where({'user_id': userId}).page(currentPage, everyPage).select();
    }

    getSubjectPersonal(user_id, subject_id) {
        return this.where({'user_id': user_id, 'subject_id': subject_id}).select();
    }
}