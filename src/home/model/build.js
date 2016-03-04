'use strict';
/**
 * model
 */
export default class extends think.model.base {
    getBuildPersonal(user_id, subject_id) {
        return this.where({'user_id': user_id, 'subject_id': subject_id}).select();
    }
}