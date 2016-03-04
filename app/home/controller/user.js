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
    this._method = "_method";};_class.prototype.


  getAction = _regenerator2.default.mark(function getAction() {var 
    data, _modelInstance$where, 


    pk;return _regenerator2.default.wrap(function getAction$(_context) {while (1) {switch (_context.prev = _context.next) {case 0:data = undefined;console.log('callback', this.get('callback'));if (!this.id) {_context.next = 10;break;}_context.next = 5;return this.modelInstance.getPk();case 5:pk = _context.sent;_context.next = 8;return (
              this.modelInstance.where((_modelInstance$where = {}, _modelInstance$where[pk] = this.id, _modelInstance$where)).find());case 8:data = _context.sent;return _context.abrupt('return', 
            this.jsonp(this.success(data)));case 10:_context.next = 12;return (

              this.modelInstance.select());case 12:data = _context.sent;return _context.abrupt('return', 
            this.jsonp(data));case 14:case 'end':return _context.stop();}}}, getAction, this);});

  /**
   * before magic method
   * @return {Promise} []
   */_class.prototype.
  __before = function __before() {};return _class;}(think.controller.rest);exports.default = _class;