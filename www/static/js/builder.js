$(document).ready(function () {
    (function () {
         setPageBt();
         setCanvasHeight();
          
        var pg_preview_w = parseInt($(".pg_preview").css("width")),
            pg_preview_h = parseInt($(".pg_preview").css("height"));


        interact('.j_preview_item')
            .draggable({
                // enable inertial throwing
                inertia: true,
                // keep the element within the area of it's parent（拖拽的范围）
                restrict: {
                    restriction: ".pg_preview",
                // endOnly: true,
                    elementRect: { top: 0, left: 0, bottom: 0, right: 0}
                },
                // call this function on every dragmove event（拖拽则执行的函数）
                onmove: dragMoveListener,
                // call this function on every dragend event（拖拽停止后执行的函数）
                onend: function (event) {
                    $('.pg_line_v,.pg_line_h').hide();
                    var textEl = event.target.querySelector('p');

                    textEl && (textEl.textContent = 'moved a distance of ' + (Math.sqrt(event.dx * event.dx + event.dy * event.dy) | 0) + 'px');
                }
            })
            .resizable({
                edges: { left: false, right: true, bottom: true, top: false }
                //invert: 'reposition'
            })
            .on('dblclick', function (event) {

                var target = event.target;

                //图片不用编辑
                if($(event.currentTarget).data('type')=='image'){
                    return;
                }
                //双击文本item时，显示输入框，并将输入文字同步到显示元素上
                if ($(event.currentTarget).find(".j_item_txt").length > 0) {

                    $(event.currentTarget).find(".j_item_txt").show().focus();
                    $(target).siblings(".item_wrap").hide();

                    //输入框输入事件绑定
                    $(event.currentTarget).on("keyup", ".j_item_txt", function () {

                        var domHtml = $(event.currentTarget).find(".j_item_txt").val(),
                            lg = domHtml.length;

                        $(target).siblings(".item_wrap").find(".item_txt").addClass("change-txt").attr("data-lg", lg).html(domHtml);
                    });
                }
                $('.selected').next('.j_btn_upload').hide();
                $('.selected').removeClass('selected');
                $(event.currentTarget).addClass('selected').siblings(".j_preview_item");

            })
            .on('click', function (event) {

                var target = event.target;
                $('.selected').next('.j_btn_upload').hide();
                $('.selected').removeClass('selected'); 
                $(event.currentTarget).addClass('selected').siblings(".j_preview_item");
                var target_top=parseFloat($(event.currentTarget).css('top'));
                var target_left=parseFloat($(event.currentTarget).css('left'));
                $(event.currentTarget).next('.j_btn_upload').show().css({'top':target_top-30 + 'px','left':(target_left*1+60) + 'px','z-index':$(event.currentTarget).css('z-index')});

                //如果不是文本类型，则文本控制按钮不可用
                if ($(event.currentTarget).attr("data-type") == "text") {
                    $(event.currentTarget).parentsUntil(".pg-item").find(".setting-link").find(".btn-default").attr("disabled", false);
                } else {
                    $(event.currentTarget).parentsUntil(".pg-item").find(".setting-link").find(".btn-default").attr("disabled", "disabled");
                }

                $(event.currentTarget).parentsUntil(".pg-item").find(".setting-detail-link,.setting-detail-color,.setting-detail-animation-on").addClass("hide");



            })
            .on('resizemove', function (event) {

                var target = event.target,
                    x = (parseFloat(target.getAttribute('data-x')) || 0),
                    y = (parseFloat(target.getAttribute('data-y')) || 0);

                if (x + event.rect.width + 2 > pg_preview_w) {
                    event.rect.width = pg_preview_w - 2 - x;
                }
                if (y + event.rect.height > pg_preview_h) {
                    event.rect.height = pg_preview_h - 2 - y;
                }

                // update the element's style
                target.style.width = event.rect.width + 'px';
                target.style.height = event.rect.height + 'px';

                target.style.top = y;
                target.style.left = x;

                target.setAttribute('data-x', x);
                target.setAttribute('data-y', y);

                if (target.getAttribute('data-type') === 'text') {
                    var txt_obj = $(target).find(".item_wrap .item_txt"),
                        lg = 6;
                    if ($(txt_obj).text().trim().length > 1) {
                        lg = $(txt_obj).text().trim().length
                    }

                    var checkreg=/[\u4e00-\u9fa5]+/
                    if(!checkreg.test($(txt_obj).text())){
                        lg/=2;
                    }

                    if (event.rect.width / lg < event.rect.height) {
                        $(target).find(".item_wrap div").css({
                            fontSize: parseInt((event.rect.width / lg)) + 'px'
                        });
                    } else {
                        $(target).find(".item_wrap div").css({
                            fontSize: parseInt(event.rect.height) + 'px'
                        });
                    }
                }

            });


        /**
         * 可视化，元素移动时执行的函数
         * @method dragMoveListener
         * @param  event 事件手柄
         */
        function dragMoveListener(event) {
            $('.pg_line_v,.pg_line_h').show();
            var target = event.target,
                maxW = parseInt($(target).parent().parent().css("width")),
                maxH = parseInt($(target).parent().parent().css("height")),
                elW = parseInt($(target).css("width")),
                elH = parseInt($(target).css("height")),
            // keep the dragged position in the data-x/data-y attributes
                x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx,
                y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;


            if (x < 0) {
                x = 0;
            } else if (x + elW + 2 > maxW) {
                x = maxW - elW - 2;
            }

//            console.log(elH +" "+ maxH)
            if (y < 0) {
                y = 0;
            } else if (y + elH + 2 > maxH) {
                y = maxH - elH - 2;
            }

            target.style.top = y + 'px';
            target.style.left = x + 'px';

            // update the posiion attributes
            target.setAttribute('data-x', x);
            target.setAttribute('data-y', y);
            target.setAttribute('data-y', y);

            //upload img bt @add by Jeremy
            $(target).next('.j_btn_upload').css({'top':y-30 + 'px','left':(x*1+60) + 'px'});
        }

        // this is used later in the resizing demo
        window.dragMoveListener = dragMoveListener;


        /**
         * 事件绑定函数
         */
        var bindEvent = function () {

            //页面整体保存按钮 事件绑定
            $("#fn_save").on("click", function () {

                saveSubject(1);

            });

            /*导出数据按钮*/
            $('#fn_export').on("click",function(){
                var _editor_str=getOutPutData();
                _editor_str=JSON.stringify(_editor_str,null,3);
                aceeditor.setValue(_editor_str);
                
            });

            /*生成页面*/
            $('#fn_build_page').on("click",function(){
                var _id=getUrlParam('id');
                setBuildPage(_id);
            })

            /*发布代码按钮*/
            $('#fn_publish').on("click",function(){
                var _id=getUrlParam('id');
                outPutFile(_id);
            })

            /*预览*/
            $('#fn_preview').on('click',function(){
                if(!getUrlParam('id')){
                        alertDialog('请先把模板保存为自己的应用');
                        return;
                    }
                var iframe = document.getElementById('js-preview-iframe');
                setTimeout(function(){
                    $('#mobile_preview_qrcode').html('');
                    //iframe.src = '/wap?id='+getUrlParam('id');
                    iframe.src = '/wap_'+getUrlParam('id')+'.html';
                    var qrcode = new QRCode(document.getElementById("mobile_preview_qrcode"), {
                        width : 250,
                        height : 250
                    });
                    qrcode.makeCode(iframe.src);
                },1000);
            });

            $('.j_preview_refresh').on('click',function(){
                var iframe = document.getElementById('js-preview-iframe');
                iframe.src = iframe.src;
            });


            $('#js-iframe-goprev').on('click',function(){
                $('#js-preview-iframe')[0].contentWindow.goPrev();

            })

            $('#js-iframe-gonext').on('click',function(){
                $('#js-preview-iframe')[0].contentWindow.goNext();
            })


            
            

            //页面整体背景颜色 事件绑定
            $("#gs_bg_color").ColorPickerSliders({
                order: {
                    hsl: 1
                },
                onchange: function (container, color) {
                    $(".pg_preview").each(function(){
                        if($(this).css('background-color')=='rgb(255, 255, 255)'){
                            $(".pg_preview").css("background-color", color.tiny.toRgbString());
                        }
                    });
                }
            });

            //单个页面保存按钮 事件绑定
            $(".pg_bg_color").ColorPickerSliders({
                order: {
                    hsl: 1
                },
                onchange: function (container, color) {
//                    console.log(this.connectedinput[0])
                    var isBindAll = $(this.connectedinput[0]).siblings(".input-group-addon").find(".pg_bg_color_link").attr("checked");
//                    console.log(isBindAll)
//                    console.log($(this.connectedinput[0]).parents(".pg_item").find(".pg_preview").html())

                    if (isBindAll == true || isBindAll == "checked") {

                        $(".pg_preview").css("background-color", color.tiny.toRgbString());
                        $("#gs_bg_color").val(color.tiny.toRgbString());
                    } else {

                        $(this.connectedinput[0]).parentsUntil(".pg_item").find(".pg_preview").css("background-color", color.tiny.toRgbString());
                    }

                }
            });

            //单个页面背景颜色是否锁定整体按钮 事件绑定
            $("#pg_container").on("click", ".pg_bg_color_link" ,function () {

                var isChecked = $(this).attr("checked");

                if (isChecked == true || isChecked == "checked") {
                    $(this).attr("checked", false);
                } else {
                    $(this).attr("checked", "checked");
                }

            });


            //单个页面的背景图片
            $("#pg_container").on("input", ".j_bg_image" ,function(){
                $(this).parentsUntil(".pg_item").find(".pg_preview").attr('style','background:url('+$(this).val()+') no-repeat center top;');
                if($(this).parentsUntil(".pg_item").find('.j_stretch_bg').is(':checked')){
                    $(this).parentsUntil(".pg_item").find(".pg_preview").css('background-size','100% 100%');
                }else{
                    $(this).parentsUntil(".pg_item").find(".pg_preview").css('background-size','auto auto');
                }

            })

            //背景图是否拉伸
            $("#pg_container").on("change", ".j_stretch_bg" ,function(){
                if($(this).is(':checked')){
                    $(this).parentsUntil(".pg_item").find(".pg_preview").css('background-size','100% 100%');
                }else{
                    $(this).parentsUntil(".pg_item").find(".pg_preview").css('background-size','auto auto');
                }
            });

            //背景音乐选择按钮事件绑定
            $("#gs_bgm_switch").on("click", function () {

                if ($(this).attr("checked") === "checked") {
                    $(this).attr("checked", false);
                    $("#gs_bgm_setting").hide();
                } else {
                    $(this).attr("checked", true);
                    $("#gs_bgm_setting").show();
                }

            });

            //微信分享选择按钮事件绑定
            $("#gs_weixin_switch").on("click", function () {

                if ($(this).attr("checked") === "checked") {
                    $(this).attr("checked", false);
                    $("#gs_weixin_setting").hide();
                } else {
                    $(this).attr("checked", true);
                    $("#gs_weixin_setting").show();
                }

            });

            //删除元素按钮 事件绑定
            $(".pg_preview_element_wrap").on("click", ".j_btn_remove", function () {
                    var _tmp_o=$(this).parents(".j_preview_item");
                    var _tmp_d = dialog({
                        content: '删除之后无法恢复，确认删除页面元件吗？',
                        okValue: '确定',
                        ok: function () {
                            _tmp_o.next('.j_btn_upload').remove();
                            _tmp_o.remove();
                            _tmp_d.close().remove();
                            return false;
                        },
                        cancelValue: '取消',
                        cancel: function () {

                        }
                    });
                    _tmp_d.showModal();
            });


            //点击可视化区域，则右边控制区域蒙层隐藏
            $("#pg_container").on("click", ".pg_preview" , function () {
                $(".pg_element_setting_mask").show();
                $(this).parent().siblings(".pg_settings_col").find(".pg_element_setting_mask").hide();
            });


            $("body").on("click", function (e) {

                var target = e.target,
                    lg = $(".change-txt").attr("data-lg"),
                    width = $(".change-txt").parent().prev(".item_mask").css("width"),
                    height = $(".change-txt").parent().prev(".item_mask").css("height");

                $(".j_item_txt").hide();
                $(".item_wrap").show();

                if (parseInt(width) / lg < parseInt(height)) {
                    $(".change-txt").css({
                        fontSize: parseInt(parseInt(width) / lg) + 'px'
                    }).removeClass("change-txt");
                } else {
                    $(".change-txt").css({
                        fontSize: height
                    }).removeClass("change-txt");
                }


            });

            //增加每页面新元素事件绑定
            $("#pg_container").on("click",".pg_add_element", function () {
                var type = $(this).attr("data-type"),
                    randN = parseInt(Math.random() * 10000000);

                var data = {
                    type: type,
                    idN: randN
                };

                $(this).parentsUntil(".pg_item").find(".pg_preview").find(".pg_preview_element_wrap").append(template('addEl', data));
                if(type=='image'){
                    var upload_bt=$(this).parentsUntil(".pg_item").find(".pg_preview").find(".pg_preview_element_wrap").find(".j_btn_upload_bt").last();
                    upload_bt.attr('id','j_btn_upload_bt'+randN)
                    setUploadBox(upload_bt);
                    //setUploadBox($('#test_bt'));
                }
                $('.selected').next('.j_btn_upload').hide();
                $('.selected').removeClass('selected');
            });


            //设置层级事件绑定
            $("#pg_container").on("click", ".setting-level .btn-default", function () {

                var type = $(this).attr("data-value"),
                    layer = $(this).parentsUntil(".pg_item").find(".selected").css("z-index");
//                console.log(type + " " + layer)

                if (type === "up") {
                    if (layer < 19) {
                        $(this).parentsUntil(".pg_item").find(".selected").css("z-index", parseInt(layer) + 1);
                    }
                } else if (type === "down") {
                    if (layer > 3) {
                        $(this).parentsUntil(".pg_item").find(".selected").css("z-index", parseInt(layer) - 1);
                    }
                } else if (type === "top") {
                    $(this).parentsUntil(".pg_item").find(".selected").css("z-index", 19);
                } else if (type === "bottom") {
                    $(this).parentsUntil(".pg_item").find(".selected").css("z-index", 3);
                }
            });


            //点击动画效果按钮 事件绑定
            $("#pg_container").on("click", ".setting-animation .btn-default", function () {
                var type = $(this).attr("data-value");
                if (type === "on") {
                    $(this).parent().siblings(".setting-detail-animation-on").removeClass("hide");
                    if($(this).parent().siblings(".setting-detail-animation-on").find('.pe_animation').html().trim()==''){
                        var data={};
                        $(this).parent().siblings(".setting-detail-animation-on").find('.pe_animation').html(template('addFl', data));
                    }
                    $(this).parent().siblings(".setting-detail-color").addClass("hide");
                    $(this).parent().siblings(".setting-detail-link").addClass("hide");

                    //赋值
                    var _actObj=$(this).parentsUntil(".pg_item").find(".selected");
                    var _aimObj=$(this).parent().siblings(".setting-detail-animation-on");
                    if(_actObj.attr('animation')!=''){
                        _aimObj.find('.pe_animation').find("option:contains('"+_actObj.attr('animation')+"')").attr("selected",true);
                    }
                    _aimObj.find('.pe_animation_iteration').val(_actObj.attr('animationiteration'));
                    _aimObj.find('.pe_animation_duration').val(_actObj.attr('animationduration'));
                    _aimObj.find('.pe_animation_delay').val(_actObj.attr('animationdelay'));
                    $('.played').removeClass('played');
                    _actObj.addClass('played');
                    //goAnimation(_actObj);

                }
            });

            //播放动画 查看动画效果
            $("#pg_container").on("click",".pe_play_animation",function(){
                var _actObj=$(this).parentsUntil(".pg_item").find(".selected");
                goAnimation(_actObj);
            });


            //设置元素文字链接按钮 事件绑定
            $("#pg_container").on("click", ".btn_set_link", function () {

                var link = $(this).parentsUntil(".pg_item").find(".selected").attr("data-link");

                $(this).parent().siblings(".setting-detail-link").removeClass("hide").find(".pe_link").val(link);
                $(this).parent().siblings(".setting-detail-color").addClass("hide");
                $(this).parent().siblings(".setting-detail-animation-on").addClass("hide");
            });


            //设置元素文字颜色按钮 事件绑定
            $("#pg_container").on("click", ".btn_set_text_color", function () {

                var color = $(this).parentsUntil(".pg_item").find(".selected").attr("data-color");

                if (color == undefined) {
                   color = "rgb(0,0,0)";
                }

                $(".pe_text_color").trigger("colorpickersliders.updateColor", color);
                $(".pe_text_color").ColorPickerSliders({
                    placement: 'bottom',
                    color: color,
                    flat: false,
                    size: "large",
                    hsvpanel: true,
                    order: {
                        hsl: 1,
                        cie: 2,
                        preview: 3
                    },
                    onchange: function (container, color) {
                        $(this.connectedinput[0]).parentsUntil(".pg_item").find(".selected").attr("data-color",color.tiny.toRgbString()).find(".item_txt").css("color", color.tiny.toRgbString());
                    }
                });


                $(this).parent().siblings(".setting-detail-color").removeClass("hide");
                $(this).parent().siblings(".setting-detail-link").addClass("hide");
                $(this).parent().siblings(".setting-detail-animation-on").addClass("hide");


            });


            //文本元素链接框输入 事件绑定
            $("#pg_container").on("keyup", ".pe_link", function () {

                var value = $(this).val();
                //console.log(value);
                $(this).parentsUntil(".pg_item").find(".selected").attr("data-link", value);
            });

            //动作效果设置 事件绑定
            //@动画
            $("#pg_container").on("change", ".pe_animation", function () {
                var value = $(this).val();
                var actObj=$(this).parentsUntil(".pg_item").find(".played");
                actObj.attr('animation',value);
                actObj.prev('.item_operate').hide();
                goAnimation();
            });

            //@循环次数
            $("#pg_container").on("blur", ".pe_animation_iteration", function () {
                var value = $(this).val();
                var actObj=$(this).parentsUntil(".pg_item").find(".played");
                actObj.attr('animationiteration',value);
                //actObj.prev('.item_operate').hide();
                //goAnimation();
            });

            //@持续时间
            $("#pg_container").on("blur", ".pe_animation_duration", function () {
                var value = $(this).val();
                var actObj=$(this).parentsUntil(".pg_item").find(".played");
                actObj.attr('animationduration',value);
                //goAnimation();
            });

            //@动画延迟
            $("#pg_container").on("blur", ".pe_animation_delay", function () {
                var value = $(this).val();
                var actObj=$(this).parentsUntil(".pg_item").find(".played");
                actObj.attr('animationdelay',value);
               //goAnimation();
            });

            function goAnimation(ptype,pvalue){
                var animation=$('.played').attr('animation');
                var animationiteration=$('.played').attr('animationiteration');
                var animationduration=$('.played').attr('animationduration');
                //var animationdelay=$('.played').attr('animationdelay');
                animationdelay=0;

                $('.played').removeClass().addClass('item j_preview_item selected played');
                //延迟100ms为了触发动画
                setTimeout(function(){
                    $('.played').addClass(animation);
                },100);
                
                if(animationduration<1){animationduration=0;}
                $('.played').css('-webkit-animation-duration',animationduration+'ms');

                if(animationdelay<1){animationdelay=0;}
                $('.played').css('-webkit-animation-delay',animationdelay+'ms');

                if(animationiteration<1){animationiteration='infinite';}
                $('.played').css('-webkit-animation-iteration-count',animationiteration);
                
                $('.played').removeClass('selected');
                $('.played').next('.j_btn_upload').hide();

                clearTimeout(window.globalActPlay);
                if(animationiteration=='infinite'){animationiteration=1;}
                //var _timeout=animationdelay*1+animationduration*animationiteration;
                var _timeout=animationduration*animationiteration+100;
                window.globalActPlay=setTimeout(function(){
                    $('.played').removeClass().addClass('item j_preview_item selected played');
                    $('.played').next('.j_btn_upload').show();
                },_timeout);
            }

            //动作设置end

            //添加页面
            $("#fn_add_page").on("click",function(){
                var _page_id=$('.pg_item').last().data('id');
                var _page_index=$('.pg_item').size();
                _page_id++;
                _page_index++;
                var data={
                    'page_id':_page_id,
                    'page_index':_page_index
                }
                $("#pg_container").append(template('addDl', data));
                setUploadBox($("#page_bg_upload_"+_page_index));
                setPageBt();
                setCanvasHeight();

            });

            //删除页面
            $("#pg_container").on("click",".pg_remove_page",function(){
                $(this).parents('.pg_item').remove();
                setPageBt();
            })

            //上移页面
            $("#pg_container").on("click",".pg_move_up",function(){
                var cur_session=$(this).parents('.pg_item');
                var prev_session=cur_session.prev('.pg_item');
                cur_session.insertBefore(prev_session);
                setPageBt();
            })

            //下移页面
            $("#pg_container").on("click",".pg_move_down",function(){
                var cur_session=$(this).parents('.pg_item');
                var next_session=cur_session.next('.pg_item');
                cur_session.insertAfter(next_session);
                setPageBt();
            })

            //模拟设备
            $("#gs_simulation_size").on("change",function(){
                var _tmp_value=$(this).val().split('_');
                $('#gs_custom_width').val(_tmp_value[0]);
                $('#gs_custom_height').val(_tmp_value[1]);
                setCanvasHeight();
            })

            //预览时候模拟设备
            $('.j_preview_iframe_size').on("change",function(){
                var _tmp_value=$(this).val().split('_');
                $('.j_preview_iframe_width').val(_tmp_value[0]);
                $('.j_preview_iframe_height').val(_tmp_value[1]);
                setPreviewHeight();

            })

            //导入数据
            $('#j_import_data').on("click",function(){
                saveSubject(2);
            });

        };

        bindEvent();

        createUploadfyBox();

    })();

});




/*编辑器*/
var aceeditor = ace.edit("editor");
aceeditor.setTheme("ace/theme/dawn");
aceeditor.getSession().setMode("ace/mode/json");

var aceeditor_2 = ace.edit("buildPageEditor");
aceeditor_2.setTheme("ace/theme/dawn");
aceeditor_2.getSession().setMode("ace/mode/html");

/*剪切板*/
var client = new ZeroClipboard( document.getElementById("j_json_copy"));
client.on( "ready", function( readyEvent ) {
 client.on( "copy", function (event) {
 var clipboard = event.clipboardData;
    clipboard.setData('text/plain',aceeditor.getValue());
 });
 client.on( 'aftercopy', function(event) {
       var d = dialog({
       content: '复制成功'
       });
       d.show();
       setTimeout(function () {
       d.close().remove();
       }, 1000);
 });
});

var client_2 = new ZeroClipboard( document.getElementById("j_html_copy"));
client_2.on( "ready", function( readyEvent ) {
 client_2.on( "copy", function (event) {
 var clipboard = event.clipboardData;
    clipboard.setData('text/plain',aceeditor_2.getValue());
 });
 client_2.on( 'aftercopy', function(event) {
       var d = dialog({
       content: '复制成功'
       });
       d.show();
       setTimeout(function () {
       d.close().remove();
       }, 1000);
 });
});
