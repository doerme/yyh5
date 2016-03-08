var ajaxRun = function (apiurl, param, callback) {
    var urlbase = '';
    $.ajax({
        url: urlbase + apiurl,
        data: param,
        dataType: 'JSON',
        success: callback,
        scriptCharset: 'utf-8',
        timeout: 12000,
        type: "POST",
        error: function (XMLHttpRequest, textStatus) {
            alertDialog('连接超时，请稍后再访问 ' + callback + textStatus);
        }
    })
}

var alertDialog = function (msg, callback) {
    var d = dialog({
        content: msg,
        okValue: '确定',
        ok: function () {
            if (callback) {
                callback();
            }
            this.close().remove();
            return true;
        }
    });
    return d.showModal();
}

var createUploadfyBox = function () {
    var upload_selector = '#gs_bgm_url_uploader,#gs_weixin_imgurl_uploader';
    for (var gs_n = 1; gs_n <= $('.pg_item').size(); gs_n++) {
        upload_selector += ',#page_bg_upload_' + gs_n;
        for (var gs_m = 1; gs_m < 50; gs_m++) {
            upload_selector += ',#page_bg_upload_' + gs_n + '_' + gs_m;
        }
    }

    upload1 = $(upload_selector)
    // logger.debug(["createUploadfyBox",upload1]);
    upload1.uploadify({
        // buttonImage   : '/assets/css/images/uploadify.png',
        swf: '/static/swf/uploadify.swf',
        uploader: 'http://upload.yyembed.yy.com/webUploadFiles',
        height: 34,
        width: 81,
        fileObjName: 'files',
        formData: {bucketName: 'makefriendbucket'},
        onSelect: function () {
        },
        onUploadSuccess: function (file, data, response) {
            // logger.debug(['onUploadSuccess',this,file,data,response]);
            var json = $.parseJSON(data);

            if (json.data.code == 2) {
                // user.showLoginBox();
                alertDialog(json.data.message);
                return;
            }

            var url = json.data.list[0].fileUrl;
            var group = this.button.parents(".input-group");

            group.find(".form-control:first").val(url).trigger('input');

            var aim_obj = this.button.parents('.j_btn_upload').prev('.j_preview_item');
            var _tmp_img = new Image();
            _tmp_img.src = url;
            _tmp_img.onload = function () {
                aim_obj.find('.item_img').attr('src', url);
                aim_obj.css({'width': '180px', 'height': 180 * _tmp_img.height / _tmp_img.width})
            }

            // // logger.debug([this[0],$(this[0]).parent()]);
            // var preview = $(".upFileBtn:eq("+index+")");
            // var url = json.data.list[0].fileUrl;
            // preview.attr("src",url);
            // imgs[index] = url;
        }
    });
}

var setUploadBox = function (jobj) {
    jobj.uploadify({
        // buttonImage   : '/assets/css/images/uploadify.png',
        swf: '/static/swf/uploadify.swf',
        uploader: 'http://upload.yyembed.yy.com/webUploadFiles',
        height: 30,
        width: 80,
        fileObjName: 'files',
        formData: {bucketName: 'makefriendbucket'},
        onSelect: function () {
        },
        onUploadSuccess: function (file, data, response) {
            // logger.debug(['onUploadSuccess',this,file,data,response]);
            var json = $.parseJSON(data);

            if (json.data.code == 2) {
                // user.showLoginBox();
                alertDialog(json.data.message);
                return;
            }

            var url = json.data.list[0].fileUrl;
            var group = this.button.parents(".input-group");

            group.find(".form-control:first").val(url).trigger('input');

            var aim_obj = this.button.parents('.j_btn_upload').prev('.j_preview_item');
            var _tmp_img = new Image();
            _tmp_img.src = url;
            _tmp_img.onload = function () {
                aim_obj.find('.item_img').attr('src', url);
                aim_obj.css({'width': '180px', 'height': 180 * _tmp_img.height / _tmp_img.width})
            }

        }
    });
}

var commonCallBack = function (jdata) {
    alertDialog(jdata.data.message, function () {
        window.location.reload();
    })
}

var outPutFile = function (aid) {
    if (!aid) {
        var d = dialog({
            content: '要先保存才能发布',
            okValue: '确定',
            width: 200,
            ok: function () {
            }
        });
        d.showModal();
        return;
    }
    var d = dialog({
        content: '确认发布应用?(请先保存)',
        okValue: '确定',
        width: 200,
        ok: function () {
            ajaxRun('/wap/publish?id=' + aid, {}, commonCallBack);
            //return false;
        },
        cancelValue: '取消',
        cancel: function () {

        }
    });
    d.showModal();

}

var saveSubject = function (type) {
    var page_data = {};
    var api_url;

    if (type == 1) {
        page_data = JSON.stringify(getOutPutData());
    }

    if (type == 2) {
        page_data = aceeditor.getValue();
    }

    var data = {
        'updateid': getUrlParam('id'),
        'appName': $('#gs_name').val(),
        'pages': page_data
    }

    if (getUrlParam('id')) {
        api_url = '/subjectpage/update';
    } else {
        api_url = '/subjectpage/add';
    }

    $.ajax({
        url: api_url,
        dataType: "json",
        data: data,
        type: "POST"
    }).done(function (json) {
        var _insertId = json.data.subjectId;
        if (json.errno == 0) {
            var _tmp_d = dialog({
                content: json.data.message,
                okValue: '确定',
                ok: function () {
                    if (typeof(_insertId) != 'undefined') {
                        window.location.href = '/build?id=' + _insertId;
                    } else {
                        window.location.reload();
                    }
                }
            });
            _tmp_d.width(250).show();
        } else {
            alertDialog(json.data.message);
        }

    })

};

var getOutPutData = function () {
    var _result_json = {
        "name": $('#gs_name').val(),
        "bgColor": $('#gs_bg_color').val(),
        "pagePosition": "auto",
        "pageAnimation": "flow",
        "loop": true,
        "designSolutionWidth": $('#gs_custom_width').val(),
        "designSolutionHeight": $('#gs_custom_height').val(),
        "buttonColor": "rgba(255,255,255,0.9)",
        "bgm": {
            "url": $('#gs_bgm_url').val(),
            "autoPlay": $('#gs_bgm_autoplay').is(':checked') ? 1 : 0,
            "loop": $('#gs_bgm_loop').is(':checked') ? 1 : 0
        },
        "weixin": {
            "appId": "",
            "imgUrl": $('#gs_weixin_imgurl').val(),
            "link": $('#gs_weixin_link').val(),
            "title": $('#gs_weixin_title').val(),
            "desc": $('#gs_weixin_desc').val()
        },
        "pages": []
    };

    /*page*/
    $('.section .pg_item').each(function () {

        var _page_json = {
            "bgImage": $(this).find('.j_bg_image').val(),
            "bgColor": $(this).find('.pg_bg_color').val(),
            "bgColorLink": $(this).find('.pg_bg_color_link').is(':checked') ? 1 : 0,
            'isStretch': $(this).find('.j_stretch_bg').is(':checked') ? 1 : 0,
            "id": $(this).data('id'),
            "elements": []
        }
        /*item*/
        $(this).find('.j_preview_item').each(function () {
            var _item_json = {
                "id": $(this).attr('id'),
                "name": $(this).data('id'),
                "type": $(this).data('type'),
                "image": $(this).find('.item_wrap').children('img').attr('src'),
                "text": $.trim($(this).find('.item_wrap').children('.item_txt').html()),
                "textColor": $(this).find('.item_txt').css('color'),
                "textSize": $(this).find('.item_txt').css('font-size'),
                "x": $(this).attr('data-x'),
                "y": $(this).attr('data-y'),
                "relativePosition": "elementWrap",
                "zIndex": $(this).css("z-index"),
                "align": "none",
                "width": $(this).css("width"),
                "height": $(this).css("height"),
                "animation": $(this).attr('animation'),
                "animationIteration": $(this).attr('animationiteration'),
                "animationDuration": $(this).attr('animationduration'),
                "animationDelay": $(this).attr('animationdelay')
            }
            _page_json.elements.push(_item_json);
        });
        /*item end*/
        _result_json.pages.push(_page_json);

    });
    /*page end*/


    return _result_json;

}

var deleteSubject = function (subjectId) {
    var data = {
        subjectId: subjectId
    };

    var d = dialog({
        content: '确认删除应用?',
        okValue: '确定',
        width: 200,
        ok: function () {
            ajaxRun('/subjectpage/delete', data, commonCallBack);
        },
        cancelValue: '取消',
        cancel: function () {

        }
    });
    d.showModal();

    return false;

};

var unpublishSubject = function (subjectId) {
    var data = {
        subjectId: subjectId
    };

    var d = dialog({
        content: '确认下线应用?',
        okValue: '确定',
        width: 200,
        ok: function () {
            ajaxRun('/wap/unpublish', data, commonCallBack);

        },
        cancelValue: '取消',
        cancel: function () {

        }
    });
    d.showModal();

    return false;
}

var setBuildPage = function (subjectId) {
    var data = {
        subjectId: subjectId
    };
    window.setBuildPageCallBack = function (jdata) {
        aceeditor_2.setValue(jdata.data.message);
    }
    ajaxRun('/wap/release', data, setBuildPageCallBack);

}