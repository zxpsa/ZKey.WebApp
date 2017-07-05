<style lang="css">
	._vuec .main {
		position: fixed;
		height: 100%;
		width: 100%;
		top: 0;
		left: 0;
		z-index: 999;
		background-color: #F1F2F3;
		overflow: auto;
	}
	
	._vuec .bank-cards {
		min-height: 236px;
		margin-top: 10px;
	}
	
	._vuec .bank-cards .row {
		height: 61px;
		line-height: 61px;
		background-color: #FFFFFF;
		position: relative;
	}
	
	._vuec .bank-cards .row:active {
		background-color: #BBBBBB;
	}
	
	._vuec .bank-cards .row .bank-icon {
		height: 100%;
		line-height: 100%;
	}
	
	._vuec .bank-cards .row i {
		display: inline-block;
		width: 34px;
		height: 34px;
		background-image: url(../../../img/icon/default.png);
		background-size: contain;
		background-repeat: no-repeat;
		vertical-align: middle;
		margin-left: 5px;
	}
	
	._vuec .bank-cards .row>div {
		display: inline-block;
		vertical-align: middle;
		width: 84.1333%;
		line-height: 25px;
		margin-left: 14px;
	}
	
	._vuec .bank-cards .row>div div:first-child {
		font-size: 14px;
	}
	
	._vuec .bank-cards .row>div div:last-child {
		font-size: 11px;
		color: #707172;
	}
	
	._vuec .bank-cards .settlement {
		background-image: url(../img/icon/settlement_corner.png);
		z-index: 999;
		background-size: contain;
		background-repeat: no-repeat;
		width: 59px;
		height: 60px;
		display: block;
		top: 0;
		right: 0;
		position: absolute;
	}
	
	._vuec .add {
		margin-top: 97px;
		padding-bottom: 97px;
		position: relative;
	}
	
	._vuec .add button {
		background-color: #F2C153;
		font-size: 17px;
		color: #FFFFFF;
		height: 40px;
		width: 230px;
		border-radius: 6px;
		position: absolute;
		left: 50%;
		margin-left: -115px;
	}
	
	._vuec .add button:active {
		background-color: #AA8225;
	}
	
	._vuec .no-support{
		position: absolute;
		font-size: 11px;
		color: #707172;
		right: 30px;
		top: 0px;
		z-index: 0;
	}
	
	._vuec .no-support-color{
		color: #707172;
	}
	
	._vuec .sms-verify {
		z-index: 1000;
		height: 100%;
		width: 100%;
		position: absolute;
		left: 0;
		top: 0;
	}
	
	._vuec .sms-verify .content {
		width: 276px;
		height: 176.5px;
		position: absolute;
		z-index: 1000;
		top: 35%;
		left: 50%;
		transform: translate(-50%, -50%);
		-webkit-transform: translate(-50%, -50%);
		background-color: #FFFFFF;
		padding-left: 23px;
		padding-right: 23px;
		padding-top: 17px;
		padding-bottom: 20px;
		border-radius: 7px;
	}
	
	._vuec .sms-verify .title {
		font-size: 17px;
		font-weight: bold;
		text-align: center;
	}
	
	._vuec .sms-verify .verify-code {
		margin-top: 25px;
	}
	
	._vuec .sms-verify .verify-code input {
		width: 164px;
		height: 27px;
		border-radius: 2px;
		background-color: #D6D6D6;
		display: inline-block;
		border: none;
		padding-left: 5px;
		float: left;
	}
	
	._vuec .sms-verify .verify-code button {
		height: 27px;
		width: 65px;
		padding: 0;
		margin: 0;
		font-size: 15px;
		color: #333333;
		border: none;
		display: inline-block;
		text-align: left;
		text-indent: 4px;
	}
	
	._vuec .sms-verify .verify-code button:active {
		background-color: #666666;
	}
	
	._vuec .sms-verify .content .btns {
		width: 100%;
		height: 65px;
		text-align: center;
		/*padding-top: 25px;*/
		margin-top: 25px;
	}
	
	._vuec .sms-verify .content .btns button {
		background-color: #fdc148;
		font-size: 18px;
		height: 40px;
		line-height: 40px;
		color: #FFFFFF;
		padding-left: 20px;
		padding-right: 20px;
		border-radius: 6px;
		width: 110px;
		float: left;
	}
	
	._vuec .sms-verify .content .btns button:first-child {
		margin-right: 10px;
	}
	
	._vuec .sms-verify .content .btns button:active {
		background-color: #AA8225;
	}
</style>
<template lang="html">
	<div class="_vuec" v-if="showing">
		<div class="sms-verify" v-show="hasSMSVerify">
			<div class="zk-shade-base"></div>
			<div class="content">
				<div class="title">请输入验证码</div>
				<div class="verify-code">
					<input type="tel" maxlength="6" v-model="smsCode" pattern="[0-9]*" v-zk-limit="6"/>
					<button class="zk-border" v-text="sendSMSTimeStr" @click="reSendSMS()">获取验证码</button>
				</div>
				<div class="btns">
					<button @click="hideSMSVerify()">取消</button>
					<button @click="smsSuer(smsCode,reSendSMS)">确定</button>
				</div>
			</div>
		</div>
		<div class="main">
			<pay-nav v-show="hasNav" :back-btn="backBtn" @btn-click="backClick" :title="'银行卡'" :right-btns="null"></pay-nav>
			<div class="bank-cards">
				<div class="row zk-border-b" v-for="item in bankList" @click="selectBank(item)">
					<i :style="'background-image:url('+item.biLogo+')'"></i>
					<div>
						<div v-text="item.ubBankName" :class="{'no-support-color': !item.support}"></div>
						<div v-text="item.bankStr"></div>
					</div>
					<span class="settlement" v-show="item.ubIsDefault==1"></span>
					<span class="no-support" v-show="!item.support">不支持</span>
				</div>
			</div>
			<div class="add">
				<button type="button" @click="toAddBankPage()">添加银行卡</button>
			</div>
		</div>
	</div>
</template>
<script lang="js">
	/**
	 * 2017-03-28 15:14:53 
	 * @author PS
	 * select-bank
	 */
	'use strict';
	var payNav = require("app_core/services/pay_service/components/pay_nav.vue")
	var h5DirectApp = require('modules/settlement/common/services/h5_direct_app_services');
	var initTime = 60;
	module.exports = {
		//数据模型
		data: function() {
			return {
				//返回按钮
				backBtn: {
					label: '<div class="arrow-right"><i></i></div><span>返回</span>',
					key: "backBtn1"
				},
				//是否显示
				showing: false,
				//银行卡类型：0-储蓄卡 1-信用卡 不传-全部
				bankType: null,
				//可用银行卡类型/当前的支付方式 1.荣宝 2.易宝
				canUseBankType: 0,
				//银行卡列表
				bankList: [],
				pageNo: 1,
				//显示短信验证码弹窗
				hasSMSVerify: false,
				//短信倒计时
				sendSMSTime: initTime,
				sendSMSTimeStr: "发送短信",
				smsCode: null
			}
		},
		//参数
		props: {
			//			是否显示导航栏
			hasNav: {
				type: Boolean,
				default: function() {
					return false;
				}
			}
		},
		mounted: mounted,
		//方法
		methods: {
			backClick: backClick,
			show: show,
			hide: hide,
			refresh: refresh,
			selectBank: selectBank,
			selectBankCallback: function(bankInfo) {
				//				选中银行卡回调
			},
			smsSuer: function(smsCode) {
				//				输入短信验证码后回掉
			},
			reSendSMS: function(smsCode) {
				//				重新发送验证码
			},
			hideSMSVerify: hideSMSVerify,
			showSMSVerify:showSMSVerify,
			refreshResidualTime: refreshResidualTime,
			//			到添加银行卡页面
			toAddBankPage: toAddBankPage
		},
		components: {
			payNav: payNav
		}
	};

	/**
	 * 组件加载初始化
	 */
	function mounted() {
		var vm = this;
		//返回时加载刷新方法
		window.onZKBack = function() {
			//返回刷新页面
			vm.refresh(vm);
		}
		 
		vm.$watch("smsCode",function(newVal,oldVal){
			var str=""+newVal;
			if(str.length>6){
				this.smsCode=oldVal;
				return false;
			}
			var reg=new RegExp("^[0-9]*$")
			if (!reg.test(str)) {
				this.smsCode=oldVal;
			}
		});
	}

	/**
	 * 刷新通道
	 * @param {Object} vm
	 */
	function refresh(vm) {
		vm.sendSMSTime = initTime;
		//重新加载列表
		vm.bankList.splice(0, vm.bankList.length);
		vm.pageNo = 1;
		httpGetBankList(vm);
	}

	function httpGetBankList(vm) {
		$.post($App.ApiRoot + "/bank/getBankList?_t=" + Math.random() * 1000, {
			//			银行卡类型：0-储蓄卡 1-信用卡 不传-全部
			ubBankType: vm.bankType,
			pageNo: vm.pageNo
		}, function(result, status, xhr) {
			var data = result.data.data;
			for(var i = 0, len = data.length; i < len; i++) {
				//				处理显示的银行卡信息
				data[i].bankStr = "尾号" + data[i].ubBankNo;
				if(data[i].ubBankType == 1) {
					data[i].bankStr += " | 信用卡";
				} else {
					data[i].bankStr += " | 储蓄卡";
				}
				//使用解密的银行卡号码
				data[i].ubId = data[i].bankId ? data[i].bankId : null;
				data[i].support=true;
//				是否支持荣宝
				if (vm.canUseBankType==1) {
					if (data[i].isStandBy!=1) {
						data[i].support=false;
					}
				}
				vm.bankList.push(data[i]);
			}
			//自动尝试加载下一页数据
			if(data.length > 0 && vm.pageNo < 20) {
				vm.pageNo++;
				setTimeout(function() {
					httpGetBankList(vm);
				}, 1000);
			}
		});
	}

	/**
	 * 显示选择银行卡列表
	 * @param {Function} selectBankCallback 选中银行卡回调
	 * @param {Function} smsSuer 短信验证码确认回调
	 * @param {Function} reSendSMS 刷新短信验证码回调
	 * @param {Number} bankType 银行卡类型：0-储蓄卡 1-信用卡 不传-全部
	 * @param {Number} canUseBankType 可用银行卡类型 1.荣宝 2.易宝
	 */
	function show(selectBankCallback, smsSuer, reSendSMS, bankType, canUseBankType) {
		var vm = this;
		vm.showing = true;
		vm.selectBankCallback = selectBankCallback;
		vm.smsSuer = smsSuer;
		vm.reSendSMS = reSendSMS;
		vm.bankType = bankType;
		vm.canUseBankType = canUseBankType;
		if(!vm.hasNav) {
			//没导航栏 则直接使用WebView时添加路由栈解决回退问题
			var url = window.location.href;
			history.pushState(null, null, $G.toQueryString({
				"__t": Math.random() * 10000
			}, url));
			window.addEventListener("popstate", function(event) {
				vm.showing = false;
			});
		}
		refresh(vm);
	}

	function hide() {
		this.showing = false;
	}

	/**
	 * 返回按钮
	 * @param {Object} btn
	 */
	function backClick(btn) {
		if(btn.key = "backBtn1") {
			this.hide();
		}
	}

	/**
	 * 选择银行卡回调
	 * @param {Object} bankInfo
	 */
	function selectBank(bankInfo) {
		var vm = this;
		this.$emit("select-bank", bankInfo);
		vm.selectBankCallback(bankInfo);
	}

	/**
	 * 跳转到银行卡添加界面
	 */
	function toAddBankPage() {
		var vm = this;
		//荣宝银行卡
		if(vm.canUseBankType == 1) {
			h5DirectApp.goRBBankAdd(vm.bankType);
		} else if(vm.canUseBankType == 2) {
			//易宝银行卡
			h5DirectApp.goYBBankAdd(vm.bankType);
		}else{
			//默认添加荣宝银行卡
			h5DirectApp.goRBBankAdd(vm.bankType);
		}
	}

	/**
	 * 刷新时钟
	 * @param {Object} vm
	 */
	function refreshResidualTime(vm) {
		if(!vm) {
			vm = this;
		}
		if(vm.sendSMSTime > 0 && vm.hasSMSVerify) {
			vm.sendSMSTime--;
			vm.sendSMSTimeStr ="重发" + vm.sendSMSTime + "s";
			setTimeout(function() {
				refreshResidualTime(vm);
			}, 1000)
		} else {
			vm.sendSMSTimeStr = "重新发送";
			vm.sendSMSTime = initTime;
		}
	}
	
	/**
	 * 隐藏验证码
	 */
	function hideSMSVerify() {
		this.hasSMSVerify = false;
		this.sendSMSTime = 0;
	}
	
	/**
	 * 显示验证码
	 */
	function showSMSVerify(){
		var vm = this;
	//重启动倒计时
		vm.sendSMSTime = 60;
		vm.smsCode = "";
		vm.hasSMSVerify = true;
		vm.refreshResidualTime(this);
	}
</script>