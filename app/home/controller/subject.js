'use strict';
/**
 * rest controller
 * @type {Class}
 */var _regenerator = require('babel-runtime/regenerator');var _regenerator2 = _interopRequireDefault(_regenerator);var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);var _inherits2 = require('babel-runtime/helpers/inherits');var _inherits3 = _interopRequireDefault(_inherits2);exports.__esModule = true;function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}var _class = function (_think$controller$res) {(0, _inherits3.default)(_class, _think$controller$res);function _class() {(0, _classCallCheck3.default)(this, _class);return (0, _possibleConstructorReturn3.default)(this, _think$controller$res.apply(this, arguments));}

    /**
     * init
     * @param  {Object} http []
     * @return {}      []
     */_class.prototype.
    init = function init(http) {
        _think$controller$res.prototype.init.call(this, http);
        this._method = "_method";};


    /**
     * before magic method
     * @return {Promise} []
     */_class.prototype.
    __before = function __before() {};



    /**
     * get
     * @returns {*}
     */_class.prototype.
    getAction = _regenerator2.default.mark(function getAction() {var 
        data, _modelInstance$where, 

        pk;return _regenerator2.default.wrap(function getAction$(_context) {while (1) {switch (_context.prev = _context.next) {case 0:data = undefined;if (!this.id) {_context.next = 11;break;}_context.next = 4;return this.modelInstance.getPk();case 4:pk = _context.sent;_context.next = 7;return (
                            this.modelInstance.where((_modelInstance$where = {}, _modelInstance$where[pk] = this.id, _modelInstance$where)).find());case 7:data = _context.sent;return _context.abrupt('return', 
                        this.success(data));case 11:if (!
                        this.get('action')) {_context.next = 16;break;}
                        console.log('you are track in get', this.get('action'), this.post('updateid'));return _context.abrupt('return', 
                        this.success());case 16:return _context.abrupt('return', 

                        this.fail());case 17:case 'end':return _context.stop();}}}, getAction, this);});



    /**
     * post
     * @returns {*}
     */_class.prototype.
    postAction = _regenerator2.default.mark(function postAction() {var 
        pk, 
        data, 
        model, 
        user_id, 

        action, 




        affectedRows;return _regenerator2.default.wrap(function postAction$(_context2) {while (1) {switch (_context2.prev = _context2.next) {case 0:_context2.next = 2;return this.modelInstance.getPk();case 2:pk = _context2.sent;data = this.post();model = this.model("subject");user_id = this.cookie('username');if (!this.get('action')) {_context2.next = 13;break;}action = this.get('action');console.log('action', action);if (action == 'save') {if (this.post('updateid')) {console.log('update');affectedRows = model.where({ 
                                    subject_id: this.post('updateid') }).
                                update({ 
                                    name: this.post('appName'), 
                                    text: this.post('pages'), 
                                    updateTime: new Date() });} else 

                            {
                                console.log('add');
                                //let result = model.add({
                                //    name: this.post('appName'),
                                //    text: this.post('pages'),
                                //    updateTime: new Date(),
                                //    createTime: new Date(),
                                //    user_id: this.cookie('username')
                                //});
                            }}return _context2.abrupt('return', 

                        this.success());case 13:return _context2.abrupt('return', 

                        this.fail());case 14:case 'end':return _context2.stop();}}}, postAction, this);});return _class;}(think.controller.rest);exports.default = _class;