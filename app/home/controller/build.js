'use strict';var _regenerator = require('babel-runtime/regenerator');var _regenerator2 = _interopRequireDefault(_regenerator);var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);var _inherits2 = require('babel-runtime/helpers/inherits');var _inherits3 = _interopRequireDefault(_inherits2);exports.__esModule = true;var _base = require('./base.js');var _base2 = _interopRequireDefault(_base);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}var _class = function (_Base) {(0, _inherits3.default)(_class, _Base);function _class() {(0, _classCallCheck3.default)(this, _class);return (0, _possibleConstructorReturn3.default)(this, _Base.apply(this, arguments));}




    /**
     * build action
     * @return {Promise} []
     */_class.prototype.
    indexAction = function () {var ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {var 


            user_id, 
            subjectModel, 
            templateModel, 
            subjectOne, 
            printData, 










            _tmp_date, 
            _tmp_page_id;return _regenerator2.default.wrap(function _callee$(_context) {while (1) {switch (_context.prev = _context.next) {case 0: //auto render template file index_index.html
                            //return this.display();
                            user_id = this.cookie('username');subjectModel = this.model('subject');templateModel = this.model('template');subjectOne = undefined;printData = {};if (!this.get('tid')) {_context.next = 12;break;}_context.next = 8;return templateModel.getTemplateDetail(this.get('tid'));case 8:subjectOne = _context.sent;printData = JSON.parse(subjectOne[0].text);_context.next = 22;break;case 12:if (!this.get('id')) {_context.next = 19;break;}_context.next = 15;return subjectModel.getSubjectPersonal(user_id, this.get('id'));case 15:subjectOne = _context.sent;printData = JSON.parse(subjectOne[0].text);_context.next = 22;break;case 19: /*新建默认数据*/_tmp_date = new Date();_tmp_page_id = _tmp_date.getTime();printData = { "name": '新应用', 
                                "bgColor": 'rgb(255,255,255)', 
                                "pagePosition": 'auto', 
                                "pageAnimation": 'flow', 
                                "loop": true, 
                                "designSolutionWidth": 414, 
                                "designSolutionHeight": 608, 
                                "buttonColor": 'rgba(255,255,255,0.9)', 
                                "bgm": { 
                                    "url": '', 
                                    "autoPlay": 0, 
                                    "loop": 0 }, 

                                "weixin": { 
                                    "appId": '', 
                                    "imgUrl": '', 
                                    "link": '', 
                                    "title": '', 
                                    "desc": '' }, 

                                "pages": [{ 
                                    "bgImage": "", 
                                    "bgColor": "rgb(255,255,255)", 
                                    "bgColorLink": 0, 
                                    "isStretch": 1, 
                                    "id": _tmp_page_id, 
                                    "elements": [] }] };case 22:



                            console.log(printData);

                            this.assign({ 
                                data: { 
                                    subjectList: printData, 
                                    pagetype: 1 } });return _context.abrupt('return', 


                            this.display('index'));case 25:case 'end':return _context.stop();}}}, _callee, this);}));return function indexAction() {return ref.apply(this, arguments);};}();return _class;}(_base2.default);exports.default = _class;