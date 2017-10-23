<style lang="css">
	#_vuec {
		background-color: #FFFFFF;
		width: 100%;
		height: 100%;
	}
	
	#_vuec .zk-shade-base {
		opacity: 0.3
	}
	
	#_vuec .main {
		width: 322px;
		/*height: 392px;*/
		height: 415px;
		background-color: #FFFFFF;
		position: fixed;
		-webkit-transform: translate(-50%, -50%);
		transform: translate(-50%, -50%);
		top: 50%;
		left: 50%;
		border-radius: 5px;
		z-index: 10100;
	}
	
	#_vuec .main .title {

		height: 95px;

	}
	
	#_vuec .main .title .title-text{
		height: 50px;
		display: inline-block;
		margin-top: 25px;
		margin-left: 16px;
		/*border: 1px solid blue;*/
	}
	
	#_vuec .main .title .title-text div:first-child{
		font-size: 17px; /*px*/
		height: 30px;
		line-height: 30px;
	}
	
	#_vuec .main .title .title-text div:last-child{
		font-size: 13px; /*px*/
		display: inline-block;
		height: 20px;
		line-height: 20px;
		padding-left: 6px;
		padding-right: 6px;
		background-color: #F2C153;
		color: #FFFFFF;
		border-radius: 2px;
	}
	
	#_vuec .main .title .head-img {
		width: 50px;
		height: 50px;
		margin-top: 25px;
		margin-left: 47.5px;
		border-radius: 10px;
		overflow: hidden;
		display: inline-block;
		float:left;
	}
	
	#_vuec .main  .qr {
		margin:auto auto;
		padding: 7px;
	}
	#_vuec .main .close {
		background-image: url(../img/icon/close_btn_icon.png);
		background-repeat: no-repeat;
		background-size: contain;
		display: inline-block;
		width: 18px;
		height: 18px;
		float: right;
		margin-right: 12px;
		margin-top: 15px;
	}
	#_vuec .main .close:active {
		background-image: url(../img/icon/close.png);
	}
	#_vuec .main .prompts{
		height:50px;
		width: 100%;
	}
	
	#_vuec .main .prompt{
		font-size: 17px;/*px*/
		height: 20px;
		text-align: center;
		margin-top: 7px;
		color: #949596;
	}
	
	#_vuec .main .prompt i {
		width: 20px;
		height: 20px;
		display: inline-block;
		background-image: url(../img/icon/download_qr.png);
		background-repeat: no-repeat;
		background-size: contain;
		vertical-align:middle;
	}
	#_vuec .main .prompt span{
		display: inline-block;
		line-height: 20px;
		vertical-align:middle;
		margin-left: 7px;
	}
	
	#_vuec .main .prompt1{
		font-size: 17px;/*px*/
		color: #333333;
		font-weight: bold;
		height: 20px;
		line-height: 20px;
		text-align: center;
		margin-top: 22px;
	}
	
	#_vuec .main .prompt2{
		font-size: 17px;
		text-align: center;
		margin-top: 13px;
		color: #333333;
	}
</style>
<template lang="html">
	<div id="_vuec" v-show="showing">
		<div :class="{'zk-shade-base':isLayer}"></div>
		<div class="main">
			<div class="title">
				<div class="head-img">
					<img :src="headUrl" style="height: 100%;"/>
				</div>
				<div class="title-text">
					<div v-zk-limit="8" v-text="name"></div>
					<div v-text="label" v-show="label"></div>
				</div>
				<i class="close" @click="hide" v-show="isLayer"></i>
			</div>
			<qr-code  ref="qrCode" class="qr zk-border" :content="content" :center-img-src="headUrl" :content-type="contentType"></qr-code>
			<div class="prompts" v-show="isLayer">
				<div class="prompt2">扫二维码向我付钱</div>
				<div class="prompt"><i></i><span v-text="prompt"></span></div>
			</div>
			<div class="prompts" v-show="!isLayer">
				<div class="prompt1">扫二维码向我付钱</div>
				<div class="prompt"><i></i><span v-text="prompt"></span></div>
			</div>
		</div>
	</div>
</template>
<script lang="js">
	/**
	 * 收款二维码
	 * 2017-03-26 20:01:05 
	 * @author PS
	 */
	'use strict';
	module.exports = {
		props: {
//			传入数据类型 0.常规字符串 1.Base64
			contentType:{
				type: Number,
				default: function() {
					return 0;
				}
			},
//			二维码内容(收款码)
			content: {
				type: String,
				default: function() {
					return "";
				}
			},
//			二维码类型 1.个人收款二维码 2.商家收款二维码
			type: {
				type: Number,
				default: function() {
					return 1;
				}
			},
//			是否是弹出层
			isLayer:{
				type: Boolean,
				default: function() {
					return true;
				}
			},
		},
		//数据模型
		data: function() {
			return {
				showing:false,
				name:"",
				label:"",
				prompt:"请截屏保存",
				headUrl:""
			}
		},
		mounted: mounted,
		methods: {
			show:show,
			hide:hide
		},
		components: {
			qrCode: require('app_core/services/qr_code_service/components/qr_code.vue')
		}
	}

	function mounted() {
		var vm = this;
	}

	function show(){
		var vm = this;
		var userInfo=$App.UserInfo();
		this.$nextTick(function(){
		//个人收款
		if (vm.type==1) {
			vm.name=userInfo.userName;
			vm.label=userInfo.realNameStatus==2?'实名认证':'普通用户';
			vm.prompt="请截屏保存";
			vm.headUrl=userInfo.userHeadUrl;
			if (!vm.headUrl) {
				vm.headUrl=$App.RootUrl +"/app_core/img/icon/default.png";
			}
		}else{
//			商户收款
			vm.name=userInfo.psName;
			vm.label=userInfo.storeAuthStatus==1?'实体店认证':'普通商户';
			vm.prompt="请截屏保存";
			vm.headUrl=userInfo.psHeadUrl;
			if (!vm.headUrl) {
				vm.headUrl=$App.RootUrl + "/app_core/img/icon/default.png";
			}
		}
		
		if (!vm.isLayer) {
			vm.prompt="请截屏保存";
		}
		
		this.showing=true;
		
			if (this.contentType==0) {
				this.$refs.qrCode.refresh();
			}
		});
	}
	
	function hide(){
		this.showing=false;
		this.$emit("closed");
	}
	
</script>