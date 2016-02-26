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
  init(http){
    super.init(http);
  }

  * getAction(){
    let data;
    console.log('callback',this.get('callback'));
    if (this.id) {
      let pk = yield this.modelInstance.getPk();
      data = yield this.modelInstance.where({[pk]: this.id}).find();
      return this.jsonp(this.success(data));
    }
    data = yield this.modelInstance.select();
    return this.jsonp(data);
  }
  /**
   * before magic method
   * @return {Promise} []
   */
  __before(){
    
  }
}