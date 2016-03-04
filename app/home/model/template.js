'use strict';
/**
 * model
 */var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);var _inherits2 = require('babel-runtime/helpers/inherits');var _inherits3 = _interopRequireDefault(_inherits2);exports.__esModule = true;function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}var _class = function (_think$model$base) {(0, _inherits3.default)(_class, _think$model$base);function _class() {(0, _classCallCheck3.default)(this, _class);return (0, _possibleConstructorReturn3.default)(this, _think$model$base.apply(this, arguments));}_class.prototype.

    getTemplateList = function getTemplateList(currentPage) {
        return this.getTemplateListByPage(currentPage, 10);};_class.prototype.


    getTemplateListByPage = function getTemplateListByPage(currentPage, everyPage) {
        return this.page(currentPage, everyPage).select();};_class.prototype.


    getTemplateDetail = function getTemplateDetail(tid) {
        return this.where({ 'id': tid }).select();};return _class;}(think.model.base);exports.default = _class;