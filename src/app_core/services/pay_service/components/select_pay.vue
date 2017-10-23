<style lang="css">
	/*支付通道选择*/
	._vuec .pay-channles {
		background-color: #FFFFFF;
	}
	._vuec .pay-channles > div {
		padding-left: 12px;
	}
	._vuec .pay-channles>div:first-child {
		font-size: 15px;
		height: 39px;
		line-height: 39px;
	}
	._vuec .pay-channle {
		height: 50px;
		font-size: 15px;
	}
	._vuec .pay-channles>div:last-child {
		height: 50px;
	}
	._vuec .pay-channle>i {
		background-image: url(../../../img/icon/default.png);
		background-size: contain;
		background-repeat: no-repeat;
		display: block;
		height: 28px;
		width: 28px;
		float: left;
		margin-left: 11px;
		margin-top: 11px;
	}
	
	._vuec .pay-channle>span {
		display: block;
		padding-left: 14px;
		float: left;
	}
	
	._vuec .pay-channle>span>div:first-child {
		margin-top: 9px;
		color: #2E2F30;
		line-height: 1.3;
	}
	/*单笔限额*/
	
	._vuec .pay-channle>span>div:nth-of-type(2) {
		font-size: 11px;
		color: #999999;
	}
	/*checkbox*/
	
	._vuec .sl-checkbox {
		height: 100%;
		margin-right:10px;
		width: 40px;
		vertical-align: middle;
		line-height: 100%;
		position: relative;
	}
	._vuec .sl-checkbox i {
		display: block;
		height: 20px;
		width: 20px;
		top: 50%;
		left: 50%;
		margin-left: -10px;
		position: absolute;
		margin-top: -10px;
		background-image: url('../img/icon/checking.png');
		background-size: contain;
	}
	._vuec .sl-checkbox i.active {
		background-image: url('../img/icon/checked.png');
	}
	._vuec .sl-checkbox {
		float: right !important;
		right: 0;
	}
	._vuec .foot-btn {
		height: 82px;
		background-color: white;
		margin-top: 10px;
		position: relative;
	}
</style>
<template lang="html">
	<div class="_vuec">
		<div class="pay-channle zk-border-b" v-for="item in cannelList" @click="selectCannel(item)">
			<i :style="'background-image: url('+item.iconUrl+')'">&nbsp;</i>
			<span>
				<div v-text="item.aisleName"></div>
				<div v-text="item.limitStr+' | '+item.payRateStr"></div>
			</span>
			<span class="sl-checkbox">
				<i :class="{active:selectedCannel==item}"></i>
			</span>
		</div>
	</div>
</template>
<script lang="js">
	'use strict';
	/**
	 * 	notice:	
	 * selectedCannel(通道信息)
	 */
	var PayCannelTypeEnum = require('app_core/services/pay_service/enum/pay_cannel_enum');
	module.exports = {
		//数据模型
		data: function() {
			return {
				//可用通道列表
				cannelList: [],
				//选中的通道
				selectedCannel: null
			}
		},
		//参数
		props: {
			//收款人id
			incomeUserId: {
				type: String,
				default: function() {
					return "";
				}
			},
			//业务场景
			scenesId: {
				type: String,
				default: function() {
					return "";
				}
			},
//			默认通道Id
			defaultCannelId: {
				type: [String, Number],
				default: function() {
					return "";
				}
			}
		},
		mounted: mounted,
		//方法
		methods: {
			selectCannel: selectCannel
		},
		components: {}
	};

	/**
	 * 组件加载初始化
	 */
	function mounted() {
		var vm=this;
		
//		vm.$watch("defaultCannelId",function(newVal,oldVal){
//			if (newVal) {
//				
////				selectCannel(newVal,this);
//			}
//		});

		refresh(this);
	}

	/**
	 * 刷新通道
	 * @param {Object} vm
	 */
	function refresh(vm) {
		var apiUrl=$App.ApiRoot + "/pay/getAisleListAnonymous";
		var postData = {
			incomeUserId: vm.incomeUserId,
			scenesId: vm.scenesId
		};
		//token 存在则说明已登录过 使用实名支付通道查询
		if ($App.UserInfo().token) {
			apiUrl=$App.ApiRoot + "/pay/getAisleRealName";
			postData.paymentUserId=$App.UserInfo().userId;
		}
		
		//查询可用支付通道
		$.post(apiUrl,postData, function(result, status, xhr) {
			if(result.status != 0) {
				return false;
			}
			//微信扫描 用微信支付
			//支付宝扫描用支付宝支付
			//非腾讯系游览器 均支持支付宝支付
			for(var i = 0, len = result.data.length; i < len; i++) {
				//			若限额值小于0则 显示不限	
				if(result.data[i].maxLimit <= 0) {
					result.data[i].limitStr = "单笔：不限";
				} else {
					var single = parseFloat(result.data[i].maxLimit).toFixed(2);
					result.data[i].limitStr = '单笔：' + single;
				}
				result.data[i].payRateStr = '费率：' + (result.data[i].payRate * 100).toFixed(2) + '%';
				
				//针对3.0.5之前的版本进行 非注入方式兼容
				if (result.data[i].aisleType == PayCannelTypeEnum.UBH5Pay) {
					if (!$App.lessAppVer("3.0.5")) {
						vm.cannelList.push(result.data[i]);
					}
				}else{
					vm.cannelList.push(result.data[i]);
				}
			}
			if(vm.cannelList.length > 0) {
				if (!vm.defaultCannelId) {
					vm.selectedCannel = vm.cannelList[0];
				selectCannel(vm.selectedCannel,vm);
				}else{
					//设置默认通道
					selectCannel(vm.defaultCannelId,vm);
				}
				
				
			} else {
				$App.alert("当前无通道可用！请联系管理员");
			}
		});
	}

	/**
	 * 选中通道
	 * @param {Object} item
	 */
	function selectCannel(item,vm) {
		if (!vm) {
			vm = this;
		}
		var cannnel=item;
		if (typeof item=="string"||typeof item == "number" ) {
			for (var i=0,len=vm.cannelList.length;i<len;i++) {
				if (vm.cannelList[i].aisleId==item) {
					cannnel = vm.cannelList[i];
					break;
				}
			}
		}
		vm.selectedCannel = cannnel;
		vm.$emit("selected-cannel",cannnel);
	}
	
</script>