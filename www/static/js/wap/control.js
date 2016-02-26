/*ajax*/
function dataRun(apiurl,param,callback){
	var urlbase='http://pingan.weixinlm.com/';
	//var urlbase='http://pa_test.weixinlm.com/';
	$.ajax({
		url:urlbase+apiurl,
		data:param,
		dataType:'JSONP',
		jsonpCallback:callback,
		timeout:8000,
		error:function(XMLHttpRequest, textStatus){
			alert('您的网络太不给力了，重新打开试试吧 '+textStatus);
			//window.location.href = "http://pingan.weixinlm.com/index.php?m=ZhuanPan&a=error&err=系统繁忙";
		}
	})
}

/*check mark*/
var checkerr=function(jdata){
	if(typeof(jdata.err)=='undefined'){return true;}
	switch(jdata.err){
		case 1:
			alert(jdata.errmsg);
			return false;
		break;
		case 2:
			window.location.href=jdata.url;
			return false;
		break;
		case -2:
			window.location.href=jdata.errmsg+encodeURIComponent(window.location.href);
			return false;
		break;
		case 3:
            window.location.href = "http://pingan.weixinlm.com/index.php?m=ZhuanPan&a=error&err="+jdata.errmsg;
		break;
		case 0:
		    return true;
		break;    
	}
}


/*获取个人信息*/
function get_user_data(callback,param){
	get_user_dataCallBack=function(jdata){
		if(checkerr(jdata)){
			if(typeof(callback)=='function'){
			callback(jdata);
		    }
		}
	}
	dataRun('index.php?m=ZhuanPan&a=get_user_data',param,'get_user_dataCallBack');
}

/*获取个人信息_秒杀*/
function get_user_data_m(callback,param){
	get_user_data_mCallBack=function(jdata){
		if(checkerr(jdata)){
			if(typeof(callback)=='function'){
			callback(jdata);
		    }
		}
	}
	dataRun('index.php?m=MiaoSha&a=get_user_data',param,'get_user_data_mCallBack');
}

/*提交个人信息*/
function add_user_data(callback,param){
	add_user_dataCallBack=function(jdata){
		if(checkerr(jdata)){
			if(typeof(callback)=='function'){
			callback(jdata);
		    }
		}
	}
	dataRun('index.php?m=ZhuanPan&a=add_user_data',param,'add_user_dataCallBack');
}

/*提交个人信息*/
function add_user_data_m(callback,param){
	add_user_data_mCallBack=function(jdata){
		if(checkerr(jdata)){
			if(typeof(callback)=='function'){
			callback(jdata);
		    }
		}
	}
	dataRun('index.php?m=MiaoSha&a=add_user_data',param,'add_user_data_mCallBack');
}

/*抽奖*/
function setlottery(callback,param){
	setlotteryCallBack=function(jdata){
		if(checkerr(jdata)){
			if(typeof(callback)=='function'){
			callback(jdata);
		    }
		}
	}
	dataRun('index.php?m=ZhuanPan&a=lottery',param,'setlotteryCallBack');
}

/*获取秒杀列表*/
function get_prize_data(callback,param){
	get_prize_dataCallBack=function(jdata){
		if(checkerr(jdata)){
			if(typeof(callback)=='function'){
			callback(jdata);
		    }
		}
	}
	dataRun('index.php?m=MiaoShaGame&a=get_prize_data',param,'get_prize_dataCallBack');
}

/*获取验证码*/
function get_vali_code(callback,param){
	get_vali_codeCallBack=function(jdata){
		//alert('get_vali_code');
		if(checkerr(jdata)){
			if(typeof(callback)=='function'){
			callback(jdata);
		    }
		}
	}
	dataRun('index.php?m=MiaoShaGame&a=get_vali_code',param,'get_vali_codeCallBack');
}

/*秒杀*/
function miaosha(callback,param){
	miaoshaCallBack=function(jdata){
		if(checkerr(jdata)){
			if(typeof(callback)=='function'){
			callback(jdata);
		    }
		}
	}
	dataRun('index.php?m=MiaoShaGame&a=miaosha',param,'miaoshaCallBack');
}

/*获取中奖个人信息*/
function get_user_data_mg(callback,param){
	get_user_data_mgCallBack=function(jdata){
		if(checkerr(jdata)){
			if(typeof(callback)=='function'){
			callback(jdata);
		    }
		}
	}
	dataRun('index.php?m=MiaoShaGame&a=get_user_data',param,'get_user_data_mgCallBack');
}


/*手机验证*/
function checkMobile(s){
  var regu =/^[1][3-9][0-9]{9}$/;
  var re = new RegExp(regu);
  if (re.test(s)) {
  return true;
  }else{
  return false;
  }
}


/*localStorage*/
(function(window,localStorage,undefined){
var LS = {
    set : function(key, value){
        //在iPhone/iPad上有时设置setItem()时会出现诡异的QUOTA_EXCEEDED_ERR错误
        //这时一般在setItem之前，先removeItem()就ok了
        if( this.get(key) !== null )
            this.remove(key);
        localStorage.setItem(key, value);
    },
    //查询不存在的key时，有的浏览器返回undefined，这里统一返回null
    get : function(key){
        var v = localStorage.getItem(key);
        return v === undefined ? null : v;
    },
    remove : function(key){ localStorage.removeItem(key); },
    clear : function(){ localStorage.clear(); },
    each : function(fn){
        var n = localStorage.length, i = 0, fn = fn || function(){}, key;
        for(; i<n; i++){
            key = localStorage.key(i);
            if( fn.call(this, key, this.get(key)) === false )
                break;
            //如果内容被删除，则总长度和索引都同步减少
            if( localStorage.length < n ){
                n --;
                i --;
            }
        }
    }
},
j = window.jQuery, c = window.Core;
//扩展到相应的对象上
window.LS = window.LS || LS;
//扩展到其他主要对象上
if(j) j.LS = j.LS || LS;
if(c) c.LS = c.LS || LS;
})(window,window.localStorage);



/*-- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- 抽奖 -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- */
var __fnp=-1;
var lottery={
	index:-1,	//当前转动到哪个位置，起点位置
	count:10,	//总共有多少个位置
	timer:0,	//setTimeout的ID，用clearTimeout清除
	speed:20,	//初始转动速度
	times:0,	//转动次数
	cycle:15,	//转动基本次数：即至少需要转动多少次再进入抽奖环节
	prize:-1,	//中奖位置
	init:function(id){
		if ($("#"+id).find(".lottery-unit").length>0) {
			$lottery = $("#"+id);
			$units = $lottery.find(".lottery-unit");
			this.obj = $lottery;
			this.count = $units.length;
			$lottery.find(".lottery-unit-"+this.index).addClass("active");
		};
	},
	roll:function(){
		var index = this.index;
		var count = this.count;
		var lottery = this.obj;
		$(lottery).find(".lottery-unit-"+index).removeClass("active");
		index += 1;
		if (index>count-1) {
			index = 0;
		};
		$(lottery).find(".lottery-unit-"+index).addClass("active");
		this.index=index;
		return false;
	},
	stop:function(index){
		this.prize=index;
		return false;
	}
};
function rollcycle(){
	clearTimeout(lottery.timer);
	if(__fnp<0){
	lottery.roll();
    lottery.timer = setTimeout(rollcycle,50);
	}else{
	lottery.timer = setTimeout(roll,lottery.speed);	
	}
}
function roll(){
	lottery.times += 1;
	lottery.roll();
	if (lottery.times > lottery.cycle+10 && lottery.prize==lottery.index) {
		clearTimeout(lottery.timer);
		lottery.prize=-1;
		lottery.times=0;
		click=false;
	}else{
		if (lottery.times<lottery.cycle) {
			lottery.speed -= 10;
		}else if(lottery.times==lottery.cycle) {
			//var index = Math.random()*(lottery.count)|0;
			var index=__fnp;
			lottery.prize = index;		
		}else{
			if (lottery.times > lottery.cycle+10 && ((lottery.prize==0 && lottery.index==7) || lottery.prize==lottery.index+1)) {
				lottery.speed += 110;
			}else{
				lottery.speed += 20;
			}
		}
		if (lottery.speed<40) {
			lottery.speed=40;
		};
		//console.log(lottery.times+'^^^^^^'+lottery.speed+'^^^^^^^'+lottery.prize);
		lottery.timer = setTimeout(roll,lottery.speed);
	}
	return false;
}


