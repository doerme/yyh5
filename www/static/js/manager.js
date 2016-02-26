define(function(require, exports, module) {
    var $		= window.jQuery,
    bootstrap  	= require("./lib/bootstrap.min"),
	control 	= require("./lib/control"),
	dialog 	= require("./lib/dialog-min"),
	cookie 	= require("./lib/cookie");

	$(function(){
       if(!getCookie('username').length){
			$('#userLogin')[0].click();
       }

       $('#js_new_app').on('click',function(){
	       	if(!getCookie('username').length){
				$('#userLogin')[0].click();
	       }else{
	       	window.location.href='/builder'
	       }
       })

       $('.search-btn').on('click',function(){
       		var keyword=encodeURIComponent($('.search-txt').val());
       		if($.trim(keyword)!=''){
       			window.location.href='/manager_'+keyword+'.html';
 			}else{
 				window.location.href='/manager.html';
 			}
       })
        
		
	})

});