'use strict';var _regenerator = require('babel-runtime/regenerator');var _regenerator2 = _interopRequireDefault(_regenerator);var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);var _inherits2 = require('babel-runtime/helpers/inherits');var _inherits3 = _interopRequireDefault(_inherits2);exports.__esModule = true;var _base = require('./base.js');var _base2 = _interopRequireDefault(_base);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}var _class = function (_Base) {(0, _inherits3.default)(_class, _Base);function _class() {(0, _classCallCheck3.default)(this, _class);return (0, _possibleConstructorReturn3.default)(this, _Base.apply(this, arguments));}




    /**
     * subject action
     * @return {Promise} []
     */_class.prototype.
    indexAction = function () {var ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {var 

            user_id, 
            subjectModel, 
            subjectList;return _regenerator2.default.wrap(function _callee$(_context) {while (1) {switch (_context.prev = _context.next) {case 0: //auto render template file index_index.html
                            user_id = this.cookie('username');subjectModel = this.model('subject');_context.next = 4;return subjectModel.getSubjectList(user_id, 1);case 4:subjectList = _context.sent;this.assign({ 
                                subjectList: subjectList });return _context.abrupt('return', 

                            this.display('index'));case 7:case 'end':return _context.stop();}}}, _callee, this);}));return function indexAction() {return ref.apply(this, arguments);};}();_class.prototype.


    updateAction = function () {var ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2() {var 
            user_id, 
            subjectModel, 
            subjectId, 
            affectedRows;return _regenerator2.default.wrap(function _callee2$(_context2) {while (1) {switch (_context2.prev = _context2.next) {case 0:user_id = this.cookie('username');subjectModel = this.model('subject');subjectId = this.post('updateid');_context2.next = 5;return subjectModel.where({ 
                                subject_id: subjectId, 
                                user_id: user_id }).
                            update({ 
                                name: this.post('appName'), 
                                text: this.post('pages'), 
                                updateTime: new Date() });case 5:affectedRows = _context2.sent;

                            this.success({ 
                                affectedRows: affectedRows, 
                                subjectId: subjectId, 
                                message: '更新成功' });case 7:case 'end':return _context2.stop();}}}, _callee2, this);}));return function updateAction() {return ref.apply(this, arguments);};}();_class.prototype.



    addAction = function () {var ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee3() {var 
            user_id, 
            subjectId, 
            subjectModel, 
            addData, 







            result;return _regenerator2.default.wrap(function _callee3$(_context3) {while (1) {switch (_context3.prev = _context3.next) {case 0:user_id = this.cookie('username');subjectId = think.md5(new Date().getTime() + "");subjectModel = this.model('subject');addData = { name: this.post('appName'), text: this.post('pages'), updateTime: this.formatTime(new Date()), createTime: this.formatTime(new Date()), user_id: user_id, subject_id: subjectId };_context3.next = 6;return subjectModel.add(addData);case 6:result = _context3.sent;
                            this.success({ 
                                subjectId: subjectId, 
                                message: '保存成功' });case 8:case 'end':return _context3.stop();}}}, _callee3, this);}));return function addAction() {return ref.apply(this, arguments);};}();_class.prototype.



    deleteAction = function () {var ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee4() {var 
            subjectModel, 
            user_id, 
            subjectId, 
            result;return _regenerator2.default.wrap(function _callee4$(_context4) {while (1) {switch (_context4.prev = _context4.next) {case 0:subjectModel = this.model('subject');user_id = this.cookie('username');subjectId = this.post('subjectId');_context4.next = 5;return subjectModel.where({ 
                                subject_id: subjectId, 
                                user_id: user_id }).
                            delete();case 5:result = _context4.sent;
                            this.success({ 
                                subjectId: subjectId, 
                                message: '删除成功' });case 7:case 'end':return _context4.stop();}}}, _callee4, this);}));return function deleteAction() {return ref.apply(this, arguments);};}();return _class;}(_base2.default);exports.default = _class;