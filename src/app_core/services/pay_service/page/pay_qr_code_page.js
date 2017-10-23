"use strict";
/**
 * 输入银行卡支付
 * 作者：PS    
 * 日期：2016-12-12
 */


var payNav=require("app_core/services/pay_service/components/pay_nav.vue")
var collectionCode= require('app_core/services/pay_service/components/collection_code.vue');
module.exports = {
	//必填(申明控制器作用域)
	el: '#page',
	mounted: mounted,
	//数据模型
	data: {
		pageTitle: "支付",
		//显示导航栏
		hasNav:true,
		qrUrl:null,
		qrData:null,
		//二维码类型 1.传入二维码 0.自行生成
		contentType:0,
		//用户信息角色  1.个人收款二维码 2.商家收款二维码
		userRoleType:1
	},
	components: {
		payNav:payNav,
		collectionCode:collectionCode
	},
	methods: {}
};

function mounted() {
	this.qrUrl = $App.getPageParam("qrUrl");
	this.qrData = $App.getPageParam("qrData");
	if (this.qrData) {
		this.qrUrl ='data:image/png;base64,'+this.qrData;
		this.contentType=1;
	}
	this.hasNav = !$App.Info.isInWebView;
	this.$refs.payQRCode.show();
}