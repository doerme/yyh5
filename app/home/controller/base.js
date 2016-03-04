'use strict';var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);var _possibleConstructorReturn2 = require("babel-runtime/helpers/possibleConstructorReturn");var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);var _inherits2 = require("babel-runtime/helpers/inherits");var _inherits3 = _interopRequireDefault(_inherits2);exports.__esModule = true;function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}var _class = function (_think$controller$bas) {(0, _inherits3.default)(_class, _think$controller$bas);function _class() {(0, _classCallCheck3.default)(this, _class);return (0, _possibleConstructorReturn3.default)(this, _think$controller$bas.apply(this, arguments));}


    /**
     * some base method in here
     */_class.prototype.
    formatTime = function formatTime(dt) {
        /**
         * 格式化数字，显示未两位数，小于10前面加0
         */
        var fillLen = function fillLen(n) {
            if (n < 10) {
                n = "0" + n;}

            return String(n);};

        /**
         * 格式化时间，显示为yyyy:MM:dd HH:mm:ss格式的字符日期
         * @param d Date类型的日期对象
         *
         */
        var formatTime = function formatTime(d) {
            var r = d.getFullYear() + "-" + fillLen(1 + d.getMonth()) + "-" + fillLen(d.getDate());
            r += " " + fillLen(d.getHours()) + ":" + fillLen(d.getMinutes()) + ":" + fillLen(d.getSeconds());
            return r;};

        return formatTime(dt);};return _class;}(think.controller.base);exports.default = _class;