"use strict";
/**
 * 404页
 * 作者：ydx   
 * 日期：2016-12-14
 * 
 */
var vm;

module.exports = {
	//必填(申明控制器作用域)
	el: '#page',
	//数据模型
	data: {
		times: 4,  //剩余时间
		timer:null //计时器
	},
	components: {

	},
	methods: {
		goIndex: goIndex //返回首页
	},
	mounted: function() {
		vm = this;
		//initGoIndex();
	}			
};


//回到主页
function goIndex(){
	//$App.msg('等待接入。。');
	
}

//初始化倒计时回到主页 
function initGoIndex(){
	vm.times--;
	if(vm.times <= 0){
		goIndex();
	}
	else{
		setTimeout(initGoIndex,1000);
	}
}
