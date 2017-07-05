"use strict";
/**
 * 输入银行卡支付
 * 作者：PS    
 * 日期：2016-12-12
 */


var payNav=require("app_core/services/pay_service/components/pay_nav.vue")
module.exports = {
	//必填(申明控制器作用域)
	el: '#page',
	mounted: mounted,
	//数据模型
	data: {
		pageTitle: "选择银行卡类型",
		//0.银行卡/信用卡选择	1.银行卡信息输入	2.信用卡信息输入
		type: 0,
		aisleId: null,
		orderNo: null,
		scenesId: null,
		remark: null,
		idCardNo: null,
		bankCardNo: null,
		userName: null,
		bankPhoneNo: null,
		cvv2: null,
		validthru: null,
		sendSMSTime: 60,
		sendSMSTimeStr: "发送短信",
		smsCode: null,
		//是否伴随提交信息
		isSubmitInfo: true,
		//显示导航栏
		hasNav:true
	},
	components: {
		payNav:payNav
	},
	methods: {
		sendSMS: sendSMS,
		sure: sure,
		goCreditCardPage: goCreditCardPage,
		goBankCardPage: goBankCardPage
	}
};

function mounted() {
	var vm = this;
	vm.aisleId = $G.getUrlParam("aisleId");
	vm.orderNo = $G.getUrlParam("orderNo");
	vm.scenesId = $G.getUrlParam("scenesId");
	vm.remark = $G.getUrlParam("remark");
	vm.type = $G.getUrlParam("type");
	vm.hasNav = $G.getUrlParam("hasNav");
	if(!vm.type) {
		vm.type = 0;
	}
	if(vm.type == 2) {
		vm.pageTitle = "信用卡信息";
	} else if(vm.type == 1) {
		vm.pageTitle = "银行卡信息";
	} else {
		vm.pageTitle = "选择银行卡类型";
	}
}

function sure() {
	var vm = this;
	if(!vm.smsCode) {
		$App.msg("请输入短信验证码！");
		return false;
	}
	$.post($App.ApiRoot + "/pay/confirmPay", {
		orderNo: vm.orderNo,
		smsCode: vm.smsCode
	}, function(result, status, xhr) {
		//直接退出倒计时
		vm.sendSMSTime = 0;
		if(result.status != 0) {
			$App.msg(result.msg);
			return false;
		}
		//成功后跳转店铺首页
		$App.go({
			path:"/modules/shop/shop_index.html",
			query:{
				psUserId:$G.getUrlParam("psUserId")
			}
		});
	});
}

function sendSMS() {
	var vm = this;
	if(vm.sendSMSTime < 60) {
		return false;
	}
	if(!vm.isSubmitInfo) {
		//再次发送短信
		refreshResidualTime(vm);
		$.post($App.ApiRoot + "/pay/reSendSmsCode", {
			orderNo: vm.orderNo
		}, function(result, status, xhr) {
			//直接退出倒计时
			vm.sendSMSTime = 0;
			if(result.status != 0) {
				$App.msg(result.msg);
				return false;
			}
		});
		return false;
	}

	if(!vm.idCardNo || isNaN(vm.idCardNo)) {
		$App.msg("请输入正确的身份证号！");
		return false;
	}
	if(!vm.bankCardNo || isNaN(vm.bankCardNo)) {
		$App.msg("请输入正确的银行卡或信用卡号！");
		return false;
	}
	if(!vm.bankPhoneNo || isNaN(vm.bankPhoneNo)) {
		$App.msg("请输入正确的手机号！");
		return false;
	}
	if(vm.type == 2) {
		if(!vm.validthru || isNaN(vm.validthru)) {
			$App.msg("请输入正确的卡有效期！");
			return false;
		}
		if(!vm.cvv2 || isNaN(vm.cvv2)) {
			$App.msg("请输入信用卡背面三位数！");
			return false;
		}
	}

	vm.isSubmitInfo = false;
	refreshResidualTime(vm);

	$.post($App.ApiRoot + "/pay/apiPay", {
		aisleId: vm.aisleId,
		orderNo: vm.orderNo,
		scenesId: vm.scenesId,
		remark: vm.remark,
		authCode: null,
		ubBindId: null,
		ubId: null,
		idCardNo: vm.idCardNo,
		bankCardNo: vm.bankCardNo,
		userName: vm.userName,
		bankPhoneNo: vm.bankPhoneNo,
		cvv2: vm.cvv2,
		validthru: vm.validthru,
		bankCardType: vm.type == 1 ? "DEBIT" : "CREDIT"
	}, function(result, status, xhr) {
		//直接退出倒计时
		vm.sendSMSTime = 0;
		if(result.status != 0) {
			$App.msg(result.msg);
			return false;
		}
	});

}

/**
 * 跳转至信用卡界面
 */
function goCreditCardPage() {
	$App.go(window.location.href + "&type=2");
}

/**
 * 跳转至银行卡界面
 */
function goBankCardPage() {
	$App.go(window.location.href + "&type=1");
}

/**
 * 刷新短信倒计时
 * @param {Object} vm
 */
function refreshResidualTime(vm) {
	if(vm.sendSMSTime > 0) {
		vm.sendSMSTime--;
		vm.sendSMSTimeStr = vm.sendSMSTime + " s";
		setTimeout(function() {
			refreshResidualTime(vm);
		}, 1000)
	} else {
		vm.sendSMSTimeStr = "重新发送";
		vm.sendSMSTime = 60;
	}
}