<style lang="css">
	#_vuec{
		position: relative;
		width: 100px;
		height: 100px;
	}
	#_vuec .centerImg{
		position: absolute;
		background-color: #FFFFFF;
		border-radius: 10px;
		padding: 3px;
		transform: translate(-50%,-50%);
		-webkit-transform: translate(-50%, -50%);
		top: 50%;
		left: 50%;
	}
	
	#_vuec .centerImg img{
		/*待添加默认背景图片*/
		background-color: #FFFFFF;
		border-radius: 10px;
		width: 100%;
		height: 100%;
	}
</style>
<template lang="html">
	<div id="_vuec" :style="{'width':width,'height':height}">
		<div v-if="contentType==0" class="qr_code"></div>
		<div v-if="contentType==1" class="qr_code"><img :src="content"/></div>
		<div v-show="contentType==0" class="centerImg" :style="{'width':centerWidth,'height':centerHeight}">
			<img :src="centerImgSrc"/>
		</div>
	</div>
</template>
<script lang="js">
	/**
	 * 二维码基础组件
	 * 2017-03-26 20:01:05 
	 * @author PS
	 * @require app_core/libs/qrcode/qrcode.js
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
//			二维码内容
			content: {
				type: String,
				default: function() {
					return "";
				}
			},
//			宽度
			width: {
				type: String,
				default: function() {
					return "6.2rem";
				}
			},
//			高度
			height: {
				type: String,
				default: function() {
					return this.width;
				}
			},
//			中心图片宽度
			centerWidth: {
				type: String,
				default: function() {
					return "1.2rem";
				}
			},
//			中心图片高度
			centerHeight: {
				type: String,
				default: function() {
					return this.centerWidth;
				}
			},
//			中心图片地址
			centerImgSrc:{
				type: String,
				default: function() {
					return __uri("app_core/img/icon/default.png");
				}
			}
		},		//数据模型
		data: function() {
			return {
				obj:null
			}
		},
		mounted: mounted,
		methods: {
			refresh:refresh,
			clean:clean
		},
		components: {}
	}

	function mounted() {
		var vm=this;

	}
	
	/**
	 * 刷新二维码
	 */ 
	function refresh(){
		var vm=this;
		if (vm.obj) {
			vm.obj.clear();
			vm.obj.makeCode(vm.content);
		}else{
			var qrCodeDom = document.querySelector("#_vuec .qr_code");
			vm.obj = new QRCode(qrCodeDom, {
				text: vm.content,
				width:  $G.remToPX(vm.width),
				height: $G.remToPX(vm.height),
				colorDark: "#000000",
				colorLight: "#ffffff",
				correctLevel: QRCode.CorrectLevel.H
			});
		}
	}
	
	/**
	 * 清除
	 */
	function clean(){
		var vm=this;
		vm.obj.clear();
	}
</script>