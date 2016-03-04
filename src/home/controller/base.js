'use strict';

export default class extends think.controller.base {
    /**
     * some base method in here
     */
    formatTime(dt) {
        /**
         * 格式化数字，显示未两位数，小于10前面加0
         */
        var fillLen = function (n) {
            if (n < 10) {
                n = "0" + n;
            }
            return String(n);
        }
        /**
         * 格式化时间，显示为yyyy:MM:dd HH:mm:ss格式的字符日期
         * @param d Date类型的日期对象
         *
         */
        var formatTime = function (d) {
            var r = d.getFullYear() + "-" + fillLen(1 + d.getMonth()) + "-" + fillLen(d.getDate());
            r += " " + fillLen(d.getHours()) + ":" + fillLen(d.getMinutes()) + ":" + fillLen(d.getSeconds());
            return r;
        }
        return formatTime(dt);
    }
}