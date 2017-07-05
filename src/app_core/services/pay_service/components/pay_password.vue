<style lang="css">
#_vuec .main{
	width: 246px;
	height: 152px;
	background-color: #FFFFFF;
	position: fixed;
	transform: translate(-50%, -50%);
	top: 50%;
	left: 50%;
	border-radius: 5px;
	z-index: 10100;
}

#_vuec .main input{
	width: 100%;
	height: 33.5px;
	margin-top: 70.5px;
	border: 1px solid black;
}
</style>
<template lang="html">
	<div id="_vuec" v-show="showing">
		<div class="zk-shade-base"></div>
		<div class="main">
			<input type="password" v-model="password" placeholder="请输入密码" maxlength="6"/>
		</div>
	</div>
</template>
<script lang="js">
	/**
	 * 支付二维码
	 * 2017-03-26 20:01:05 
	 * @author PS
	 */
	'use strict';
	module.exports = {
		props: {
//			二维码内容(收款码)
			content: {
				type: String,
				default: function() {
					return "http://www.baidu.com";
				}
			}
		},
		//数据模型
		data: function() {
			return {
				showing:false,
				password:""
			}
		},
		mounted: mounted,
		methods: {
			show:show,
			hide:hide
		},
		components: {
//			qrCode: require('app_core/services/qr_code_service/components/qr_code.vue')
		}
	}

	function mounted() {
		var vm = this;
		vm.$watch("password",function(newVal,oldVal){
			if (newVal.length==6) {
				console.log(newVal);
				vm.$emit("input-complete",newVal);
			}
		});
	}

	function show(){
		this.showing=true;
		this.password="";
//		this.$refs.qrCode.refresh();
	}
	
	function hide(){
		this.showing=false;
	}
</script>