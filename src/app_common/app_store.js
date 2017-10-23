"use strict";
/**
 * 状态管理机配置
 */
//顶部导航栏
var headNav = {
	pageTitle:"",
	showNav:true,
	//导航栏右侧按钮
	navRightBtns:[],
	navType:0,
	btnClickCallback:function(btn){
		
	},
	navBackBtn:{
		label:'<div class="arrow-right"><i></i></div>',
		key:"backBtn" 
	}
}

var mutations={
	/**
	 * val:
	 * title: 显示页面头
	 * show: 是否显示
	 * navRightBtns:右侧按钮列表
	 * btnClickCallback:按钮回调
	 */
	navState:function(state,val){
		if (val.title) {
			if ($App.Info.isInWebView) {
				$HyApp.excute("HYACommonCtrl", "setNav", {
					title: val.title
				}, function (result) {
					if (result.ststus != 0) {
						return false;
					}
				});	
			}	
			state.headNav.pageTitle=val.title;
		}
		if(val.show!=false)val.show=true;
		if(!val.type)val.type=0;
		state.headNav.navType=val.type;
		state.headNav.showNav=val.show;
		state.headNav.navRightBtns=val.navRightBtns;
		state.headNav.btnClickCallback=val.btnClickCallback;
		if(typeof val.navBackBtn=="undefined"){
			val.navBackBtn={
				label:'<div class="arrow-right"><i></i></div>',
				key:"backBtn" 
			}
		};
		if(val.navBackBtn==null)val.navBackBtn={};
		state.headNav.navBackBtn=val.navBackBtn;
	}
};

var actions={};

module.exports = {
	state: {
		headNav:headNav
	},
	mutations: mutations,
	actions: actions
};
