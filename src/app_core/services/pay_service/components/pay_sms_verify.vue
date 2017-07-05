<style lang="css">
	._vuec .sms-verify{	
	
	}
	
	._vuec .sms-verify .content{
		width: 276px;
		height: 176.5px;
		position: absolute;
		z-index: 1000;
		transform: translate(-50%,-50%);
		top: 50%;
		left: 50%;
		background-color: #FFFFFF;
		padding-left: 23px;
		padding-right: 23px;
		padding-top: 25px;
		padding-bottom: 20px;
		border-radius: 7px;
	}
	
	._vuec .sms-verify .title{
		font-size: 15px;
		font-weight: bold;
		text-align: center;
	}
	
	._vuec .sms-verify .verify-code{
		margin-top: 18px;
	}
	
	._vuec .sms-verify .verify-code input{
		width: 118.5px;
		height: 34px;
		background-color: #F5F5F5;
		display: inline-block;
		border: none;
		padding-left: 5px;
	}
	
	._vuec .sms-verify .verify-code button {
		margin-left: 20px;
		height: 25px;
		width: 81px;
		font-size: 15px;
		color: #f4cba5;
		border-color: #f4cba5;
		display: inline-block;

	}
	
	._vuec .sms-verify .verify-code button:active{
		background-color: #666666;
	}
	
	._vuec .sms-verify .content .btns{
		width: 100%;
		height: 65px;
		text-align: center;
		padding-top: 20px;
	}
	
	._vuec .sms-verify .content .btns button{
		background-color: #fdc148;
		font-size: 18px;
		height: 43px;
		line-height: 43px;
		color: #FFFFFF;
		padding-left: 20px;
		padding-right: 20px;
		border-radius: 7px;
		margin-left:5px;
		margin-right:5px;
	}
	._vuec .sms-verify .content .btns button:active{
		background-color: #AA8225;
	}
</style>
<template lang="html">
	<div class="_vuec">
		<div class="sms-verify" v-show="showSMSVerify">
				<div class="zk-shade-base"></div>
				<div class="content">
					<div class="title">输入验证码</div>
					<div class="verify-code">
						<input type="text"/>
						<button class="zk-border">获取验证码</button>
					</div>
					<div class="btns">
						<button>取消</button>
						<button>确定</button>
					</div>
				</div>
			</div>
	</div>
</template>
<script lang="js">
	'use strict';
	/**
	 * 	notice:	
	 * selectedCannel(通道信息)
	 */
	module.exports = {
		//数据模型
		data: function() {
			return {
				//显示短信验证码弹窗
				showSMSVerify:false
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
			}
		},
		mounted: mounted,
		//方法
		methods: {
		},
		components: {}
	};

	/**
	 * 组件加载初始化
	 */
	function mounted() {
		refresh(this);
	}

	/**
	 * 刷新通道
	 * @param {Object} vm
	 */
	function refresh(vm) {}

	function sendSMS() {
		
	}
</script>