'use strict';
/**
 * rest controller
 * @type {Class}
 */
export default class extends think.controller.rest {
    /**
     * init
     * @param  {Object} http []
     * @return {}      []
     */
    init(http) {
        super.init(http);
        this._method = "_method";
    }

    /**
     * before magic method
     * @return {Promise} []
     */
    __before() {

    }

    /**
     * get
     * @returns {*}
     */
    * getAction() {
        let data;
        if (this.id) {
            let pk = yield this.modelInstance.getPk();
            data = yield this.modelInstance.where({[pk]: this.id}).find();
            return this.success(data);
        } else if (this.get('action')) {
            console.log('you are track in get', this.get('action'), this.post('updateid'));
            return this.success();
        } else {
            return this.fail();
        }
    }

    /**
     * post
     * @returns {*}
     */
    * postAction() {
        let pk = yield this.modelInstance.getPk();
        let data = this.post();
        let model = this.model("subject");
        let user_id = this.cookie('username');
        if (this.get('action')) {
            let action = this.get('action');
            console.log('action', action);
            if (action == 'save') {
                if (this.post('updateid')) {
                    console.log('update');
                    let affectedRows = model.where({
                        subject_id: this.post('updateid')
                    }).update({
                        name: this.post('appName'),
                        text: this.post('pages'),
                        updateTime: new Date()
                    });
                } else {
                    console.log('add');
                    //let result = model.add({
                    //    name: this.post('appName'),
                    //    text: this.post('pages'),
                    //    updateTime: new Date(),
                    //    createTime: new Date(),
                    //    user_id: this.cookie('username')
                    //});
                }
            }
            return this.success();
        } else {
            return this.fail();
        }
    }
}