/*
* 获取 url 中指定变量的值
* @param {[String]} key name [变量名]
* @param {[String]} url [url地址]
* */
var getUrlParam = function(name,url) {
	var re = new RegExp("[\\?&#]" + name + "=([^&#]+)","gi");
	var ma = (url || location.href).match(re);
	var strArr;

	if (ma && ma.length > 0) {
		strArr = (ma[ma.length-1]).split("=");
		if (strArr && strArr.length > 1) {
			return strArr[1];
		}
		return ''
	}
	return '';
}


//设置页面上移动下移动按钮
var setPageBt = function(){
    $('.pg_move_up,.pg_move_down').removeClass('disabled');
    $('.pg_move_up').eq(0).addClass('disabled');
    $('.pg_move_down').last().addClass('disabled');
}

//设置画布的高度
var setCanvasHeight = function(){
    $('.pg_preview').css('height',320*$('#gs_custom_height').val()/$('#gs_custom_width').val());
}


//设置预览高度
var setPreviewHeight = function(){
	$('.preview-wrap').css('height',320*$('.j_preview_iframe_height').val()/$('.j_preview_iframe_width').val());

}

//to UTF8
var toUtf8 = function(str) { 
    var out, i, len, c;   
    out = "";   
    len = str.length;   
    for(i = 0; i < len; i++) {   
    	c = str.charCodeAt(i);   
    	if ((c >= 0x0001) && (c <= 0x007F)) {   
        	out += str.charAt(i);   
    	} else if (c > 0x07FF) {   
        	out += String.fromCharCode(0xE0 | ((c >> 12) & 0x0F));   
        	out += String.fromCharCode(0x80 | ((c >>  6) & 0x3F));   
        	out += String.fromCharCode(0x80 | ((c >>  0) & 0x3F));   
    	} else {   
        	out += String.fromCharCode(0xC0 | ((c >>  6) & 0x1F));   
        	out += String.fromCharCode(0x80 | ((c >>  0) & 0x3F));   
    	}   
    }   
    return out;   
}

//cookies
function getCookie(c_name)
{
if (document.cookie.length>0)
  {
  c_start=document.cookie.indexOf(c_name + "=")
  if (c_start!=-1)
    { 
    c_start=c_start + c_name.length+1 
    c_end=document.cookie.indexOf(";",c_start)
    if (c_end==-1) c_end=document.cookie.length
    return unescape(document.cookie.substring(c_start,c_end))
    } 
  }
return ""
}